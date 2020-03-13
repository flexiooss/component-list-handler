import {isNode, isString} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'

export class ViewListHandlerMounterConfig {
  constructor() {
    /**
     *
     * @type {ComponentContext}
     * @private
     */
    this.__componentContext = null

    /**
     *
     * @type {Element}
     * @private
     */
    this.__parentNode = null

    /**
     *
     * @type {PublicStoreHandler<ItemCollection, ItemCollectionBuilder>}
     * @private
     */
    this.__storeItemCollection = null

    /**
     *
     * @type {string}
     * @private
     */
    this.__idPrefix = ''
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ViewListHandlerMounterConfig}
   */
  componentContext(componentContext) {
    TypeCheck.isComponentContext(componentContext)
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param {Element} parentNode
   * @return {ViewListHandlerMounterConfig}
   */
  parentNode(parentNode) {
    isNode(parentNode)
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {PublicStoreHandler<ItemCollection, ItemCollectionBuilder>} storeItemCollection
   * @returns {ViewListHandlerMounterConfig}
   */
  storeItemCollection(storeItemCollection) {
    TypeCheck.isPublicStoreHandler(storeItemCollection)
    this.__storeItemCollection = storeItemCollection
    return this
  }

  /**
   *
   * @param {string} idPrefix
   * @returns {ViewListHandlerMounterConfig}
   */
  idPrefix(idPrefix) {
    isString(idPrefix)
    this.__idPrefix = idPrefix
    return this
  }




  /**
   *
   * @returns {ComponentContext}
   */
  getComponentContext() {
    return this.__componentContext
  }

  /**
   *
   * @returns {Element}
   */
  getParentNode() {
    return this.__parentNode
  }

  /**
   *
   * @returns {PublicStoreHandler<ItemCollection, ItemCollectionBuilder>}
   */
  getStoreItemCollection() {
    return this.__storeItemCollection
  }

  /**
   *
   * @returns {string}
   */
  getIDPrefix() {
    return this.__idPrefix
  }
}
