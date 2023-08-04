/**
 * @type {FunctionalComponent<{}, string>} 
 */
export default function() {
  return /*html*/`
    <h1>Sign in to continue :></h1>
    <form>
      <section class="login-section email-section">
        <label for="email">Email</label>
        <input type="email" class="no-outline no-bg" placeholder="Your email, eg: something@gmail.com" autocomplete="on" required>
      </section>
      <section class="login-section password-section">
        <label for="email">Password</label>
        <input type="password" class="no-outline no-bg" placeholder="Type your super secret password into here" required>
        <a href="#" class="hint white-text">Ughh I forgot my password...</a>
      </section>
      <div class="login-button-warpper">
        <div hover-text="Then go create a new one :)">
          <a href="#" class="white-text goto-create-alt">Don't have a account?</a>
        </div>
        <button class="no-outline no-bg">Go absolutely crazy</button>
      </div>
    </form>
  `
}

'anonymous'