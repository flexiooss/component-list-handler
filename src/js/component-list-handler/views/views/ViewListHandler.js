import {e, View, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'


export class ViewListHandler extends View {
  /**
   * @param {ViewContainer} viewContainer
   * @param {PublicStoreHandler<ItemCollection>} storeItemCollection
   * @param {String} idPrefix
   */
  constructor(viewContainer, storeItemCollection, idPrefix) {
    super(viewContainer)
    this.__storeItemCollection = storeItemCollection
    this.__idPrefix = idPrefix
    this.subscribeToStore(this.__storeItemCollection)
  }

  template() {
    return this.html(
      e('div#list-' + this.__idPrefix)
        .childNodes(
          ...this.__nodeList()
        )
    )
  }

  __nodeList() {
    let list = []
    this.__storeItemCollection.data().elements().forEach(
      (element) => {
        list.push(
          this.html(
            e(`div#${this.__idPrefix}-${element}`)
              .reconciliationRules(RECONCILIATION_RULES.BYPASS)
          )
        )
      }
    )
    return list
  }
}
