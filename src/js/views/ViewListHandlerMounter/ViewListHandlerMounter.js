import {ViewListHandlerMounterConfig} from './ViewListHandlerMounterConfig'
import {assertType} from '@flexio-oss/assert'
import {ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewContainerListHandler} from '../ViewContainerListHandler'

export class ViewListHandlerMounter {
  constructor() {
    /**
     *
     * @type {?ViewContainerListHandler}
     * @private
     */
    this.__viewContainer = null
  }

  /**
   *
   * @param {ViewListHandlerMounterConfig} viewMounterConfig
   * @return {ViewListHandlerMounter}
   */
  buildView(viewMounterConfig) {
    assertType(
      viewMounterConfig instanceof ViewListHandlerMounterConfig,
      'ViewLogsMounter:buildView: `viewMounterConfig` argument should be a ViewLogContentMounterConfig'
    )
    this.__viewContainer = new ViewContainerListHandler(
      new ViewContainerParameters(
        viewMounterConfig.getComponentContext(),
        viewMounterConfig.getComponentContext().nextID(),
        viewMounterConfig.getParentNode()
      ),
      viewMounterConfig.getStoreItemCollection(),
      viewMounterConfig.getIDPrefix(),
  )

    assertType(
      this.__viewContainer instanceof ViewContainerListHandler,
      '`viewContainer` should be ViewContainerPipelines'
    )

    this.__viewContainer.renderAndMount()

    return this
  }

  /**
   * @return {?ViewContainerListHandler}
   */
  viewContainer() {
    return this.__viewContainer
  }
}

/**
 *
 * @param instance
 * @return {boolean}
 */
export const isViewListHandlerMounter = (instance) => instance instanceof ViewListHandlerMounter

