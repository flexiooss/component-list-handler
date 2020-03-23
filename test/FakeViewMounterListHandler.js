import {FakeViewContainerListHandler} from './FakeViewContainerListHandler'
import {ViewListHandlerMounter} from '../src/js/views/ViewListHandlerMounter/ViewListHandlerMounter'

export class FakeViewMounterListHandler extends ViewListHandlerMounter {
  constructor(componentContext) {
    super()
    this.componentContext = componentContext
  }
  buildView(viewMounterConfig) {
    return this
  }
  /**
   * @return {ViewContainerListHandler}
   */
  viewContainer() {
    return new FakeViewContainerListHandler(this.componentContext)
  }
}