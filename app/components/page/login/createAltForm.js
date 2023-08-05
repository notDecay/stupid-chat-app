/**
 * @type {FunctionalComponent<{}, string>} 
 */
export default function () {
  return /*html*/`
    <h1>Create your account</h1>
    <form>
      <section class="login-section">
        <label for="email">Email</label>
        <input type="email" class="no-outline no-bg" placeholder="Your email, eg: something@gmail.com" autocomplete="on" required>
      </section>
      <section class="login-section">
        <label for="email">Password</label>
        <input type="password" class="no-outline no-bg" placeholder="Your super secret password" required>
      </section>
      <section class="login-section">
        <label for="email">Confirm your password</label>
        <input type="password" class="no-outline no-bg" placeholder="Just type your password again" required>
      </section>
      <div class="login-button-warpper">
        <div hover-text="Let me out of hereeee!">
          <a href="#" class="white-text goto-login">Go backkk!</a>
        </div>
        <button class="no-outline no-bg">Go absolutely crazy</button>
      </div>
    </form>
  `
}