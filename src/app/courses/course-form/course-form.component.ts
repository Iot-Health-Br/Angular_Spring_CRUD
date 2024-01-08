import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;

  //Faz a injeção do informe build no construtor
  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location){
    this.form = this.formBuilder.group({
      name:[''],
      categoria:['']
    });
  }

  ngOnInit(): void {


  }

  onSubmit(){
    //console.log(this.form.value);
    this.service.save(this.form.value)
    .subscribe(result=>this.onSuccess(),error=>this.onError());
  }


  onCancel(){
    //Volta para a página anterior no caso a principal
    this.location.back();
  }

  private onSuccess(){
    //Apresenta a mensagem de salvo e volta para a tela inicial
    this.snackBar.open('Curso salvo com sucesso !','',{duration:5000});
    this.onCancel();
  }


  //Mensagem de erro, caso falhe salvar o curso
  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{duration:5000});
  }

}
