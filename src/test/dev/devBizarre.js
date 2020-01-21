import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/index-view'
import {ComponentListHandlerBuilder} from '../../js/component-list-handler/component/ComponentListHandlerBuilder'
import {InMemoryStoreBuilder, ProxyStoreBuilder} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StringArray} from '@flexio-oss/flex-types'
import {ViewListHandlerMounter} from '../../js/component-list-handler/views/ViewListHandlerMounter/ViewListHandlerMounter'

const viewLogOptions = {
  color: '#e2183e',
  titleSize: 4
}

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)
const componentContext = applicationDev.application().addComponentContext()

let data = new StringArray('5', '3', '1')
let store = componentContext.addStore(
  new InMemoryStoreBuilder()
    .type(globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollection)
    .initialData(new globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollectionBuilder()
      .elements(data)
      .build())
    .build()
)

let proxyStore = new ProxyStoreBuilder()
  .type(globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollection)
  .store(store)
  .mapper((data) => {
    return new globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollectionBuilder().elements(data.elements()).build()
  })
  .build()

let component = new ComponentListHandlerBuilder()
  .application(applicationDev.application())
  .parentNode(applicationDev.layersComponent().addLayer().getElement())
  .proxyStoreItems(proxyStore)
  .idPrefix('prefix')
  .viewListHandlerMounter(new ViewListHandlerMounter())
  .build()

component.onCreateItem((e) => {
  e.elements().forEach((el) => {
    console.log('onCreateItem : ' + el)

    component.nodeByID(el).innerHTML = `<p>${el}</p>`
  })
})
component.onDeleteItem((e) => {

  e.elements().forEach((el) => {
    console.log('onDeleteItem : ' + el)
    component.nodeByID(el).innerHTML = 'del'
  })
})

data.forEach((da) => {
  component.nodeByID(da).innerHTML = `<p>${da}</p>`
})
console.log('________________________________')
console.log('\'5\', \'3\', \'1\'')
console.log('________________________________')

debugger
store.set(
  store.dataBuilder().elements(new StringArray('3')).build()
)
console.log('________________________________')
console.log('3')
console.log('________________________________')
debugger

store.set(
  store.dataBuilder().elements(new StringArray('5', '3', '1')).build()
)
console.log('________________________________')
console.log('\'5\', \'3\', \'1\'')
console.log('________________________________')
debugger

store.set(
  store.dataBuilder().elements(new StringArray('3', '13')).build()
)

console.log('________________________________')
console.log('\'3\', \'13\'')
console.log('________________________________')
debugger

store.set(
  store.dataBuilder().elements(new StringArray('12', '11', '10', '9', '8', '7', '6', '5', '3', '1')).build()
)
console.log('________________________________')
console.log('\'12\', \'11\', \'10\', \'9\', \'8\', \'7\', \'6\', \'5\', \'3\', \'1\'')
console.log('________________________________')
