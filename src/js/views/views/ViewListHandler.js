import {e, View, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import {isNull} from '@flexio-oss/assert'


export class ViewListHandler extends View {
  /**
   * @param {ViewContainer} viewContainer
   * @param {PublicStoreHandler<ItemCollection>} storeItemCollection
   * @param {String} idPrefix
   */
  constructor(viewContainer, storeItemCollection, idPrefix) {
    super(viewContainer)
    this.setSynchronous()
    this.__storeItemCollection = storeItemCollection
    this.__idPrefix = idPrefix
    this.subscribeToStore(this.__storeItemCollection)
  }

  template() {
    console.log(this.__storeItemCollection.data())
    return this.html(
      e('div#list-' + this.__idPrefix)
        .reconciliationRules(RECONCILIATION_RULES.ONLY_CHILDREN)
        .childNodes(
          ...this.__nodeList()
        )
    )
  }

  __nodeList() {
    let list = []
    if (!isNull(this.__storeItemCollection.data().elements())) {
      this.__storeItemCollection.data().elements().forEach(
        (element) => {
          list.push(
            this.html(
              e(`div#${this.__idPrefix}-${element}`)
                .reconciliationRules(RECONCILIATION_RULES.BYPASS_CHILDREN)
            )
          )
        }
      )
    }
    return list
  }

  /**
   *
   * @param {string} id
   * @returns {Element}
   */
  nodeByID(id) {
    return this.nodeRef(`${this.__idPrefix}-${id}`)
  }
}
