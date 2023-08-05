// export const socket = io('ws://localhost:3000')
import logdown from './utils/logdown.js'
import User from './api/user.js'

async function main() {
  logdown.start(`Starting this app... (v1.0.0 dev-build 3)
  .         ／＞　 フ
           | 　_　_| 
        ／\` ミ__^ノ 
       /　　　　 |
      /　 ヽ　　 ﾉ              ╱|、
     /　　 |　|　|            (˚ˎ 。7  
    ／￣|　　 |　|　|          |、˜〵          
    (￣ヽ＿_  ヽ_)__)         じしˍ,)ノ
    ＼二)
  `)
  logdown.info('hello from space.JS! v1.0')
  const currentPage = location.pathname.split('/').pop().replace('.html', '')
  // logdown.info('current page right now:', page)

  switch(currentPage) {
    case '':
    case 'index':
    case 'this_app':
      (await import('./components/home.js')).default()
      break;
    case 'login':
      (await import('./components/login.js')).default()
      break;
  }
  sessionStorage.setItem('user_id', User.generateUserId())
  console.log('user id:', sessionStorage.getItem('user_id'))
  logdown.info(`you\'re currently on "${currentPage}" page`);
}

window.onload = () => {
  try {
    main()
    logdown.success('App mounted')
  } catch (error) {
    logdown.fatal('App ran into an error', error)
  }
}

let style = null
document.addEventListener('keyup', (ev) => {
  if (ev.key !== '/') return
  if (style) {
    style.remove()
    return style = null
  }
  style = document.createElement('style')
  style.innerHTML = `*,*:before,*:after {outline:1px dashed red}`
  document.body.append(style)
})