import {Character} from '../model/character.model';
import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;

  constructor(public service: CharactersService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
    this.service.loadCharactersFromDataMining();
  }

  public searchCharacterInDataMining() {
    this.service.searchForCharacterByName(this.name.value);
  }

  public isCharacterDisplayed(): boolean {
    return this.service.character != null;
  }
}
