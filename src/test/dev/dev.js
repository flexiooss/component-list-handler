import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/index-view'
import {ComponentListHandlerBuilder} from '../../js/component-list-handler/component/ComponentListHandlerBuilder'
import {InMemoryStoreBuilder, ProxyStoreBuilder} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StringArray} from '@flexio-oss/flex-types'


const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)
const componentContext = applicationDev.application().addComponentContext()

let data = new StringArray('param1', 'param2', 'param3', 'param4')
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
  .mapper((data) => { return new globalFlexioImport.io.flexio.component_list_handler.stores.ItemCollectionBuilder().elements(data.elements()).build() })
  .build()

let component = new ComponentListHandlerBuilder()
  .componentContext(componentContext)
  .parentNode(document.body)
  .proxyStoreItems(proxyStore)
  .idPrefix('prefix')
  .onCreateItem((item) => console.log(item + ' created'))
  .onDeleteItem((item) => console.log(item + ' deleted'))
  .build()


// Remove one
store.set(
  store.dataBuilder().elements(new StringArray('param1', 'param2', 'param3')).build()
)

// add one
store.set(
  store.dataBuilder().elements(new StringArray('param1', 'param2', 'param3', 'param6')).build()
)


