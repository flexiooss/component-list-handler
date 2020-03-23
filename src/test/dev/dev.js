import {ApplicationWithStyleAndLayers} from '@flexio-oss/hotballoon-test-dummies/index-view'
import {ComponentListHandlerBuilder} from '../../js/component/ComponentListHandlerBuilder'
import {InMemoryStoreBuilder, ProxyStoreBuilder} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StringArray} from '@flexio-oss/flex-types'
import {ViewListHandlerMounter} from '../../js/views/ViewListHandlerMounter/ViewListHandlerMounter'

const viewLogOptions = {
  color: '#e2183e',
  titleSize: 4
}

const applicationDev = ApplicationWithStyleAndLayers.withConsoleLogger(document.body)
const componentContext = applicationDev.application().addComponentContext()

let data = new StringArray('param1')
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
  .application(applicationDev.application())
  .parentNode(applicationDev.layersComponent().addLayer().getElement())
  .storeItems(proxyStore)
  .idPrefix('prefix')
  .viewListHandlerMounter(new ViewListHandlerMounter())
  .build()

component.onCreateItem((e) => {e.elements().forEach((el) => {component.nodeByID(el).innerHTML = el})})
component.onDeleteItem((e) => {e.elements().forEach((el) => component.nodeByID(el).innerHTML = '')})
component.apply()
componentContext.logger().log(
  componentContext.logger().builder()
    .info().pushLog('must have {\'param1\'}'),
  viewLogOptions
)
debugger

store.set(
  store.dataBuilder().elements(new StringArray( 'param2')).build()
)

componentContext.logger().log(
  componentContext.logger().builder()
    .info().pushLog('must have {\'param2\'}'),
  viewLogOptions
)
debugger

store.set(
  store.dataBuilder().elements(new StringArray( 'param2', 'param3', 'param4', 'param5')).build()
)

componentContext.logger().log(
  componentContext.logger().builder()
    .info()    .pushLog('must have {\'param2\', \'param3\', \'param4\', \'param5\'}'),
  viewLogOptions
)
debugger

store.set(
  store.dataBuilder().elements(new StringArray( 'param2', 'param3', 'param4', 'param5')).build()
)

componentContext.logger().log(
  componentContext.logger().builder()
    .info().pushLog('must have {\'param2\', \'param3\', \'param4\', \'param5\'}'),
  viewLogOptions
)
debugger

store.set(
  store.dataBuilder().elements(new StringArray( 'param5', 'param2', 'param3', 'param4')).build()
)

componentContext.logger().log(
  componentContext.logger().builder()
    .info().pushLog('must have {\'param5\', \'param2\', \'param3\', \'param4\'}'),
  viewLogOptions
)
debugger

store.set(
  store.dataBuilder().elements(new StringArray( 'param4')).build()
)

componentContext.logger().log(
  componentContext.logger().builder()
    .info().pushLog('must have {\'param4\'}'),
  viewLogOptions
)

debugger

component.remove()


