import {Game} from '../model/game.model';

export class Personnage {
  constructor(
    public jeu: Game,
    public job: string,
    public nom: string,
    public nom_en: string,
    public min_rank: number,
    public max_rank: number,
    public gumi_id: number
  ) {}
}
