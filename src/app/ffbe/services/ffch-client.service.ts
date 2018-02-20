import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Competence} from '../model/competence.model';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

const FFCH_BASE_URL = 'https://www.final-fantasy.ch/admin/';
const FFCH_COMPETENCE_PATH = FFCH_BASE_URL + 'skills.php';

@Injectable()
export class FfchClientService {

  constructor(private http: HttpClient) {
  }

  public getCompetenceByGumiId$(id: number): Observable<Competence> {
    return this.http.get<Competence>(FFCH_COMPETENCE_PATH + '?id=' + id)
      .pipe(catchError(this.analyseError));
  }

  private analyseError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const message = 'An unexpected error occured : ' + error.error.message;
      console.error(message);
      return new ErrorObservable(message);
    }
    else {
      if (error.status === 404) {
        return new Observable<Competence>(null);
      }
      else {
        const message = 'Code d\'erreur en provenance du backend ' + error.status;
        return new ErrorObservable(message);
      }
    }
  }
}
