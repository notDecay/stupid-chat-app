import logdown from "../utils/logdown.js"
import { render } from "../utils/utils.js"
import createAltForm from "./login/createAltForm.js"
import loginForm from "./login/loginForm.js"
/**
 * @type {FunctionalComponent<{}, void>} 
 */
export default function() {
  render('<div>', /*html*/`
    <link rel="stylesheet" href="./res/style/login.css">
    <div class="login-warpper">
      <div class="login-form">
        ${loginForm()}
      </div>
    </div>
  `, {
    class: 'login screen'
  }).to('.app-mount')
  
  function thisThing() {
    logdown.start('adding the event listener')
    const $loginForm = u('.login .login-form')
    const $redirectLink = u('.login .login-button-warpper a')
    $redirectLink.on('click', () => {
      redirect($redirectLink, $loginForm)
      logdown.info('event listener dropped')
      thisThing()
    })
    logdown.success('adding event listener okey :)')
  }

  thisThing()
}

function redirect($redirectLink, $loginForm) {
  const whereINeedToGo = $redirectLink.nodes[0].className
  const goto = (dest) => whereINeedToGo.includes(dest)
  if (goto('goto-create-alt')) {
    $loginForm.html(createAltForm())
  }
  if (goto('goto-login')) {
    $loginForm.html(loginForm())
  }
}