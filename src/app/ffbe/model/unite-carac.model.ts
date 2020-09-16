import {Caracteristiques} from './caracteristiques.model';
import {CaracteristiquesContainer} from './caracteristiques-container.model';

export class UniteCarac implements CaracteristiquesContainer {

  constructor(
    public level: number,
    public level_max: number,
    public base: Caracteristiques,
    public pots: Caracteristiques,
    public bonusBasePercent: Caracteristiques,
    public bonusDoublehandPercent: Caracteristiques,
    public bonusTrueDoublehandPercent: Caracteristiques,
    public bonusDualwieldPercent: Caracteristiques
  ) {
  }

  getBase(): Caracteristiques {
    return this.base;
  }

  getPots(): Caracteristiques {
    return this.pots;
  }

  getBonusBasePercent(): Caracteristiques {
    return this.bonusBasePercent;
  }

  getBonusDoublehandPercent(): Caracteristiques {
    return this.bonusDoublehandPercent;
  }

  getBonusTrueDoublehandPercent(): Caracteristiques {
    return this.bonusTrueDoublehandPercent;
  }

  getBonusDualWieldPercent(): Caracteristiques {
    return this.bonusDualwieldPercent;
  }
}
