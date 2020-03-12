import { ActionDispatcherBuilder } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {TypeCheck} from '@flexio-oss/hotballoon/src/js/Types/TypeCheck'
import {assertType} from '@flexio-oss/assert'

export class ActionCreateItems {
  /**
   * @private
   * @param {ActionDispatcher<CreateItems, CreateItemsBuilder>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionCreateItems}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionDeleteItems:create: `dispatcher` should be a Dispatcher'
    )

    return new ActionCreateItems(
      new ActionDispatcherBuilder()
        .type(globalFlexioImport.io.flexio.component_list_handler.actions.CreateItems)
        .dispatcher(dispatcher)
        .build()
    )
  }

  /**
   *
   * @returns {ActionDispatcher<CreateItems, CreateItemsBuilder>}
   */
  action() {
    return this.__action
  }
}
