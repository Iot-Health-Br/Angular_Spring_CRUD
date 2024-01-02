import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Component } from '@angular/core';
import { Course } from '../Model/course';
import { Observable, catchError } from 'rxjs';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {

  //courses$ e um observable
  courses$: Observable<Course[]>;
  displayedColumns=['name','categoria','actions'];//Colocar a coluna id para aparecer

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ){
    this.courses$ = this.CoursesService.list()
    .pipe(
      //Se der erro retorna um vazio para courses, indicando erro
      catchError(error => {
        this.onError('Erro ao carregar a lista de cursos !');
        return ([])
      })
    );
  }

  //Mensagem de Erro da Aplicação
  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg
    });
  }

  ngOnInit():void{

  }

  onAdd(){
    // A rota selecionada e relativa a rota que já estou, acresecenta new e abre a outra rota.
    //console.log('onAdd');
    this.router.navigate(['new'],{relativeTo: this.route});
  }
}

