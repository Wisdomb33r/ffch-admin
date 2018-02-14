import { Personnage } from './personnage.model';

export class Unite {
  constructor(
    public perso: Personnage,
    public stars: number,
    public limite: string,
    public limite_en: string,
    public lim_desc: string,
    public lim_desc_en: string,
    public lim_nb_niv: number,
    public gumi_id: number
  ) { }
}
