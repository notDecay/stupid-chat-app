import process from "process"
import readline from 'readline'
// import ChildProcess from 'child_process'
const stdin = process.openStdin()

stdin.resume()
console.log('press "q" to kill the server\n\n');

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true);

process.stdin.on("keypress", (charater, key) => {
  switch(key.sequence) {
    case 'q':
      console.log('Attempting to kill duck')
      process.exit(0)
    break
  }
})