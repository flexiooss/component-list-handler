import {ComponentListHandler} from './ComponentListHandler'
import {assertType} from '@flexio-oss/assert'

const __componentListHandler = Symbol('__list-handler')

export class ComponentListHandlerPublic {
  constructor(componentListHandler) {
    assertType(
      componentListHandler instanceof ComponentListHandler,
      'componentListHandler:constructor `ComponentListHandler` argument should be an instance of ComponentListHandler'
    )
    this[__componentListHandler] = componentListHandler
  }
}
