import {ComponentListHandler} from './ComponentListHandler'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assertType, isFunction, isNode, isNull, isString} from '@flexio-oss/assert'
import {ComponentListHandlerPublic} from './ComponentListHandlerPublic'

export class ComponentListHandlerBuilder {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__idPrefix = null
    this.__onCreateItem = null
    this.__onDeleteItem = null
    this.__proxyStoreItems = null
  }

  /**
   * @param {ComponentContext} value
   * @return {ComponentListHandlerBuilder}
   */
  componentContext(value) {
    TypeCheck.isComponentContext(value)
    this.__componentContext = value
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
   * @param {Function} onCreateItem
   * @return {ComponentListHandlerBuilder}
   */
  onCreateItem(onCreateItem){
    isFunction(onCreateItem)
    this.__onCreateItem = onCreateItem
    return this
  }

  /**
   * @param {Function} onDeleteItem
   * @return {ComponentListHandlerBuilder}
   */
  onDeleteItem(onDeleteItem){
    isFunction(onDeleteItem)
    this.__onDeleteItem = onDeleteItem
    return this
  }

  proxyStoreItems(proxyStoreItems) {
    this.__proxyStoreItems = proxyStoreItems
    return this
  }

  /**
   * @return {ComponentListHandlerPublic}
   */
  build() {
    assertType(!isNull(this.__componentContext), 'componentContext node should be set')
    assertType(!isNull(this.__parentNode), 'parentNode node should be set')
    assertType(!isNull(this.__idPrefix), 'idPrefix node should be set')
    assertType(!isNull(this.__onCreateItem), 'onCreateItem node should be set')
    assertType(!isNull(this.__onDeleteItem), 'onDeleteItem node should be set')
    assertType(!isNull(this.__proxyStoreItems), 'proxyStoreItems node should be set')
    return new ComponentListHandlerPublic(
      new ComponentListHandler(
        this.__componentContext,
        this.__parentNode,
        this.__proxyStoreItems,
        this.__idPrefix,
        this.__onCreateItem,
        this.__onDeleteItem
      )
    )
  }
}
