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

  public getMonsterName(type: number): string {
    return FFBE_MONSTER_TYPES[type].pluralName;
  }

  public formateTueur(value: number): string {
    let result = '';
    if (!FfbeUtils.isNullOrUndefined(value) && value !== 0) {
      result = `${value}%`;
    }
    return result;
  }

}
