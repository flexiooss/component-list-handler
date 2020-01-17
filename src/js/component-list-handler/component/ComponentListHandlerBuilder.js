import {ComponentListHandler} from './ComponentListHandler'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, isNode, isNull, isString} from '@flexio-oss/assert'
import {ComponentListHandlerPublic} from './ComponentListHandlerPublic'
import {isViewListHandlerMounter} from '../views/ViewListHandlerMounter/ViewListHandlerMounter'

/**
 * @template STORE_TYPE, STORE_TYPE_BUILDER
 */
export class ComponentListHandlerBuilder {
  constructor() {
    /**
     *
     * @type {HotBalloonApplication}
     * @private
     */
    this.__application = null

    /**
     *
     * @type {Element}
     * @private
     */
    this.__parentNode = null

    /**
     *
     * @type {string}
     * @private
     */
    this.__idPrefix = ''

    /**
     *
     * @type {ProxyStore<STORE_TYPE, STORE_TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>}
     * @private
     */
    this.__proxyStoreItems = null

    /**
     *
     * @type {ViewListHandlerMounter}
     * @private
     */
    this.__viewListHandlerMounter = null
  }

  /**
   * @param {HotBalloonApplication} application
   * @return {ComponentListHandlerBuilder}
   */
  application(application) {
    TypeCheck.isHotballoonApplication(application)
    this.__application = application
    return this
  }

  /**
   * @param {Element} parentNode
   * @return {ComponentListHandlerBuilder}
   */
  parentNode(parentNode){
    isNode(parentNode)
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {String} idPrefix
   * @return {ComponentListHandlerBuilder}
   */
  idPrefix(idPrefix){
    isString(idPrefix)
    this.__idPrefix = idPrefix
    return this
  }

  /**
   *
   * @param {ProxyStore<STORE_TYPE, STORE_TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @returns {ComponentListHandlerBuilder}
   */
  proxyStoreItems(proxyStoreItems) {
    this.__proxyStoreItems = proxyStoreItems
    return this
  }

  /**
   *
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @returns {ComponentListHandlerBuilder}
   */
  viewListHandlerMounter(viewListHandlerMounter) {
    isViewListHandlerMounter(viewListHandlerMounter)
    this.__viewListHandlerMounter = viewListHandlerMounter
    return this
  }

  /**
   * @return {ComponentListHandlerPublic}
   */
  build() {
    assertType(!isNull(this.__application), 'componentContext node should be set')
    assertType(!isNull(this.__parentNode), 'parentNode node should be set')
    assertType(!isNull(this.__idPrefix), 'idPrefix node should be set')
    assertType(!isNull(this.__proxyStoreItems), 'proxyStoreItems node should be set')
    assertType(!isNull(this.__viewListHandlerMounter), 'viewListHandlerMounter node should be set')
    return new ComponentListHandlerPublic(
      new ComponentListHandler(
        this.__application.addComponentContext(),
        this.__parentNode,
        this.__viewListHandlerMounter,
        this.__proxyStoreItems,
        this.__idPrefix
      )
    )
  }
}
