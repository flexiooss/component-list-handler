import { ActionDispatcherBuilder } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class ActionDeleteItems {
  /**
   * @private
   * @param {ActionDispatcher<DeleteItems, DeleteItemsBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionDeleteItems}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDeleteItems:create: `dispatcher` should be a Dispatcher'
    )

    return new ActionDeleteItems(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.component_list_handler.actions.DeleteItems)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionDispatcher<DeleteItems, DeleteItemsBuilder>}
   */
  action() {
    return this.__action
  }
}
