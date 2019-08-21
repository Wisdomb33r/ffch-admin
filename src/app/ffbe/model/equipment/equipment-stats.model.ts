import {EquipmentElementResist} from './equipment-element-resist.model';
import {EquipmentStatusEffect} from './equipment-status-effect.model';

export class EquipmentStats {
  HP: number;
  MP: number;
  ATK: number;
  DEF: number;
  MAG: number;
  SPR: number;
  element_resist: EquipmentElementResist;
  element_inflict: Array<string>;
  status_resist: EquipmentStatusEffect;
  status_inflict: EquipmentStatusEffect;
}
