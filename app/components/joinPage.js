import { render } from "../utils/utils.js"

/**
 * @type {FunctionalComponent<{}, ComponentCreatable>} 
 */
export default function() {
  const noUsernamePlaceholder = "nothing in here :)"
  render('<div>', /*html*/`
    <link rel="stylesheet" href="./res/style/join-page.css">
    <div class="create-user-warpper">
      <h1>hey there! let's set thing up :)</h1>
      <div>
        <div class="user-avatar-warpper">
          <div class="user-avatar-color-bg"></div>
          <div class="user-avatar showcase icon">
            <div class="icon icon-add">
            </div>
            <span>change avatar</span>
          </div>
        </div>
        <section class="user-name-edit-area">
          <div>
            <label for="user-name">Username</label>
            <input type="text" class="no-outline no-bg" value="${noUsernamePlaceholder}" disabled>
          </div>
          <button class="no-outline no-bg edit-username">Edit</button>
        </section>
      </div>
      <div class="join-button-warpper">
        <button class="no-outline no-bg">Go absolutely crazy</button>
      </div>
    </div>
  `, {
    class: 'join-page screen'
  }).to('.app-mount')
  return {
    create(homePage) {
      const $joinPage = u('.join-page')
      const $editUsernameButton = u('.create-user-warpper .edit-username')
      const $username = u('.create-user-warpper input')
      const $joinButton = u('.create-user-warpper .join-button-warpper button')
      const $_ = u('.create-user-warpper span')

      const cleanUp = () => {
        $username.placeholder = ''
        $username.text(noUsernamePlaceholder)
        $username.disabled = true
        $username.blur()
      }

      let isSelected = false
      $editUsernameButton.on('click', () => {
        isSelected = !isSelected
        if (isSelected) {
          $username.placeholder = 'What should I call you?'
          $username.text('')
          $username.disabled = false
          $username.focus()
          // $editUsernameButton.select()
          return
        }
        cleanUp()
      })

      $username.on('keyup', (keyboardEvent) => {
        if (keyboardEvent.key !== 'Escape') return
        cleanUp()
      })

      $joinButton.on('click', () => {
        $joinButton.disabled = true
        homePage()
        setTimeout(() => $joinPage.addClass('has-been-joined'), 1000)
        setTimeout(() => $joinPage.remove(), 1500)
      })
    },
  }
}