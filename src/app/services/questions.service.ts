import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _httpClient:HttpClient) { }

  getQuestions(number:number , diff:string , category:string):Observable<any>{
    return this._httpClient.get(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${diff}`)
    
  }

}
