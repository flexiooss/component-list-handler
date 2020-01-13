import {TestCase} from 'code-altimeter-js'
import {ComponentListHandlerBuilder} from '../js/component-list-handler/component/ComponentListHandlerBuilder'
import {ApplicationBuilder} from '@flexio-oss/hotballoon/src/js/Application/ApplicationBuilder'
import {Dispatcher} from '@flexio-oss/hotballoon'
import {FakeLogger} from '@flexio-oss/js-logger'

const assert = require('assert')

export class Component extends TestCase {
  setUp() {
    const logger = new FakeLogger()

    this.application = new ApplicationBuilder()
      .logger(logger)
      .dispatcher(new Dispatcher(logger))
      .id('AppTest')
      .build()

    this.__componentContext = this.application.addComponentContext()

    this.__componentBuilder = new ComponentListHandlerBuilder()
      .componentContext(this.__componentContext)
  }

  testRange() {
    let component = this.__componentBuilder.itemByPage(10).build()
    let range = component.getRange()
    assert.strictEqual(range, '0-9')

    component.actionChangePage().dispatch(
      component.actionChangePage().payloadBuilder().page(1).build()
    )
    range = component.getRange()
    assert.strictEqual(range, '10-19')

    component = this.__componentBuilder.itemByPage(5).build()
    range = component.getRange()
    assert.strictEqual(range, '0-4')

    component.actionChangePage().dispatch(
      component.actionChangePage().payloadBuilder().page(1).build()
    )
    range = component.getRange()
    assert.strictEqual(range, '5-9')
  }

  testPageIndex() {
    let component = this.__componentBuilder.itemByPage(5).build()
    let range = component.getRange()
    assert.strictEqual(range, '0-4')

    component = this.__componentBuilder.itemByPage(5).pageIndex(0).build()
    range = component.getRange()
    assert.strictEqual(range, '0-4')

    component = this.__componentBuilder.itemByPage(5).pageIndex(1).build()
    range = component.getRange()
    assert.strictEqual(range, '5-9')
  }

  testRangeItemByPage() {
    let component = this.__componentBuilder.itemByPage(10).build()
    let range = component.getRange()
    assert.strictEqual(range, '0-9')

    component.setItemByPage(5)
    range = component.getRange()
    assert.strictEqual(range, '0-4')

    component.setItemByPage(20)
    range = component.getRange()
    assert.strictEqual(range, '0-19')
  }

  testStorePage() {
    let component = this.__componentBuilder.build()
    let validated = false
    component.storePageSelected().listenChanged((event) => {
      assert.strictEqual(event.data().pageIndex(), 42)
      validated = true
    })
    component.actionChangePage().dispatch(
      component.actionChangePage().payloadBuilder().page(42).build()
    )

    assert.ok(validated)
  }

  testStoreTotal() {
    let component = this.__componentBuilder.build()
    let validated = false
    component.storePagination().listenChanged((event) => {
      assert.strictEqual(event.data().totalElements(), 20)
      validated = true
    })
    component.setTotal(20)
    assert.ok(validated)

    component = this.__componentBuilder.total(100).build()
    assert.strictEqual(component.storePagination().state().data().totalElements(), 100)
  }

  testOffset() {
    let component = this.__componentBuilder.firstOffset(2).itemByPage(10).build()
    const range = component.getRange()
    assert.strictEqual(range, '2-11')
  }
}

runTest(Component)
