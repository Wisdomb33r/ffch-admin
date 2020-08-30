import {Component, Input, OnInit} from '@angular/core';
import {CaracteristiquesContainer} from '../model/caracteristiques-container.model';
import {FfbeUtils} from '../utils/ffbe-utils';

@Component({
  selector: 'app-caracteristiques-container-display',
  templateUrl: './caracteristiques-container-display.component.html',
  styleUrls: ['./caracteristiques-container-display.component.css']
})
export class CaracteristiquesContainerDisplayComponent implements OnInit {

  @Input() container: CaracteristiquesContainer;
  @Input() displayPots: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  public caracFormatee(carac: number, estPourcent: boolean = false): string {
    let caracFormatee = '';

    if (!FfbeUtils.isNullOrUndefined(carac) && carac > 0) {
      caracFormatee = carac.toString() + (estPourcent ? ' %' : '');
    }

    return caracFormatee;
  }

  public caracFormateePourcent(carac: number): string {
    return this.caracFormatee(carac, true);
  }

}
