import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from '../Model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})

// export class CoursesComponent
export class CoursesListComponent implements OnInit{

  //Decorator Input
  @Input() courses: Course[] = [];

  //Não faço a mudança neste objeto, apenas o leio
  readonly displayedColumns=['name','categoria','actions'];//Colocar a coluna id para aparecer

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void{}

  onAdd(){
    // A rota selecionada e relativa a rota que já estou, acresecenta new e abre a outra rota.
    //console.log('onAdd');
    this.router.navigate(['new'],{relativeTo: this.route});
    //this.add.emit(true);

  }

}

