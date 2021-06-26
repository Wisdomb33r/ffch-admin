import {UniteCompetence, UniteCompetenceStatus} from './unite-competence.model';


export class UniteCompetenceArray extends Array<UniteCompetence> {

  public compare(other: Array<UniteCompetence>) {
    other.forEach(uniteCompetence => uniteCompetence.status = UniteCompetenceStatus.NotFoundInCounterPart);
    this.forEach(uniteCompetence => uniteCompetence.status = UniteCompetenceStatus.NotFoundInCounterPart);

    this.forEach(uniteCompetence => {
      const counterPart = other.find(dbUniteCompetence =>
        dbUniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart &&
        dbUniteCompetence.competence.gumi_id === uniteCompetence.competence.gumi_id &&
        dbUniteCompetence.niveau === uniteCompetence.niveau);

      if (counterPart) {
        uniteCompetence.status = UniteCompetenceStatus.Correct;
        counterPart.status = UniteCompetenceStatus.Correct;
      }
    });

    this.forEach(uniteCompetence => {
      const counterPart = other.find(dbUniteCompetence =>
        dbUniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart &&
        dbUniteCompetence.competence.gumi_id === uniteCompetence.competence.gumi_id);

      if (counterPart) {
        uniteCompetence.status = UniteCompetenceStatus.LevelMismatch;
        counterPart.status = UniteCompetenceStatus.LevelMismatch;
      }
    });
  }
}
