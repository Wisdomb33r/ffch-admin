import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-objet-tueurs-display',
  templateUrl: './objet-tueurs-display.component.html',
  styleUrls: ['./objet-tueurs-display.component.css']
})
export class ObjetTueursDisplayComponent implements OnInit {

  @Input() titre: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
