import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Competence} from '../model/competence.model';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';

const FFCH_BASE_URL = '/admin/';
const FFCH_COMPETENCE_PATH = FFCH_BASE_URL + 'skills.php';

@Injectable()
export class FfchClientService {

  constructor(private http: HttpClient) {
  }

  public postCompetence(competence: Competence): Observable<any> {
    return this.http.post(FFCH_COMPETENCE_PATH, competence);
  }

  public getCompetenceByGumiId$(id: number): Observable<Competence> {
    return this.http.get<Competence>(FFCH_COMPETENCE_PATH + '?id=' + id)
      .pipe(catchError(this.analyseError));
  }

  private analyseError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const message = 'An unexpected error occured : ' + error.error.message;
      return new ErrorObservable(message);
    } else {
      if (error.status === 404) {
        return Observable.of(undefined);
      } else {
        const message = 'Code d\'erreur en provenance du backend ' + error.status;
        return new ErrorObservable(message);
      }
    }
  }
}
