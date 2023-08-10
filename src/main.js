import App from './App.svelte'
import logdown from './utils/logdown.js'
import { makeid } from './utils/utils.js'

logdown.start(`Starting this app... (v1.0.0 dev-build 5)
  .        ／＞　 フ
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

sessionStorage.setItem('user_id', `user-${makeid(10)}`)
const app = new App({
	target: document.querySelector('.app-mount'),
});

console.log('user id:', sessionStorage.getItem('user_id'))
logdown.info(`you\'re currently on "${currentPage}" page`)

logdown.success('app mounted')

export default app