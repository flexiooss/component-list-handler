import { ActionDispatcherBuilder } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class ActionCreateItem {
  /**
   * @private
   * @param {ActionDispatcher<CreateItem, CreateItemBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionCreateItem}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDeleteItems:create: `dispatcher` should be a Dispatcher'
    )

    return new ActionCreateItem(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.component_list_handler.actions.CreateItem)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionDispatcher<CreateItem, CreateItemBuilder>}
   */
  action() {
    return this.__action
  }
}
