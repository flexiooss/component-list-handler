# component-list-handler
component that generate a list of node
### Getting Started
- Build component :

```javascript
let component = new ComponentListHandlerBuilder()
  .application(application)
  .parentNode(parentNode)
  .storeItems(store)
  .idPrefix('prefix') // to personalize element in dom
  .viewListHandlerMounter(new ViewListHandlerMounter())
  .reconcile(true) // if false, the list is always refreshed, if true, the list is updated by modifying only what is necessary
  .build()
  ```


### declare callback to execute before remove an element :
```javascript
component.onCreateItem((e) => {
  e.elements().forEach((el) => {
    component.nodeByID(el).innerHTML = el
  })
})
  ```


callback parameter:
```yaml
CreateItems:
  elements:
    $list: string
```


### declare callback to execute after add an element :
```javascript
component.onDeleteItem((e) => {
  e.elements().forEach((el) => component.nodeByID(el).innerHTML = '')
})
  ```

When onCreateItem and onDeleteItem are set, use ```component.apply()``` to load the list of items you injected into the component beforehand.

callback parameter:
```yaml
DeleteItems:
  elements:
    $list: string
    
```
