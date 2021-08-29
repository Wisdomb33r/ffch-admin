import {plainToClass} from 'class-transformer';
import {FieldEffect} from './field-effect.model';
import {TargetNumberEnum} from './target-number.enum';
import {TargetTypeEnum} from './target-type.enum';

export const FIELD_EFFECTS_TEST_DATA =
  `{
    "200000026": {
        "duration": 10,
        "effects": [
            ["Reduce resistance to Water by 25%"]
        ],
        "effects_raw": [[0, 0, 2, [0,  0,  0,  -25,  0,  0,  0,  0]]]
    },
    "200000027": {
        "duration": 4,
        "effects": [
            ["Reduce resistance to Wind by 25%"]
        ],
        "effects_raw": [[0, 0, 2, [0,  0,  0,  0,  -25,  0,  0,  0]]]
    }
  }`;


export class FieldEffectMockDataHelper {
  public static mockFieldEffect(gumiId: number, targetNumber: TargetNumberEnum, targetType: TargetTypeEnum): FieldEffect {
    const fieldEffects = JSON.parse(FIELD_EFFECTS_TEST_DATA);
    const fieldEffect: FieldEffect = fieldEffects[`${gumiId}`];
    return plainToClass(FieldEffect, fieldEffect).initializeFieldSkillEffects(targetNumber, targetType);
  }
}
