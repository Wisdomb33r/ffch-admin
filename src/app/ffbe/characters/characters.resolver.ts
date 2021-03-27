import {Character} from '../model/character/character.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CharactersService} from '../services/characters.service';
import {LimitBurstsService} from '../services/limit-bursts.service';
import {SkillsService} from '../services/skills.service';
import {ConsumablesService} from '../services/consumables.service';
import {EquipmentsService} from '../services/equipments.service';
import {MateriasService} from '../services/materias.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharactersResolver implements Resolve<Array<Character>> {
  constructor(
    private charactersService: CharactersService,
    private limitBurstsService: LimitBurstsService,
    private skillsService: SkillsService,
    // do not remove the injection of Equipments, Consumables and Materias services, it serves to load the INSTANCE singletons
    private consumablesService: ConsumablesService,
    private equipmentsService: EquipmentsService,
    private materiasService: MateriasService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.charactersService.searchForCharactersByNameOrGumiId(route.paramMap.get('id'));
  }
}
