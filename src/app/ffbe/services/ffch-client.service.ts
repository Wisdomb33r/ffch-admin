import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Competence} from '../model/competence.model';
import {Unite} from '../model/unite.model';
import {UniteEquipements} from '../model/unite-equipements.model';
import {Objet} from '../model/objet.model';
import {UniteEveil} from '../model/unite-eveil.model';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Amelioration} from '../model/amelioration.model';
import {Recette} from '../model/recette.model';

const FFCH_BASE_URL = '/admin/';
const FFCH_COMPETENCE_PATH = FFCH_BASE_URL + 'skills.php';
const FFCH_UNITE_PATH = FFCH_BASE_URL + 'units.php';
const FFCH_EQUIPMENTS_PATH = FFCH_BASE_URL + 'equipments.php';
const FFCH_OBJECTS_PATH = FFCH_BASE_URL + 'objects.php';
const FFCH_AWAKENING_MATERIALS_PATH = FFCH_BASE_URL + 'unit_awakenings.php';
const FFCH_SKILL_AWAKENINGS_PATH = FFCH_BASE_URL + 'skill_awakenings.php';
const FFCH_RECETTES_PATH = FFCH_BASE_URL + 'recettes.php';

@Injectable()
export class FfchClientService {

  constructor(private http: HttpClient) {
  }

  public postCompetence$(competence: Competence): Observable<any> {
    return this.http.post(FFCH_COMPETENCE_PATH, competence);
  }

  public getCompetenceByGumiId$(id: number): Observable<Competence> {
    return this.http.get<Competence>(FFCH_COMPETENCE_PATH + '?id=' + id)
      .pipe(catchError(this.analyseError));
  }

  public getUniteByNumero$(numero: number): Observable<Unite> {
    return this.http.get<Unite>(FFCH_UNITE_PATH + '?numero=' + numero)
      .pipe(catchError(this.analyseError));
  }

  public postUnite$(unite: Unite): Observable<any> {
    return this.http.post(FFCH_UNITE_PATH, unite);
  }

  public getUniteEquipementsByUniteNumero$(numero: number): Observable<UniteEquipements> {
    return this.http.get<UniteEquipements>(FFCH_EQUIPMENTS_PATH + '?numero=' + numero)
      .pipe(catchError(this.analyseError));
  }

  public postUniteEquipements$(uniteEquipements: UniteEquipements): Observable<any> {
    return this.http.post(FFCH_EQUIPMENTS_PATH, uniteEquipements);
  }

  public getObjetByGumiId$(id: number): Observable<Objet> {
    return this.http.get<Objet>(FFCH_OBJECTS_PATH + '?gumi_id=' + id)
      .pipe(catchError(this.analyseError));
  }

  public postObjet$(objet: Objet): Observable<any> {
    return this.http.post(FFCH_OBJECTS_PATH, objet);
  }

  public getUniteMateriauxEveilByUniteNumero$(numero: number): Observable<UniteEveil> {
    return this.http.get<UniteEveil>(FFCH_AWAKENING_MATERIALS_PATH + '?numero=' + numero)
      .pipe(catchError(this.analyseError));
  }

  public postUniteMateriauxEveil$(uniteEveil: UniteEveil): Observable<any> {
    return this.http.post(FFCH_AWAKENING_MATERIALS_PATH, uniteEveil);
  }

  public getAmelioration$(perso_gumi_id: number, competence_gumi_id: number, niveau: number): Observable<Amelioration> {
    return this.http.get<Amelioration>(FFCH_SKILL_AWAKENINGS_PATH + '?perso_gumi_id=' + perso_gumi_id +
      '&skill_id_base=' + competence_gumi_id + '&niveau=' + niveau)
      .pipe(catchError(this.analyseError));
  }

  public postAmelioration$(amelioration: Amelioration): Observable<any> {
    return this.http.post(FFCH_SKILL_AWAKENINGS_PATH, amelioration);
  }

  public getRecette$(recette_gumi_id: number, resultat_gumi_id: number): Observable<Recette> {
    return this.http.get<Recette>(FFCH_RECETTES_PATH + '?recette_gumi_id=' + recette_gumi_id +
      '&resultat_gumi_id=' + resultat_gumi_id)
      .pipe(catchError(this.analyseError));
  }

  public postRecette$(recette: Recette): Observable<any> {
    return this.http.post(FFCH_RECETTES_PATH, recette);
  }

  private analyseError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const message = 'An unexpected error occured : ' + error.error.message;
      return throwError(message);
    } else {
      if (error.status === 404) {
        return of(undefined);
      } else {
        const message = 'Code d\'erreur en provenance du backend ' + error.status;
        return throwError(message);
      }
    }
  }
}
