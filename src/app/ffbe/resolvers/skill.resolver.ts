import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Skill} from '../model/skill.model';
import {SkillsService} from '../services/skills.service';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SkillResolver implements Resolve<Skill> {

  constructor(private skillsService: SkillsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Skill> {
    const skillId: number = +route.paramMap.get('skillId');
    return this.skillsService.loadSkillsFromDataMining().pipe(
      map(() => this.skillsService.searchForSkillByGumiId(skillId))
    );
  }

}
