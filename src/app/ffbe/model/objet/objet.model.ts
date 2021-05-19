import {Caracteristiques} from '../caracteristiques.model';
import {Competence} from '../competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {CategorieObjet} from './categorie-objet.model';
import {ResistancesElementaires} from '../resistances-elementaires.model';
import {ResistancesAlterations} from '../resistances-alterations.model';
import {ObjetLienTMR} from './objet-lien-tmr.model';
import {CaracteristiquesContainer} from '../caracteristiques-container.model';
import {Tueurs} from '../tueurs.model';
import {TueursMapper} from '../../mappers/tueurs-mapper';

export class Objet implements CaracteristiquesContainer {

  public extended_gumi_id: string;
  public prix_vente: number;
  public resistancesElementaires: ResistancesElementaires;
  public elementsArme: ResistancesElementaires;
  public alterationsArme;
  public two_handed;
  public variance_min: number;
  public variance_max: number;
  public tueursPhysiques: Tueurs;
  public tueursMagiques: Tueurs;

  public lienTMR: ObjetLienTMR;

  constructor(
    public id: number,
    public categorie: CategorieObjet,
    public nom: string,
    public nom_en: string,
    public stars: number,
    public icone: string,
    public gumi_id: number,
    public description: string,
    public description_en: string,
    public effet: string,
    public effet_en: string,
    public carac: Caracteristiques,
    public caracp: Caracteristiques,
    public caracpDoublehand: Caracteristiques,
    public caracpTrueDoublehand: Caracteristiques,
    public caracpDualwield: Caracteristiques,
    public elements: ResistancesElementaires,
    public resistancesAlterations: ResistancesAlterations,
    public tueurs: string,
    public tueurs_m: string,
    public competences: Array<Competence>
  ) {
  }

  public static produce(o: Objet): Objet {
    const categorie = FfbeUtils.findObjetCategorieByFfchId(o.categorie.ffchId);
    const objet = new Objet(
      o.id,
      categorie,
      o.nom,
      o.nom_en,
      o.stars,
      o.icone,
      o.gumi_id,
      o.description,
      o.description_en,
      o.effet,
      o.effet_en,
      Caracteristiques.produce(o.carac),
      Caracteristiques.produce(o.caracp),
      Caracteristiques.produce(o.caracpDoublehand),
      Caracteristiques.produce(o.caracpTrueDoublehand),
      Caracteristiques.produce(o.caracpDualwield),
      o.elements ? ResistancesElementaires.produce(o.elements) : null,
      o.resistancesAlterations ? ResistancesAlterations.produce(o.resistancesAlterations) : null,
      o.tueurs,
      o.tueurs_m,
      o.competences?.map(competence => Competence.produce(competence)));

    objet.extended_gumi_id = o.extended_gumi_id;
    objet.prix_vente = o.prix_vente;
    objet.resistancesElementaires = o.resistancesElementaires;
    objet.elementsArme = o.elementsArme;
    objet.alterationsArme = o.alterationsArme;

    objet.two_handed = o.two_handed;
    if (objet.isWeapon() && FfbeUtils.isNullOrUndefined(objet.two_handed)) {
      objet.two_handed = false;
    }
    objet.variance_min = o.variance_min;
    objet.variance_max = o.variance_max;
    objet.tueursPhysiques = FfbeUtils.isNullOrUndefined(o.tueursPhysiques) ? TueursMapper.fromDataBaseRepresentation(o.tueurs) : o.tueursPhysiques;
    objet.tueursMagiques = FfbeUtils.isNullOrUndefined(o.tueursMagiques) ? TueursMapper.fromDataBaseRepresentation(o.tueurs_m) : o.tueursMagiques;
    objet.lienTMR = ObjetLienTMR.produce(o.lienTMR);
    return objet;
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.id);
  }

  public isImagePresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.icone);
  }

  public hasVariance(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.variance_min) && !FfbeUtils.isNullOrUndefined(this.variance_max);
  }

  public isWeapon(): boolean {
    return (!FfbeUtils.isNullOrUndefined(this.categorie) && this.categorie.gumiId > 0 && this.categorie.gumiId <= 16);
  }

  getBase(): Caracteristiques {
    return this.carac;
  }

  getPots(): Caracteristiques {
    return null;
  }

  getBonusBasePercent(): Caracteristiques {
    return this.caracp;
  }

  getBonusDoublehandPercent(): Caracteristiques {
    return this.caracpDoublehand;
  }

  getBonusTrueDoublehandPercent(): Caracteristiques {
    return this.caracpTrueDoublehand;
  }

  getBonusDualWieldPercent(): Caracteristiques {
    return this.caracpDualwield;
  }

  public isDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.isCategorieDifferent(other) ||
        this.isNomDifferent(other) ||
        this.isNomEnDifferent(other) ||
        this.isStarsDifferent(other) ||
        this.isGumiIdDifferent(other) ||
        this.isDescriptionDifferent(other) ||
        this.areCaracDifferent(other) ||
        this.areCaracpDifferent(other) ||
        this.areCaracpDoublehandDifferent(other) ||
        this.areCaracpTrueDoublehandDifferent(other) ||
        this.areCaracpDualwieldDifferent(other) ||
        this.areElementsDifferent(other) ||
        this.areResistancesAlterationsDifferent(other) ||
        this.isTwoHandedDifferent(other) ||
        this.isVarianceMinDifferent(other) ||
        this.isVarianceMaxDifferent(other) ||
        this.areTueursDifferent(other) ||
        this.areTueursMDifferent(other);
    }
  }

  private isCategorieDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else if (FfbeUtils.isNullOrUndefined(other.categorie)) {
      return true;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.categorie.gumiId, other.categorie.gumiId);
    }
  }

  private isNomDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.nom !== other.nom;
    }
  }

  private isNomEnDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.nom_en, other.nom_en);
    }
  }

  private isStarsDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.stars, other.stars);
    }
  }

  private isGumiIdDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.gumi_id, other.gumi_id);
    }
  }

  private isDescriptionDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.description, other.description);
    }
  }

  private areCaracDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.carac.isDifferent(other.carac);
    }
  }

  private areCaracpDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.caracp.isDifferent(other.caracp);
    }
  }

  private areCaracpDoublehandDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.caracpDoublehand.isDifferent(other.caracpDoublehand);
    }
  }

  private areCaracpTrueDoublehandDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.caracpTrueDoublehand.isDifferent(other.caracpTrueDoublehand);
    }
  }

  private areCaracpDualwieldDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.caracpDualwield.isDifferent(other.caracpDualwield);
    }
  }

  private areElementsDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.elements.isDifferent(other.elements);
    }
  }

  private areResistancesAlterationsDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.resistancesAlterations.isDifferent(other.resistancesAlterations);
    }
  }

  private isTwoHandedDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfBooleanDifferent(this.two_handed, other.two_handed);
    }
  }

  private isVarianceMinDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.variance_min, other.variance_min);
    }
  }

  private isVarianceMaxDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.variance_max, other.variance_max);
    }
  }

  private areTueursDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.tueurs, other.tueurs);
    }
  }

  private areTueursMDifferent(other: Objet): boolean {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.tueurs_m, other.tueurs_m);
    }
  }
}
