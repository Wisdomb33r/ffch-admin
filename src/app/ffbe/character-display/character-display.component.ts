import {FFBE_FRENCH_TABLE_INDEX, FFBE_GAMES} from '../ffbe.constants';
import {CharactersService} from '../services/characters.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-character-display',
  templateUrl: './character-display.component.html',
  styleUrls: ['./character-display.component.css']
})
export class CharacterDisplayComponent implements OnInit {

  constructor(public service: CharactersService) {}

  ngOnInit() {
  }

  public getCharacterName() {
    return this.service.character.names[FFBE_FRENCH_TABLE_INDEX];
  }

  public getCharacterJob() {
    return this.service.character.job;
  }

  public getCharacterGame() {
    return FFBE_GAMES.find(game => game.gumiId === this.service.character.game_id).name;
  }
}
