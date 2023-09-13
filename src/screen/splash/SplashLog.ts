export namespace SplashLog {
  const theLogLocation = () => document.querySelector<HTMLDivElement>('.log-ui .logs')!
  export function log(...stuff: any[]) {
    theLogLocation().innerHTML = stuff.join()
  }
  export function warn(...stuff: any[]) {
    theLogLocation().innerHTML += '<br>' + tag('Warning', '#ffcb5c') + stuff.join()
  }
  export function err(...stuff: any[]) {
    theLogLocation().innerHTML += '<br>' + tag('Error', '#ff6f5c') + stuff.join()
  }
  export function success() {
    theLogLocation().innerText = 'Success, Here I am! ^-^'
    theLogLocation().style.animation = 'splash-fade-out 0.5s ease 1s both'
  }

  function tag(name: string, color: string) {
    return `
      <span style="background: ${color}59; color: ${color}; padding: 5px 8px; border-radius: 5px;">${name}</span>
    `
  }
}