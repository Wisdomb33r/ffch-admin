import {Skill} from '../../../skill.model';
import {AbilitySkillEffectFactory} from '../../ability-skill-effect.factory';

describe('AbilitySkillTagTeamAttackActivationEffect', () => {

  it('should parse tag team attack activation', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 165, [513561,  1,  1,  1,  1,  5]]');
    const fakeSkill = new Skill();
    fakeSkill.gumi_id = 513561;
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Active le combo duo pour cette attaque');
  });

  it('should parse tag team attack activation', () => {
    // GIVEN
    const effect = JSON.parse('[0, 3, 165, [513561,  1,  1,  1,  1,  1]]');
    const fakeSkill = new Skill();
    fakeSkill.gumi_id = 987654;
    // WHEN
    const s = AbilitySkillEffectFactory.getSkillEffect(effect).wordEffect(fakeSkill);
    // THEN
    expect(s).toEqual('Effet AbilitySkillTagTeamAttackActivationEffect inconnu: Mauvaise liste de paramètres');
  });

});
