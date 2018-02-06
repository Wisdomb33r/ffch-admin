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
  character: Character;

  constructor(private service: CharactersService) {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
    this.service.loadCharactersFromDataMining();
  }

  searchCharacterInDataMining() {
    this.character = this.service.searchForCharacterByName(this.name.value);
    console.log(this.character);
  }
}
