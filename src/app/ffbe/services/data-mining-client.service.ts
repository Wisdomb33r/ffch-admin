import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

const charactersURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json';
const lbURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe/master/limitbursts.json';
const skillsURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe/master/skills.json';

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
