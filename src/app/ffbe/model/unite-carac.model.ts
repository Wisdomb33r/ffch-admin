import { Unite } from './unite.model';

export class UniteCarac {
  constructor(
    public level: number,
    public level_max: number,
    public pv: number,
    public pm: number,
    public att: number,
    public def: number,
    public mag: number,
    public psy: number,
    public pv_pots: number,
    public pm_pots: number,
    public att_pots: number,
    public def_pots: number,
    public mag_pots: number,
    public psy_pots: number
  ) { }
}
