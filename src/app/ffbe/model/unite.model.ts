import {UniteCarac} from './unite-carac.model';
import {UniteCompetence} from './unite-competence.model';
import {Formule} from './formule.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class Unite {
  public id: number;
  public limite: string;
  public limite_en: string;
  public lim_effect_min: string;
  public lim_effect_max: string;
  public lim_desc: string;
  public lim_desc_en: string;
  public lim_min: string;
  public lim_max: string;
  public lim_up_min: string;
  public lim_up_max: string;
  public lim_nb_niv: number;
  public lim_hits: number;
  public lim_frames: string;
  public lim_damages: string;
  public lim_cristals_niv_min: number;
  public lim_cristals_niv_max: number;
  public competences: Array<UniteCompetence> = [];
  public carac: UniteCarac;
  public materiauxEveil: Formule;

  constructor(
    public numero: number,
    public stars: number,
    public limite_gumi_id: number,
    public gumi_id: number
  ) {
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.id);
  }

  public areAllCompetencesPresentInFfchDb(): boolean {
    return this.competences.every(uniteCompetence => !FfbeUtils.isNullOrUndefined(uniteCompetence.competence.id));
  }

  public hasUpgradedLimitBurst(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.lim_up_min) && !FfbeUtils.isNullOrUndefined(this.lim_up_max);
  }
}
