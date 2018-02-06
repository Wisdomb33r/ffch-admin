import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const URL = 'http://localhost:4200/assets/units.json';

@Injectable()
export class DataMiningClientService {

  constructor(private http: HttpClient) {}

  public getCharacters$(): Observable<Object> {
    return this.http.get(URL);
  }

}
