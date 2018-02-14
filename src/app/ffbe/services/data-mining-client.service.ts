import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const charactersURL = 'http://localhost:4200/assets/units.json';
const lbURL = 'http://localhost:4200/assets/limitbursts.json';
const skillsURL = 'http://localhost:4200/assets/skills.json';

@Injectable()
export class DataMiningClientService {

  constructor(private http: HttpClient) {
  }

  public getCharacters$(): Observable<Object> {
    return this.http.get(charactersURL);
  }

  public getLimitBursts$(): Observable<Object> {
    return this.http.get(lbURL);
  }

  public getSkills$(): Observable<Object> {
    return this.http.get(skillsURL);
  }
}
