import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {Tueurs} from '../../tueurs.model';

export class PassiveKillerDamageIncreaseEffect extends SkillEffect {

  private monsterTypeGumiIds: Array<number>;
  private physicalDamageIncreases: Array<number>;
  private magicalDamageIncreases: Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3) {
      this.parameterError = true;
    } else {
      this.monsterTypeGumiIds = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
      this.physicalDamageIncreases =
        Array.isArray(parameters[1]) ? parameters[1] : Array(this.monsterTypeGumiIds.length).fill(parameters[1]);
      this.magicalDamageIncreases =
        Array.isArray(parameters[2]) ? parameters[2] : Array(this.monsterTypeGumiIds.length).fill(parameters[2]);
    }
  }

  protected get effectName(): string {
    return 'PassiveKillerDamageIncreaseEffect';
  }

  wordEffectImpl(skill: Skill): string {
    const texts: Array<string> = [];
    this.monsterTypeGumiIds.forEach((monsterTypeGumiId, index) => {
      let text = '';
      const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === monsterTypeGumiId);
      const monsterTypeText = `contre les ${monsterType ? monsterType.pluralName : 'UNKNOWN'}`;
      const physicalDamageIncrease = this.physicalDamageIncreases.length > index ? this.physicalDamageIncreases[index] : 0;
      const magicalDamageIncrease = this.magicalDamageIncreases.length > index ? this.magicalDamageIncreases[index] : 0;

      if (physicalDamageIncrease > 0) {
        text += `+${physicalDamageIncrease}% de dégâts physiques `;
        if (magicalDamageIncrease > 0 && physicalDamageIncrease === magicalDamageIncrease) {
          text += 'et magiques ';
        }
        text += monsterTypeText;
      }
      if (magicalDamageIncrease > 0 && physicalDamageIncrease !== magicalDamageIncrease) {
        text += `${text.length ? HTML_LINE_RETURN : ''}+${magicalDamageIncrease}% de dégâts magiques ${monsterTypeText}`;
      }
      texts.push(text);
    });

    return texts.join(HTML_LINE_RETURN);
  }

  getPhysicalKillers(): Tueurs {
    return this.computeKillers(this.monsterTypeGumiIds, this.physicalDamageIncreases);
  }

  getMagicalKillers(): Tueurs {
    return this.computeKillers(this.monsterTypeGumiIds, this.magicalDamageIncreases);
  }

  private computeKillers(monsterTypeGumiIds: Array<number>, damageIncreases: Array<number>): Tueurs {
    const tueurs = new Tueurs();
    monsterTypeGumiIds.forEach((monsterTypeGumiId, index) => {
      const currentIncrease = damageIncreases.length > index ? damageIncreases[index] : null;
      switch (monsterTypeGumiId) {
        case 1:
          tueurs.betes = currentIncrease;
          break;
        case 2:
          tueurs.oiseaux = currentIncrease;
          break;
        case 3:
          tueurs.aquatiques = currentIncrease;
          break;
        case 4:
          tueurs.demons = currentIncrease;
          break;
        case 5:
          tueurs.humains = currentIncrease;
          break;
        case 6:
          tueurs.machines = currentIncrease;
          break;
        case 7:
          tueurs.dragons = currentIncrease;
          break;
        case 8:
          tueurs.esprits = currentIncrease;
          break;
        case 9:
          tueurs.insectes = currentIncrease;
          break;
        case 10:
          tueurs.pierres = currentIncrease;
          break;
        case 11:
          tueurs.plantes = currentIncrease;
          break;
        case 12:
          tueurs.mortsVivants = currentIncrease;
          break;
      }
    });
    return tueurs;
  }

}
