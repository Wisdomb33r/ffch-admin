import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Objet} from '../../model/objet/objet.model';
import {FfchClientService} from '../../services/ffch-client.service';
import {FFBE_CATEGORIES_OBJETS} from '../../ffbe.constants';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {CategorieObjet} from '../../model/objet/categorie-objet.model';

@Component({
  selector: 'app-objet-display',
  templateUrl: './objet-display.component.html',
  styleUrls: ['./objet-display.component.css']
})
export class ObjetDisplayComponent implements OnInit, OnChanges {

  @Input() objet: Objet;
  @Input() present: boolean;
  @Input() different: boolean;

  public displayed = false;
  public objetErrors: Array<string> = [];
  public categories: Array<CategorieObjet> = [];
  public categorieFfchId: number;

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
    this.populateCategories();
  }

  ngOnChanges() {
    if (!FfbeUtils.isNullOrUndefined(this.objet?.categorie)) {
      this.categorieFfchId = this.objet.categorie.ffchId;
    }
  }

  public populateCategories() {
    this.categories = FFBE_CATEGORIES_OBJETS.map(categorie => categorie);
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

  public areObjetErrorsDiplayed(): boolean {
    return Array.isArray(this.objetErrors) && this.objetErrors.length > 0;
  }

  public areObjetCompetencesDisplayed(): boolean {
    return Array.isArray(this.objet.competences) && this.objet.competences.length > 0;
  }

  public updateCategorie() {
    this.objet.categorie = FfbeUtils.findObjetCategorieByFfchId(this.categorieFfchId);
  }

  public hasLienTRM(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.objet.lienTMR);
  }

  public sendObjetToFfchDb() {
    this.ffchClientService.postObjet$(this.objet)
      .subscribe(objet =>
          this.objet.id = (FfbeUtils.isNullOrUndefined(objet) ? null : objet.id),
        status => this.objetErrors.push('Could not send objet'));
  }

}
