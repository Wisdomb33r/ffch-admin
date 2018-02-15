import {Personnage} from './personnage.model';

export class Unite {
  public limite: string;
  public limite_en: string;
  public lim_desc: string;
  public lim_desc_en: string;
  public lim_nb_niv: number;
  public lim_hits: number;
  public lim_frames: string;

  constructor(public perso: Personnage,
              public stars: number,
              public limite_gumi_id: number,
              public gumi_id: number) {
  }
}
