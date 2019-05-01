import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../model/objet.model';
import {isNullOrUndefined} from 'util';
import {FfchClientService} from '../services/ffch-client.service';

@Component({
  selector: 'app-objet-display',
  templateUrl: './objet-display.component.html',
  styleUrls: ['./objet-display.component.css']
})
export class ObjetDisplayComponent implements OnInit {

  @Input() objet: Objet;
  @Input() present: boolean;
  @Input() different: boolean;

  public displayed = false;
  public objetErrors: Array<string> = [];

  constructor(private ffchClientService: FfchClientService) {
  }

  ngOnInit() {
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

  public sendObjetToFfchDb() {
    this.ffchClientService.postObjet$(this.objet)
      .subscribe(objet =>
          this.objet.id = (isNullOrUndefined(objet) ? null : objet.id),
        status => this.objetErrors.push('Could not send objet'));
  }

}
