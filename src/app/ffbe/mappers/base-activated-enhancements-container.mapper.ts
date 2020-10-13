import {BaseActivatedAmeliorationsContainer} from '../model/base-activated-ameliorations-container.model';
import {BaseActivatedEnhancementsContainer} from '../model/base-activated-enhancements-container.model';
import {EnhancementMapper} from './enhancement-mapper.model';

export class BaseActivatedEnhancementsContainerMapper {

  public static toBaseActivatedAmeliorationsContainer(enhancementsContainer: BaseActivatedEnhancementsContainer)
    : BaseActivatedAmeliorationsContainer {

    const baseAmeliorations =
      enhancementsContainer?.baseEnhancements.map(baseEnhancement => {
        return EnhancementMapper.toAmelioration(baseEnhancement);
      });

    const activatedAmeliorations =
      enhancementsContainer.activatedEnhancements?.map(activatedEnhancement => {
        return EnhancementMapper.toAmelioration(activatedEnhancement);
      });

    return new BaseActivatedAmeliorationsContainer(baseAmeliorations, activatedAmeliorations);
  }

}
