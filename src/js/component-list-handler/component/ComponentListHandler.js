import '../../../../generated/io/package'
import {StoreItemCollection} from '../stores/StoreItemCollection'
import {ViewContainerListHandler} from '../views/ViewContainerListHandler'
import {ViewContainerParameters} from '@flexio-oss/hotballoon'

export class ComponentListHandler {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   * @param {ProxyStore<TYPE, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @param {string} idPrefix
   * @param {Function} onCreateItem
   * @param {Function} onDeleteItem
   */
  constructor(componentContext, parentNode, proxyStoreItems, idPrefix, onCreateItem, onDeleteItem) {
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__proxyStoreItems = proxyStoreItems
    this.__idPrefix = idPrefix
    this.__onCreateItem = onCreateItem
    this.__onDeleteItem = onDeleteItem
    
    this.__viewContainer = null
    
    this.__storeItemCollection = StoreItemCollection.create(this.__componentContext, this.__proxyStoreItems)
    this.__proxyStoreItems.listenChanged(
      /**
       *
       * @param {ItemCollection} payload
       */
      (payload) => {
        let currentCollection = this.__storeItemCollection.store().state().data().elements()
        let newCollection = this.__proxyStoreItems.state().data().elements()
        let addedItems = currentCollection.filter((item) => {
          return !newCollection.includes(item);
        })
        let removedItems = newCollection.filter((item) => {
          return !currentCollection.includes(item);
        })
        addedItems.forEach((item) => {
          this.__onCreateItem(item)
        })

        removedItems.forEach((item) => {
          this.__onDeleteItem(item)
        })
        
        this.__storeItemCollection.store().set(
          this.__storeItemCollection.store().dataBuilder()
            .elements(newCollection)
            .build()
        )
      }
    )

    this.__mountView()
  }

  __mountView() {
    this.__viewContainer =  new ViewContainerListHandler(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        this.__parentNode
      ),
      this.__storeItemCollection.storePublic(),
      this.__idPrefix
    )

    this.__viewContainer.renderAndMount()
    this.__componentContext.addViewContainer(this.__viewContainer)
    return this
  }
}
