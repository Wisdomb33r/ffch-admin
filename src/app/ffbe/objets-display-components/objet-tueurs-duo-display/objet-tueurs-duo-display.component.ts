import {Component, Input, OnInit} from '@angular/core';
import {Objet} from '../../model/objet/objet.model';

@Component({
  selector: 'app-objet-tueurs-duo-display',
  templateUrl: './objet-tueurs-duo-display.component.html',
  styleUrls: ['./objet-tueurs-duo-display.component.css']
})
export class ObjetTueursDuoDisplayComponent implements OnInit {

  @Input() objet: Objet;
  public displayed = false;

  constructor() { }

  ngOnInit(): void {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
