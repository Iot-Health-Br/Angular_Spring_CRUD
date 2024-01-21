import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from './../Model/course';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //Posso modificar o caminho para gerar o erro de carregamento na tela
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list(){
    //Retorna um Array de Cursos
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      //Recebe a primeira atualização do servidor
      first(),
      //Tempo de delay para o spinner de loading
      delay(5000),
      tap(courses => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id }`);
  }

  save(record: Partial<Course>){
    console.log(record);
    if(record._id){
      console.log('update');
      return this.update(record);
    }
    console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }


  /* Está funcionando no alterar curso

  //Record recebe uma interface do tipo curso
  save(record: Course){
    console.log(record);
    //Puxou uma informação do servidor e via get
    //Para salvar a informação usamos o http
    //Retorno um observable de curso
    return this.httpClient.post<Course>(this.API,record).pipe(first());
  }
  */
}
