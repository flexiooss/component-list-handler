import {ComponentListHandler} from './ComponentListHandler'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, assertType, isBoolean, isNode, isNull, isString} from '@flexio-oss/assert'
import {ComponentListHandlerPublic} from './ComponentListHandlerPublic'
import {isViewListHandlerMounter} from '../views/ViewListHandlerMounter/ViewListHandlerMounter'
import {ItemCollection} from '../../../generated/io/flexio/component_list_handler/stores/ItemCollection'

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
     * @type {StoreBase<ItemCollection, ItemCollectionBuilder>}
     * @private
     */
    this.__storeItems = null

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
   * @param {StoreBase<ItemCollection, ItemCollectionBuilder>} storeItems
   * @returns {ComponentListHandlerBuilder}
   */
  storeItems(storeItems) {
    assert(TypeCheck.isStoreBase(storeItems), 'ComponentListHandlerBuilder:storeItems: argument should be a StoreBase')
    assert(storeItems.__type__() === ItemCollection, 'ComponentListHandlerBuilder:storeItems: argument should be a StoreBase of type ItemCollection')


    this.__storeItems = storeItems
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
    assertType(!isNull(this.__storeItems), 'storeItems node should be set')
    assertType(!isNull(this.__viewListHandlerMounter), 'viewListHandlerMounter node should be set')
    return new ComponentListHandlerPublic(
      new ComponentListHandler(
        this.__application.addComponentContext(),
        this.__parentNode,
        this.__viewListHandlerMounter,
        this.__storeItems,
        this.__idPrefix,
        this.__reconcile
      )
    )
  }
}
