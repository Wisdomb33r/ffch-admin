import {Component, Input, OnInit} from '@angular/core';
import {Tueurs} from '../../model/tueurs.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

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

  public formateTueur(value: number): string {
    let result = '';
    if (!FfbeUtils.isNullOrUndefined(value) && value !== 0) {
      result = `${value}%`;
    }
    return result;
  }

}
