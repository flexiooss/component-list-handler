'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewListHandler} from './views/ViewListHandler'

/**
 * @extends ViewContainer
 */
export class ViewContainerListHandler extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {PublicStoreHandler<ItemCollection>} storeItemCollection
   * @param {String} idPrefix
   */
  constructor(viewContainerParameters, storeItemCollection, idPrefix) {
    super(viewContainerParameters)
    this.__storeItemCollection = storeItemCollection
    this.__idPrefix = idPrefix
    this.__view = this.addView(new ViewListHandler(this, this.__storeItemCollection, this.__idPrefix))
  }
}
