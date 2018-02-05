import {Character} from '../model/character.model';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  name: FormControl;

  constructor() {
    this.name = new FormControl('', Validators.required);
  }

  ngOnInit() {
  }

  searchCharacterInDataMining() {
    console.log('Going to search character with name : ' + this.name.value);
  }
}
