import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../Model/course';
import { Observable, catchError, of } from 'rxjs';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})

// export class CoursesComponent
export class CoursesComponent implements OnInit{

  //courses$ e um observable
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ){
      this.refresh();
  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(catchError(error => {
        this.onError('Erro ao carregar a lista de cursos !');
        return of([])
      })
    );
  }

  //Mensagem de Erro da Aplicação
  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg
    });
  }

  ngOnInit():void{}

  onAdd(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
  onEdit(course: Course){
    this.router.navigate(['edit', course._id],{relativeTo: this.route});
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover este curso ?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.coursesService.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }
}

