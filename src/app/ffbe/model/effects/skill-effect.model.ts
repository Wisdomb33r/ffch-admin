import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {TargetPrepositionEnum} from './target-preposition.enum';
import {Skill} from '../skill.model';

export abstract class SkillEffect {
  protected parameterError = false;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number) {
  }

  protected abstract wordEffectImpl(skill: Skill): string;

  protected abstract get effectName(): string;

  public wordEffect(skill: Skill) {
    if (this.parameterError) {
      return `Effet ${this.effectName} inconnu: Mauvaise liste de paramètres`;
    } else {
      return this.wordEffectImpl(skill);
    }
  }

  protected wordTarget(preposition: TargetPrepositionEnum = TargetPrepositionEnum.A): string {

    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Enemy) {
      return this.getTargetEnemyText(preposition);
    }
    if (this.targetNumber === 3 && this.targetType === 1) {
      return this.getTargetRandomEnemyText(preposition);
    }
    if (this.targetNumber === 2 && this.targetType === 1) {
      return this.getTargetEnemiesText(preposition);
    }
    if (this.targetNumber === 1 && this.targetType === 2) {
      return this.getTargetAllyText(preposition);
    }
    if (this.targetNumber === 1 && this.targetType === 5) {
      return this.getTargetAllyButCasterText(preposition);
    }
    if (this.targetNumber === 3 && this.targetType === 2) {
      return this.getTargetRandomAllyText(preposition);
    }
    if (this.targetNumber === 1 && this.targetType === 6) {
      return this.getTargetAnyTargetText(preposition);
    }
    if (this.targetNumber === 2 && this.targetType === 6) {
      return this.getTargetAnyGroupText(preposition);
    }
    if ((this.targetNumber === 0 || this.targetNumber === 1) && this.targetType === 3) {
      return this.getTargetCasterText(preposition);
    }
    if (this.targetNumber === 2 && this.targetType === 2) {
      return this.getTargetAlliesText(preposition);
    }
    if (this.targetNumber === 2 && this.targetType === 5) {
      return this.getTargetAlliesButCasterText(preposition);
    }
    if (this.targetNumber === 2 && this.targetType === 4) {
      return this.getTargetAlliesAndEnemiesText(preposition);
    }

    return 'UNKNOWN target';
  }

  private getTargetEnemyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un adversaire';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un adversaire';
    }
    return 'un adversaire';
  }

  private getTargetRandomEnemyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un adversaire au hasard';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un adversaire au hasard';
    }
    return 'un adversaire au hasard';
  }

  private getTargetEnemiesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux adversaires';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des adversaires';
    }
    return 'les adversaires';
  }

  private getTargetAllyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié';
    }
    return 'un allié';
  }

  private getTargetAllyButCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié sauf le lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié sauf le lanceur';
    }
    return 'un allié sauf le lanceur';
  }

  private getTargetRandomAllyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié au hasard';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié au hasard';
    }
    return 'un allié au hasard';
  }

  private getTargetAnyTargetText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à une cible';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'une cible';
    }
    return 'une cible';
  }

  private getTargetAnyGroupText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'au groupe d\'une cible';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'du groupe d\'une cible';
    }
    return 'le groupe d\'une cible';
  }

  private getTargetCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'au lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'du lanceur';
    }
    return 'le lanceur';
  }

  private getTargetAlliesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés';
    }
    return 'les alliés';
  }

  private getTargetAlliesAndEnemiesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés et adversaires';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés et adversaires';
    }
    return 'les alliés et adversaires';
  }

  protected getTargetAlliesButCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés sauf le lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés sauf le lanceur';
    }
    return 'les alliés sauf le lanceur';
  }
}
