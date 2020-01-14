import {InMemoryStoreBuilder, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreItemCollection {
  /**
   * @private
   * @param {Store<ItemCollection, ItemCollectionBuilder>} store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {ProxyStore<ItemCollection, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @returns {StoreItemCollection}
   */
  static create(componentContext, proxyStoreItems) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreExecutions:build: `componentContext` should be a ComponentContext'
    )
    return new StoreItemCollection(
      componentContext.addStore(
        new InMemoryStoreBuilder()
          .type(globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollection)
          .initialData(new globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollectionBuilder()
            .elements(proxyStoreItems.state().data().elements())
            .build())
          .build()
      )
    )
  }

  /**
   * @returns {Store<ItemCollection, ItemCollectionBuilder>}
   */
  store() {
    return this.__store
  }

  /**
   * @returns {PublicStoreHandler<ItemCollection, ItemCollectionBuilder>}
   */
  storePublic() {
    return new PublicStoreHandler(this.__store)
  }
}
