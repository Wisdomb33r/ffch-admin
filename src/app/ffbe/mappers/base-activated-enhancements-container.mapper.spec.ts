import {BaseActivatedEnhancementsContainer} from '../model/base-activated-enhancements-container.model';
import {BaseActivatedEnhancementsContainerMapper} from './base-activated-enhancements-container.mapper';

describe('BaseActivatedEnhancementsContainerMapper', function () {
  it('should convert container with only base enhancements correctly', () => {
    // GIVEN
    const enhancementsContainer = new BaseActivatedEnhancementsContainer(null, null);

    // WHEN
    const ameliorationsContainer = BaseActivatedEnhancementsContainerMapper.toBaseActivatedAmeliorationsContainer(enhancementsContainer);

    // THEN
    expect(ameliorationsContainer).toBeNull();
  });
});
