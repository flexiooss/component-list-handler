import { ActionDispatcherBuilder } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class ActionDeleteItem {
  /**
   * @private
   * @param {ActionDispatcher<DeleteItem, DeleteItemBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionDeleteItem}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDeleteItems:create: `dispatcher` should be a Dispatcher'
    )

    return new ActionDeleteItem(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.component_list_handler.actions.DeleteItem)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionDispatcher<DeleteItem, DeleteItemBuilder>}
   */
  action() {
    return this.__action
  }
}
