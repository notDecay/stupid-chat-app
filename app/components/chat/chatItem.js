/**
 * @type {FunctionalComponent<{
 *   name: string
 * }, ComponentCreatable<() => string>>}
 * @returns 
 */
export default function(props) {
  const item = /*html*/`
    <li class="menu-item">
      <div class="icon"></div>
      <div class="menu-item-name">${props.name}</div>
      <div class="notification-count">
        <span>1</span>
      </div>
    </li>
  `
  return {
    create() {
      // render('<li>', item, { class: 'menu-item' }).to(mount)
      return item
    }
  }
}