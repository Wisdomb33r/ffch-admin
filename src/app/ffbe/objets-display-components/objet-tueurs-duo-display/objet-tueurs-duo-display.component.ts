import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objet-tueurs-duo-display',
  templateUrl: './objet-tueurs-duo-display.component.html',
  styleUrls: ['./objet-tueurs-duo-display.component.css']
})
export class ObjetTueursDuoDisplayComponent implements OnInit {

  public displayed = false;

  constructor() { }

  ngOnInit(): void {
  }

  public switchDisplayed() {
    this.displayed = !this.displayed;
  }

}
