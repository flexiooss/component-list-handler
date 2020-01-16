import {ComponentListHandler} from './ComponentListHandler'
import {assertType, isFunction} from '@flexio-oss/assert'

const __componentListHandler = Symbol('__list-handler')

export class ComponentListHandlerPublic {
  constructor(componentListHandler) {
    assertType(
      componentListHandler instanceof ComponentListHandler,
      'componentListHandler:constructor `ComponentListHandler` argument should be an instance of ComponentListHandler'
    )
    this[__componentListHandler] = componentListHandler
  }

  /**
   * @param {Function} onCreateItem
   * @return {ComponentListHandlerPublic}
   */
  onCreateItem(onCreateItem){
    isFunction(onCreateItem)
    this[__componentListHandler].onCreateItem(onCreateItem)
    return this
  }

  /**
   * @param {Function} onDeleteItem
   * @return {ComponentListHandlerPublic}
   */
  onDeleteItem(onDeleteItem){
    isFunction(onDeleteItem)
    this[__componentListHandler].onDeleteItem(onDeleteItem)
    return this
  }

  remove() {
    this[__componentListHandler].remove()
  }

  /**
   * 
   * @param {string} id
   * @returns {Element}
   */
  nodeByID(id) {
    console.log(id)
    return this[__componentListHandler].nodeByID(id)
  }
}
