import '../../../generated/io/package'
import {StoreItemCollection} from '../stores/StoreItemCollection'
import {ActionCreateItems} from '../actions/ActionCreateItems'
import {ActionDeleteItems} from '../actions/ActionDeleteItems'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {isNull} from '@flexio-oss/assert'
import {ViewListHandlerMounterConfig} from '../views/ViewListHandlerMounter/ViewListHandlerMounterConfig'

/**
 * @template TYPE, TYPE_BUILDER
 */
export class ComponentListHandler {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @param {ProxyStore<TYPE, TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @param {string} idPrefix
   * @param {boolean} reconcile
   */
  constructor(componentContext, parentNode, viewListHandlerMounter, proxyStoreItems, idPrefix, reconcile) {
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__viewListHandlerMounter = viewListHandlerMounter
    this.__proxyStoreItems = proxyStoreItems
    this.__idPrefix = idPrefix
    this.__reconcile = reconcile

    this.__actionCreateItems = ActionCreateItems.create(this.__componentContext.dispatcher())
    this.__actionDeleteItems = ActionDeleteItems.create(this.__componentContext.dispatcher())

    this.__viewContainer = null

    this.__storeItemCollection = StoreItemCollection.create(this.__componentContext, this.__proxyStoreItems)
    this.__proxyStoreItems.listenChanged(
      /**
       *
       * @param {StoreState<ItemCollection>} payload
       */
      (payload) => {
        let currentCollection = this.__storeItemCollection.store().state().data().elements()
        let newCollection = payload.data().elements()

        let removedItems = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()
        let addedItems = new globalFlexioImport.io.flexio.flex_types.arrays.StringArray()

        if (this.__reconcile) {
          if (isNull(currentCollection) || isNull(newCollection)) {
            if (isNull(currentCollection)) {
              addedItems = newCollection
            } else if (isNull(newCollection)) {
              removedItems = currentCollection
            }
          } else if (!currentCollection.equals(newCollection)) {
            currentCollection.forEach((item) => {
              if (!newCollection.includes(item)) {
                removedItems.push(item)
              }
            })

            newCollection.forEach((item) => {
              if (!currentCollection.includes(item)) {
                addedItems.push(item)
              }
            })
          }
        } else {
          removedItems = currentCollection
          addedItems = newCollection
        }

        if (!isNull(removedItems) && removedItems.length) {
          this.__actionDeleteItems.action().dispatch(
            this.__actionDeleteItems.action().payloadBuilder().elements(removedItems).build()
          )
        }

        this.__storeItemCollection.store().set(
          this.__storeItemCollection.store().dataBuilder()
            .elements(newCollection)
            .build()
        )

        if (!isNull(addedItems) && addedItems.length) {
          this.__actionCreateItems.action().dispatch(
            this.__actionCreateItems.action().payloadBuilder().elements(addedItems).build()
          )
        }
      }
    )

    this.__mountView()
  }

  __mountView() {
    this.__viewContainer = this.__viewListHandlerMounter
      .buildView(new ViewListHandlerMounterConfig()
        .componentContext(this.__componentContext)
        .parentNode(this.__parentNode)
        .storeItemCollection(this.__storeItemCollection.storePublic())
        .idPrefix(this.__idPrefix)
      ).viewContainer()

    this.__componentContext.addViewContainer(this.__viewContainer)
    return this
  }

  /**
   * @param {Function} onCreateItem
   * @return {ComponentListHandler}
   */
  onCreateItem(onCreateItem) {
    this.__actionCreateItems.action().listenWithCallback(onCreateItem, this.__componentContext)
    return this
  }

  /**
   * @param {Function} onDeleteItem
   * @return {ComponentListHandler}
   */
  onDeleteItem(onDeleteItem) {
    this.__actionDeleteItems.action().listenWithCallback(onDeleteItem, this.__componentContext)
    return this
  }

  remove() {
    this.__componentContext.logger().log(
      this.__componentContext.logger().builder()
        .info()
        .pushLog(this.constructor.name + ': Hotballoon killed me'),
      {color: '#ca4ee2', titleSize: 3}
    )
    this.__componentContext.remove()
    this.__componentContext = null
  }

  /**
   *
   * @param {string} id
   * @returns {Element}
   */
  nodeByID(id) {
    return this.__viewContainer.nodeByID(id)
  }
}
