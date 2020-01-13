import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

export class PaginationActionManager {
  /**
   *
   * @param {ActionDispatcher<ChangePage, ChangePageBuilder>} actionChangePage
   */
  constructor(actionChangePage) {
    assertType(actionChangePage.isTypeOf(globalFlexioImport.io.flexio.component_pagination.actions.ChangePage),
      'ExecutionsActionManager:constructor: `actionShowFilters` should be an Action of ShowFilters'
    )
    this.__actionChangePage = TypeCheck.assertIsActionDispatcher(actionChangePage)
  }

  /**
   *
   * @returns {ActionDispatcher<ChangePage, ChangePageBuilder>}
   */
  actionChangePage() {
    return this.__actionChangePage
  }
}

export const isPaginationActionManager = (paginationActionManager) => {return paginationActionManager instanceof PaginationActionManager}
