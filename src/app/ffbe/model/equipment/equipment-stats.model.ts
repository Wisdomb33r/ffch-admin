import {EquipmentElementResist} from './equipment-element-resist.model';

export class EquipmentStats {
  HP: number;
  MP: number;
  ATK: number;
  DEF: number;
  MAG: number;
  SPR: number;
  element_resist: EquipmentElementResist;
  element_inflict: Array<string>;
}
