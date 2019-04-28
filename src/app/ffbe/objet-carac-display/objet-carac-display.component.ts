import {Component, Input, OnInit} from '@angular/core';
import {ObjetCarac} from '../model/objet-carac';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-objet-carac-display',
  templateUrl: './objet-carac-display.component.html',
  styleUrls: ['./objet-carac-display.component.css']
})
export class ObjetCaracDisplayComponent implements OnInit {

  @Input() carac: ObjetCarac;
  @Input() titre: string;
  @Input() estPourcent: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  public caracFormatee(carac: number): string {
    let caracFormatee = '';

    if (!isNullOrUndefined(carac)) {
      caracFormatee = carac.toString() + this.suffixe();
    }

    return caracFormatee;
  }

  public suffixe(): string {
    return this.estPourcent ? ' %' : '';
  }

}
