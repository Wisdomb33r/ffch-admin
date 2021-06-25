import {UniteCompetence, UniteCompetenceStatus} from './unite-competence.model';


export class UniteCompetenceArray extends Array<UniteCompetence> {

  public compareWithDatabase(databaseVersion: Array<UniteCompetence>) {
    this.forEach(uniteCompetence => uniteCompetence.status = UniteCompetenceStatus.Correct);
    databaseVersion.forEach(uniteCompetence => uniteCompetence.status = UniteCompetenceStatus.Correct);
  }

}
