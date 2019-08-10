import {isNotNullOrUndefined} from 'codelyzer/util/is-not-null-or-undefined';

export class ObjetLienTMR {

  public constructor(
    public perso_gumi_id: number,
    public nom_perso: string,
    public isSTMR: boolean
  ) {
  }

  public static produce(lien: ObjetLienTMR): ObjetLienTMR {
    if (!isNotNullOrUndefined(lien)) {
      return null;
    }
    return new ObjetLienTMR(lien.perso_gumi_id, lien.nom_perso, lien.isSTMR);
  }

}
