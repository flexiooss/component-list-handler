import {FakeViewContainerListHandler} from './FakeViewContainerListHandler'

export class FakeViewMounterListHandler {
  constructor(componentContext) {
    this.componentContext = componentContext
  }
  buildView(viewMounterConfig) {
    return this
  }
  /**
   * @return {ViewContainer}
   */
  viewContainer() {
    return new FakeViewContainerListHandler(this.componentContext)
  }
}