import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const dataMiningBaseURL = 'https://raw.githubusercontent.com/aEnigmatic/ffbe/master/';
const charactersFile = dataMiningBaseURL + 'units.json';
const lbFile = dataMiningBaseURL + 'limitbursts.json';
const skillsFile = dataMiningBaseURL + 'skills.json';
const enhancementsFile = dataMiningBaseURL + 'enhancements.json';
const recipeFile = dataMiningBaseURL + 'recipes.json';
const itemFile = dataMiningBaseURL + 'items.json';

@Injectable()
export class DataMiningClientService {

  constructor(private http: HttpClient) {
  }

  public getCharacters$(): Observable<Object> {
    return this.http.get(charactersFile);
  }

  public getLimitBursts$(): Observable<Object> {
    return this.http.get(lbFile);
  }

  public getSkills$(): Observable<Object> {
    return this.http.get(skillsFile);
  }

  public getEnhancements$(): Observable<Object> {
    return this.http.get(enhancementsFile);
  }

  public getItemRecipes$(): Observable<Object> {
    return this.http.get(recipeFile);
  }

  public getItems$(): Observable<Object> {
    return this.http.get(itemFile);
  }
}
