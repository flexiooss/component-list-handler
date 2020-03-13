import {FakeViewContainerPagination} from '@flexio-corp/component-pagination/src/test/FakeViewContainerPagination'
import {ViewMounter} from '../../../../../../src/js/modules/configs/ViewMounter'

export class FakeViewMounterListHandler extends ViewMounter {
  constructor(componentContext) {
    super()
    this.componentContext = componentContext
  }
  buildView(viewMounterConfig) {
    return this
  }
  /**
   * @return {ViewContainer}
   */
  viewContainer() {
    return new FakeViewContainerPagination(this.componentContext)
  }
}