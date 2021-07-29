import {Component, Input, OnInit} from '@angular/core';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {UniteCarac} from '../../model/unite-carac.model';

@Component({
  selector: 'app-caracteristiques-ex-display',
  templateUrl: './caracteristiques-ex-display.component.html',
  styleUrls: ['./caracteristiques-ex-display.component.css']
})
export class CaracteristiquesEXDisplayComponent implements OnInit {

  @Input() caracEX: Array<UniteCarac>;

  constructor() {
  }

  ngOnInit(): void {
  }

  public formateCarac(carac: number): string {
    return (!FfbeUtils.isNullOrUndefined(carac) && carac > 0) ? `${carac}` : '';
  }

}
