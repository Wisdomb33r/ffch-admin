import {BaseActivatedEnhancementsContainer} from '../model/base-activated-enhancements-container.model';
import {BaseActivatedEnhancementsContainerMapper} from './base-activated-enhancements-container.mapper';
import {ENHANCEMENTS_TEST_DATA} from '../model/enhancement.model.testdata.spec';

describe('BaseActivatedEnhancementsContainerMapper', function () {
  it('should convert container with only base enhancements correctly', () => {
    // GIVEN
    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['230020001'];
    enhancement1.gumi_id = 230020001;
    enhancement1.skill_id_base = 230020;
    enhancement1.level = 1;
    const enhancement2 = enhancements['230020002'];
    enhancement2.gumi_id = 230020002;
    enhancement2.skill_id_base = 230020;
    enhancement2.level = 2;

    const enhancementsContainer = new BaseActivatedEnhancementsContainer([enhancement1, enhancement2], null);

    // WHEN
    const ameliorationsContainer = BaseActivatedEnhancementsContainerMapper.toBaseActivatedAmeliorationsContainer(enhancementsContainer);

    // THEN
    expect(ameliorationsContainer).toBeTruthy();
    expect(ameliorationsContainer.baseAmeliorations.length).toEqual(2);
    expect(ameliorationsContainer.baseAmeliorations[0].gumi_id).toEqual(230020001);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_old).toEqual(230020);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_new).toEqual(914071);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_base).toEqual(230020);
    expect(ameliorationsContainer.baseAmeliorations[0].niveau).toEqual(1);
    expect(ameliorationsContainer.baseAmeliorations[1].gumi_id).toEqual(230020002);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_old).toEqual(914071);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_new).toEqual(914072);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_base).toEqual(230020);
    expect(ameliorationsContainer.baseAmeliorations[1].niveau).toEqual(2);
    expect(ameliorationsContainer.activatedAmeliorations).toBeNull();
  });

  it('should convert container with base and activated enhancements correctly', () => {
    // GIVEN
    const enhancements = JSON.parse(ENHANCEMENTS_TEST_DATA);

    const enhancement1 = enhancements['228085001'];
    enhancement1.gumi_id = 228085001;
    enhancement1.skill_id_base = 228085;
    enhancement1.level = 1;
    const enhancement2 = enhancements['228085002'];
    enhancement2.gumi_id = 228085002;
    enhancement2.skill_id_base = 228085;
    enhancement2.level = 2;
    const enhancement3 = enhancements['230020001'];
    enhancement3.gumi_id = 230020001;
    enhancement3.level = 1;
    enhancement3.skill_id_base = 230020;
    const enhancement4 = enhancements['230020002'];
    enhancement4.gumi_id = 230020002;
    enhancement4.level = 2;
    enhancement4.skill_id_base = 230020;

    const enhancementsContainer = new BaseActivatedEnhancementsContainer(
      [enhancement1, enhancement2], [enhancement3, enhancement4]);

    // WHEN
    const ameliorationsContainer = BaseActivatedEnhancementsContainerMapper.toBaseActivatedAmeliorationsContainer(enhancementsContainer);

    // THEN
    expect(ameliorationsContainer).toBeTruthy();
    expect(ameliorationsContainer.baseAmeliorations.length).toEqual(2);
    expect(ameliorationsContainer.baseAmeliorations[0].gumi_id).toEqual(228085001);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_old).toEqual(228085);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_new).toEqual(707785);
    expect(ameliorationsContainer.baseAmeliorations[0].skill_id_base).toEqual(228085);
    expect(ameliorationsContainer.baseAmeliorations[0].niveau).toEqual(1);

    expect(ameliorationsContainer.baseAmeliorations[1].gumi_id).toEqual(228085002);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_old).toEqual(707785);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_new).toEqual(707786);
    expect(ameliorationsContainer.baseAmeliorations[1].skill_id_base).toEqual(228085);
    expect(ameliorationsContainer.baseAmeliorations[1].niveau).toEqual(2);

    expect(ameliorationsContainer.activatedAmeliorations.length).toEqual(2);
    expect(ameliorationsContainer.activatedAmeliorations[0].gumi_id).toEqual(230020001);
    expect(ameliorationsContainer.activatedAmeliorations[0].skill_id_old).toEqual(230020);
    expect(ameliorationsContainer.activatedAmeliorations[0].skill_id_new).toEqual(914071);
    expect(ameliorationsContainer.activatedAmeliorations[0].skill_id_base).toEqual(230020);
    expect(ameliorationsContainer.activatedAmeliorations[0].niveau).toEqual(1);

    expect(ameliorationsContainer.activatedAmeliorations[1].gumi_id).toEqual(230020002);
    expect(ameliorationsContainer.activatedAmeliorations[1].skill_id_old).toEqual(914071);
    expect(ameliorationsContainer.activatedAmeliorations[1].skill_id_new).toEqual(914072);
    expect(ameliorationsContainer.activatedAmeliorations[1].skill_id_base).toEqual(230020);
    expect(ameliorationsContainer.activatedAmeliorations[1].niveau).toEqual(2);
  });

});
