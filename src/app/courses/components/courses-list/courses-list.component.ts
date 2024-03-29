import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../Model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})

// export class CoursesComponent
export class CoursesListComponent implements OnInit{

  //Decorator Input
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  //Não faço a mudança neste objeto, apenas o leio
  readonly displayedColumns=['name','categoria','actions'];//Colocar a coluna id para aparecer

  constructor() { }

  ngOnInit(): void{}

  onAdd(){
    this.add.emit(true);
  }
  onEdit(course: Course){
    this.edit.emit(course);
  }
  onDelete(course: Course){
    this.remove.emit(course);
  }
}

