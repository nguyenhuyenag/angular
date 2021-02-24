import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VocabService {

  constructor(private http: HttpClient) { }

  private random_vocab = environment.apiUrl + "/api/random-vocab";

  public randomVocab(): Observable<any> {
    return this.http.get(this.random_vocab).pipe(map(data => data));
  }

}
