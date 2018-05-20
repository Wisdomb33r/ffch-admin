import {Personnage} from './personnage.model';
import {UniteCarac} from './unite-carac.model';
import {UniteCompetence} from './unite-competence.model';
import {UniteMateriauEveil} from './unite-materiau-eveil.model';
import {isNullOrUndefined} from 'util';

export class Unite {
  public id: number;
  public limite: string;
  public limite_en: string;
  public lim_effect_min: string;
  public lim_effect_max: string;
  public lim_desc: string;
  public lim_desc_en: string;
  public lim_nb_niv: number;
  public lim_hits: number;
  public lim_frames: string;
  public lim_damages: string;
  public lim_cristals_niv_min: number;
  public lim_cristals_niv_max: number;
  public competences: Array<UniteCompetence> = [];
  public carac: UniteCarac;
  public materiauxEveil: Array<UniteMateriauEveil> = [];

  constructor(
    public numero: number,
    public stars: number,
    public limite_gumi_id: number,
    public gumi_id: number
  ) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id);
  }

  public areAllCompetencesPresentInFfchDb(): boolean {
    return this.competences.every(uniteCompetence => !isNullOrUndefined(uniteCompetence.competence.id));
  }
}
