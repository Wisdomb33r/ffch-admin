import {VisionCard} from '../model/items/vision-cards/vision-card.model';

export class VisionCardsServiceMock {
  private static INSTANCE: VisionCardsServiceMock = new VisionCardsServiceMock();

  public static getInstance() {
    return VisionCardsServiceMock.INSTANCE;
  }

  public searchForVisionCardByGumiId(gumiId: number): VisionCard {
    return null;
  }
}
