import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit{

  form: FormGroup;

  //Faz a injeção do informe build no construtor
  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      name:[null],
      categoria:[null]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log("Salvando")
  }
  onCancel(){

  }

}
