import {ComponentListHandler} from './ComponentListHandler'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, assertType, isBoolean, isNode, isNull, isString} from '@flexio-oss/assert'
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

    /**
     *
     * @type {boolean}
     * @private
     */
    this.__reconcile = true
  }

  /**
   * @param {HotBalloonApplication} application
   * @return {ComponentListHandlerBuilder}
   */
  application(application) {
    assert(TypeCheck.isHotballoonApplication(application), 'ComponentListHandlerBuilder:application: argument should be a HotballoonApplication')
    this.__application = application
    return this
  }

  /**
   * @param {Element} parentNode
   * @return {ComponentListHandlerBuilder}
   */
  parentNode(parentNode){
    assert(isNode(parentNode), 'ComponentListHandlerBuilder:parentNode: argument should be a node')
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {String} idPrefix
   * @return {ComponentListHandlerBuilder}
   */
  idPrefix(idPrefix){
    assert(isString(idPrefix), 'ComponentListHandlerBuilder:idPrefix: argument should be a string')
    this.__idPrefix = idPrefix
    return this
  }

  /**
   *
   * @param {ProxyStore<STORE_TYPE, STORE_TYPE_BUILDER, ItemCollection, ItemCollectionBuilder>} proxyStoreItems
   * @returns {ComponentListHandlerBuilder}
   */
  proxyStoreItems(proxyStoreItems) {
    assert(TypeCheck.isProxyStore(proxyStoreItems), 'ComponentListHandlerBuilder:proxyStoreItems: argument should be a ProxyStore')
    this.__proxyStoreItems = proxyStoreItems
    return this
  }

  /**
   *
   * @param {ViewListHandlerMounter} viewListHandlerMounter
   * @returns {ComponentListHandlerBuilder}
   */
  viewListHandlerMounter(viewListHandlerMounter) {
    assert(isViewListHandlerMounter(viewListHandlerMounter), 'ComponentListHandlerBuilder:viewListHandlerMounter: argument should be a ViewListHandlerMounter')

    this.__viewListHandlerMounter = viewListHandlerMounter
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {ComponentListHandlerBuilder}
   */
  reconcile(value) {
    assert(isBoolean(value), 'ComponentListHandlerBuilder:reconcile: argument should be a boolean')
    this.__reconcile = value
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
        this.__idPrefix,
        this.__reconcile
      )
    )
  }
}
