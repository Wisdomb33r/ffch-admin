import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {TargetPrepositionEnum} from './target-preposition.enum';
import {Skill} from '../skill.model';
import {EffectIdenticalValuesWording} from './effect-identical-values-wording';
import {Caracteristiques} from '../caracteristiques.model';
import {ObjetElements} from '../objet/objet-elements';

export abstract class SkillEffect extends EffectIdenticalValuesWording {
  protected parameterError = false;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number) {
    super();
  }

  protected abstract wordEffectImpl(skill: Skill): string;

  protected abstract get effectName(): string;

  public wordEffect(skill: Skill): string {
    if (this.parameterError) {
      return this.wordBadParameterText();
    } else {
      return this.wordEffectImpl(skill);
    }
  }

  public wordEffectForDelayedSkill(skill: Skill): Array<{ delay: number, wordedEffect: string }> {
    return [{delay: 0, wordedEffect: this.wordEffect(skill)}];
  }

  public wordBadParameterText(): string {
    return `Effet ${this.effectName} inconnu: Mauvaise liste de paramètres`;
  }

  protected wordTarget(preposition: TargetPrepositionEnum = TargetPrepositionEnum.A): string {

    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Enemy) {
      return SkillEffect.getTargetEnemyText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Random && this.targetType === TargetTypeEnum.Enemy) {
      return SkillEffect.getTargetRandomEnemyText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Multiple && this.targetType === TargetTypeEnum.Enemy) {
      return SkillEffect.getTargetEnemiesText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Ally) {
      return SkillEffect.getTargetAllyText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.AllyButCaster) {
      return SkillEffect.getTargetAllyButCasterText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Random && this.targetType === TargetTypeEnum.Ally) {
      return SkillEffect.getTargetRandomAllyText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Single && this.targetType === TargetTypeEnum.Any) {
      return SkillEffect.getTargetAnyTargetText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Multiple && this.targetType === TargetTypeEnum.Any) {
      return SkillEffect.getTargetAnyGroupText(preposition);
    }
    if ((this.targetNumber === TargetNumberEnum.Self || this.targetNumber === TargetNumberEnum.Single)
      && this.targetType === TargetTypeEnum.Caster) {
      return SkillEffect.getTargetCasterText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Multiple && this.targetType === TargetTypeEnum.Ally) {
      return SkillEffect.getTargetAlliesText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Multiple && this.targetType === TargetTypeEnum.AllyButCaster) {
      return SkillEffect.getTargetAlliesButCasterText(preposition);
    }
    if (this.targetNumber === TargetNumberEnum.Multiple && this.targetType === TargetTypeEnum.AllyAndEnemy) {
      return SkillEffect.getTargetAlliesAndEnemiesText(preposition);
    }

    return 'UNKNOWN target';
  }

  public static getTargetEnemyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un adversaire';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un adversaire';
    }
    return 'un adversaire';
  }

  public static getTargetRandomEnemyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un adversaire au hasard';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un adversaire au hasard';
    }
    return 'un adversaire au hasard';
  }

  public static getTargetEnemiesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux adversaires';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des adversaires';
    }
    return 'les adversaires';
  }

  public static getTargetAllyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié';
    }
    return 'un allié';
  }

  public static getTargetAllyButCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié sauf le lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié sauf le lanceur';
    }
    return 'un allié sauf le lanceur';
  }

  public static getTargetRandomAllyText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à un allié au hasard';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'un allié au hasard';
    }
    return 'un allié au hasard';
  }

  public static getTargetAnyTargetText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'à une cible';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'd\'une cible';
    }
    return 'une cible';
  }

  public static getTargetAnyGroupText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'au groupe d\'une cible';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'du groupe d\'une cible';
    }
    return 'le groupe d\'une cible';
  }

  public static getTargetCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'au lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'du lanceur';
    }
    return 'le lanceur';
  }

  public static getTargetAlliesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés';
    }
    return 'les alliés';
  }

  public static getTargetAlliesAndEnemiesText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés et adversaires';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés et adversaires';
    }
    return 'les alliés et adversaires';
  }

  public static getTargetAlliesButCasterText(preposition: TargetPrepositionEnum): string {
    if (preposition === TargetPrepositionEnum.A) {
      return 'aux alliés sauf le lanceur';
    }
    if (preposition === TargetPrepositionEnum.De) {
      return 'des alliés sauf le lanceur';
    }
    return 'les alliés sauf le lanceur';
  }

  public static getElementNameValueTableFromNumberArray(increases: Array<number>): Array<{ name: string, value: number }> {
    return [
      {name: 'Feu', value: increases[0]},
      {name: 'Glace', value: increases[1]},
      {name: 'Foudre', value: increases[2]},
      {name: 'Eau', value: increases[3]},
      {name: 'Vent', value: increases[4]},
      {name: 'Terre', value: increases[5]},
      {name: 'Lumière', value: increases[6]},
      {name: 'Ténèbres', value: increases[7]},
    ];
  }

  public getDamagesPower(): number {
    return 0;
  }

  public getBaseIncreasesPercent(): Caracteristiques {
    return null;
  }

  public getDoublehandIncreasesPercent(): Caracteristiques {
    return null;
  }

  public getTrueDoublehandIncreasesPercent(): Caracteristiques {
    return null;
  }

  public getDualwieldIncreasesPercent(): Caracteristiques {
    return null;
  }

  public getElementResistances(): ObjetElements {
    return null;
  }
}
