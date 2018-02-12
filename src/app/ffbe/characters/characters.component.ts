import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Personnage} from '../model/personnage.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;
  personnage: Personnage;

  constructor(private service: CharactersService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
  }

  public searchCharacterInDataMining() {
    this.personnage = this.service.searchForCharacterByName(this.name.value);
  }

  public isCharacterDisplayed(): boolean {
    return this.personnage != null;
  }
}
