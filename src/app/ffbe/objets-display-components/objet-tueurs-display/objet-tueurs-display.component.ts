import {Component, Input, OnInit} from '@angular/core';
import {Tueurs} from '../../model/tueurs.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {FFBE_MONSTER_TYPES} from '../../ffbe.constants';

@Component({
  selector: 'app-objet-tueurs-display',
  templateUrl: './objet-tueurs-display.component.html',
  styleUrls: ['./objet-tueurs-display.component.css']
})
export class ObjetTueursDisplayComponent implements OnInit {

  @Input() titre: string;
  @Input() tueurs: Tueurs;

  constructor() {
  }

  ngOnInit(): void {
  }

  public formateMonsterType(type: number): string {
    const lowercaseName = FFBE_MONSTER_TYPES[type].pluralName;
    return lowercaseName.charAt(0).toUpperCase() + lowercaseName.slice(1);
  }

  public formateTueur(value: number): string {
    let result = '';
    if (!FfbeUtils.isNullOrUndefined(value) && value !== 0) {
      result = `${value}%`;
    }
    return result;
  }

}
