import {Component, Input, OnInit} from '@angular/core';
import {Caracteristiques} from '../model/caracteristiques.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-objet-carac-display',
  templateUrl: './objet-carac-display.component.html',
  styleUrls: ['./objet-carac-display.component.css']
})
export class ObjetCaracDisplayComponent implements OnInit {

  @Input() carac: Caracteristiques;
  @Input() titre: string;
  @Input() estPourcent: boolean;
  @Input() estModifiable: boolean;
  public displayed = false;

  constructor() {
  }

  ngOnInit() {
  }

  public caracFormatee(carac: number): string {
    let caracFormatee = '';

    if (!FfbeUtils.isNullOrUndefined(carac)) {
      caracFormatee = carac.toString() + this.suffixe();
    }

    return caracFormatee;
  }

  public suffixe(): string {
    return this.estPourcent ? ' %' : '';
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
