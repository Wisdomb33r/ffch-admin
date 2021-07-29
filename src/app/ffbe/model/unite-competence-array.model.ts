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
        uniteCompetence.id = counterPart.id;
      }
    });

    this.filter(uniteCompetence => uniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart)
      .forEach(uniteCompetence => {
        const counterPart = other.find(dbUniteCompetence =>
          dbUniteCompetence.status === UniteCompetenceStatus.NotFoundInCounterPart &&
          dbUniteCompetence.competence.gumi_id === uniteCompetence.competence.gumi_id);

        if (counterPart) {
          if (UniteCompetence.isActivatedCompetence(uniteCompetence) === UniteCompetence.isActivatedCompetence(counterPart)) {
            uniteCompetence.status = UniteCompetenceStatus.LevelMismatch;
            counterPart.status = UniteCompetenceStatus.LevelMismatch;
          } else {
            uniteCompetence.status = UniteCompetenceStatus.LevelAndActivationMismatch;
            counterPart.status = UniteCompetenceStatus.LevelAndActivationMismatch;
          }
          uniteCompetence.id = counterPart.id;
        }
      });
  }
}
