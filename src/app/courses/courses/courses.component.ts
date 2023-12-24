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
  displayedColumns=['name','categoria'];

  constructor(private CoursesService: CoursesService,
    public dialog: MatDialog
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
}

