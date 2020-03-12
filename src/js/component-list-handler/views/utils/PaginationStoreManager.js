import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

export class PaginationStoreManager {
  /**
   *
   * @param {PublicStoreHandler<Page, PageBuilder>} publicStorePageSelected
   * @param {PublicStoreHandler<Pagination, PaginationBuilder>} publicStorePagination
   */
  constructor(publicStorePageSelected, publicStorePagination) {
    assertType(publicStorePageSelected.isTypeOf(globalFlexioImport.io.flexio.component_pagination.stores.Page),
      'ExecutionsStoreManager:constructor: `publicStoreLogs` should be a Store of Logs'
    )
    this.__publicStorePageSelected = TypeCheck.assertStoreBase(publicStorePageSelected)


    assertType(publicStorePagination.isTypeOf(globalFlexioImport.io.flexio.component_pagination.stores.Pagination),
      'ExecutionsStoreManager:constructor: `publicStoreLogs` should be a Store of Logs'
    )
    this.__publicStorePagination = TypeCheck.assertStoreBase(publicStorePagination)
  }

  /**
   *
   * @returns {PublicStoreHandler<Page>}
   */
  storePageSelected() {
    return this.__publicStorePageSelected
  }

  /**
   *
   * @returns {PublicStoreHandler<Pagination>}
   */
  storePagination() {
    return this.__publicStorePagination
  }
}

export const isPaginationStoreManager = (paginationStoreManager) => {return paginationStoreManager instanceof PaginationStoreManager}
