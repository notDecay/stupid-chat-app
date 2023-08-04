import { render } from "../utils/utils.js"
import chatItem from "./chat/chatItem.js"
import chatPage from "./chat/chatPage.js"
/**
 * @type {FunctionalComponent<{}, void>} 
 */
export default function() {
  const channelList = createMenuSection({
    name: 'you { display: flex }',
    id: 'channel-list',
    listOfStuff: [
      // createMenuItem({ itemIcon: '', itemName: 'general' }),
      // createMenuItem({ itemIcon: '', itemName: 'some hangout' }),
      // createMenuItem({ itemIcon: '', itemName: 'another chat' }),
      chatItem({ name: 'general' })
    ]
  })

  render('<div>', /*html*/`
    <link rel="stylesheet" href="./res/style/home.css">
    <aside class="app-sidebar">
      ${channelList}
      ${settingWarpper()}
    </aside>
    <main class="app-main"></main>
  `, {
    class: 'app-container screen'
  }).to('.app-mount')

  chatPage().create()
} 

/**
 * @typedef {{
 *   name: string
 *   id: string
 *   listOfStuff: ComponentCreatable[]
 * }} MenuSectionProps
 * @type {FunctionalComponent<MenuSectionProps, string>}
 */
function createMenuSection({ name, listOfStuff, id }) {
  return menuSectionBuilder({ name, id, item: listOfStuff }).create(
    (item) => item.map(it => it.create())
  )
}

/**
 * @template {Function} TItemComponent
 * @typedef {{
 *   name: string
 *   id: string
 *   item: ComponentCreatable<TItemComponent>[]
 * }} SectionBuilderProps
 */

/**
 * @template {Function} T
 * @typedef {(menuItemMappingFn: (item: ComponentCreatable<T>[]) => void) => string} MappingFn
 */

/**
 * @template {Function} TItemComponent
 * @type {FunctionalComponent<SectionBuilderProps<TItemComponent>, ComponentCreatable<MappingFn<TItemComponent>>>} 
 */
function menuSectionBuilder({ name, id, item }) {
  return {
    create(menuItemMappingFn) {
      return /*html*/`
        <section class="section-menu">
          <div class="menu-section-title">
            <div class="icon icon-arrow"></div>
            <h3>${name}</h3>
          </div>
          <ul id=${id}>
            ${menuItemMappingFn(item)}
          </ul>
        </section>
      `
    }
  }
}

/**@type {FunctionalComponent<{ itemIcon: string, itemName: string }, string>} */
function createMenuItem({ itemIcon, itemName }) {
  return /*html*/`
    <li class="menu-item">
      <div class="icon"></div>
      <div class="menu-item-name">${itemName}</div>
    </li>
  `
}

/**@type {FunctionalComponent<null, string>} */
function settingWarpper() {
  return /*html*/`
    <div class="setting-warpper">
      <div class="icon user-avatar"></div>
      <div class="user-name-warpper">
        <div class="user-name">Duck >-<</div>
        <div class="user-status">something</div>
      </div>
      <div class="setting">
        <div class="icon icon-gear"></div>
      </div>
    </div>
  `
}