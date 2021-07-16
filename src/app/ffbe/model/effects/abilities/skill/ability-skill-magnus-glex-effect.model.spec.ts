import {SkillMockDataHelper} from '../../../skill.model.spec';
import {Skill} from '../../../skill.model';
import {SkillsService} from '../../../../services/skills.service';
import {SkillsServiceMock} from '../../../../services/skills.service.spec';
import {SkillMapper} from '../../../../mappers/skill-mapper';

describe('AbilitySkillMagnusGlexEffect', () => {
  it('should parse GLEX magnus skills', () => {
    // GIVEN
    const magnusSkill: Skill = SkillMockDataHelper.mockAbilitySkill(913625);

    // WHEN
    const competence = SkillMapper.toCompetence(magnusSkill);

    // THEN
    expect(competence.effet).toEqual('<strong>1 utilisation par combat</strong>:<br />+100 cristaux de limite aux alliés sauf le lanceur');
  });

  it('should parse GLEX magnus skills with per-turn usage restriction', () => {
    // GIVEN
    const activatedSkill: Skill = SkillMockDataHelper.mockAbilitySkill(913897);

    const skillsServiceMock = new SkillsServiceMock() as SkillsService;
    SkillsService['INSTANCE'] = skillsServiceMock;
    const mySpy = spyOn(skillsServiceMock, 'searchForSkillByGumiId').and.returnValues(activatedSkill, activatedSkill);
    const magnusSkill: Skill = SkillMockDataHelper.mockAbilitySkill(913881);

    // WHEN
    const competence = SkillMapper.toCompetence(magnusSkill);

    // THEN
    expect(mySpy).toHaveBeenCalledTimes(2);
    expect(mySpy).toHaveBeenCalledWith(913897);
    expect(competence.effet).toEqual('<strong>2 utilisations par combat</strong>:<br />'
      + 'Disponible tous les 5 tours dès le tour 5:<br />' +
      'Dégâts physiques neutres de puissance 2000% avec sacrifice de 51% des PV du lanceur aux adversaires<br />' +
      'Dégâts physiques neutres de puissance 2000% (ignore 50% DÉF, 4000% total) aux adversaires (ignore les couvertures)<br />' +
      '+10 esquives physiques au lanceur pour 3 tours<br />' +
      '100% de chance pour le lanceur de contrer les dégâts physiques par une attaque de puissance 1000% pour 3 tours (max 5 par tour)'
    );
    expect(competence.puissance).toEqual(6000);

    expect(magnusSkill.attack_count.length).toEqual(2);
    expect(magnusSkill.attack_count[0]).toEqual(9);
    expect(magnusSkill.attack_count[1]).toEqual(1);

    expect(magnusSkill.attack_frames.length).toEqual(2);
    expect(magnusSkill.attack_frames[0].length).toEqual(9);
    expect(magnusSkill.attack_frames[0][0]).toEqual(110);
    expect(magnusSkill.attack_frames[0][1]).toEqual(120);
    expect(magnusSkill.attack_frames[0][8]).toEqual(190);
    expect(magnusSkill.attack_frames[1].length).toEqual(1);
    expect(magnusSkill.attack_frames[1][0]).toEqual(200);

    expect(magnusSkill.attack_damage.length).toEqual(2);
    expect(magnusSkill.attack_damage[0].length).toEqual(9);
    expect(magnusSkill.attack_damage[0][0]).toEqual(11);
    expect(magnusSkill.attack_damage[0][1]).toEqual(11);
    expect(magnusSkill.attack_damage[1].length).toEqual(1);
    expect(magnusSkill.attack_damage[1][0]).toEqual(100);
    expect(magnusSkill.attack_type).toEqual('Physical');
    expect(magnusSkill.physique).toBeTruthy();
  });

});
