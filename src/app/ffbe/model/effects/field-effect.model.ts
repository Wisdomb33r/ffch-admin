import {AbstractFieldSkillEffect} from './abstract-field-skill-effect.model';
import {FieldSkillEffectFactory} from './field-skill-effect.factory';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';
import {Skill} from '../skill.model';

export class FieldEffect {
  public gumi_id;
  public duration: number;
  public effects: Array<string>;
  public effects_raw: Array<any>;
  public effets: Array<AbstractFieldSkillEffect>;

  public initializeFieldSkillEffects(targetNumber: TargetNumberEnum, targetType: TargetTypeEnum): FieldEffect {
    this.effets = this.effects_raw?.map(
      raw => FieldSkillEffectFactory.getSkillEffect(targetNumber, targetType, this.duration, raw)
    ).filter(effect => !!effect);
    return this;
  }

  // TODO: Maybe move it somewhere else
  public getEffects(skill: Skill): Array<string> {
    if(this.effets) {
      return this.effets.map(effet => effet.wordEffect(skill));
    }
    return [];
  }

}
