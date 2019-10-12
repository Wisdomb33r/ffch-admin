import {FfbeUtils} from '../../utils/ffbe-utils';

export class ObjetLienTMR {

  public constructor(
    public perso_gumi_id: number,
    public nom_perso: string,
    public isSTMR: boolean
  ) {
  }

  public static produce(lien: ObjetLienTMR): ObjetLienTMR {
    if (FfbeUtils.isNullOrUndefined(lien)) {
      return null;
    }

    let isSTMR = false;
    if (lien.isSTMR) {
      isSTMR = true;
    }
    return new ObjetLienTMR(lien.perso_gumi_id, lien.nom_perso, isSTMR);
  }

}
