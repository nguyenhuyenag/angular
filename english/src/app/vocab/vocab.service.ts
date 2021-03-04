import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VocabService {

    constructor(private http: HttpClient) { }

    private random_vocab = environment.apiUrl + "/api/random-vocab" + "?flag=";

    public randomVocab(flag: string): Observable<any> {
        return this.http.get(this.random_vocab + flag).pipe(map(data => data));
    }

}
