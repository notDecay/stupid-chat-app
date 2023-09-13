import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import appConfig from '../app.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const PORT = process.env.PORT || 5000
export const server = app.listen(PORT, () => {
  console.log('server is online :)')
  console.log(`currently listening on port ${PORT}`)
})

app.use('/assets', express.static('./dist/assets'))

const anyAppRoute = Object.values(appConfig.appRoutes).map(it => it.replace(/\*([^(\/|\n)]*)/gm, '*'))
app.get(anyAppRoute, async (request, response) => {
	console.log('path is:', request.path);
	response.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.get(appConfig.apiEndpoints.API, (request, response) => {
	response.send('this is me :)')
})

app.post("/api/v1/users", (req, res) => {
  console.log(req.body.message)
  const username = req.body.email
  const password = req.body.password

  // Create a new user.
  const user = {
    username: username,
    password: password,
  };

  // Save the user in the database.
  // ...

  // Send a response back to the client.
  res.json(user)
})

app.get(appConfig.apiEndpoints.HELLO, (request, response) => {
  response.status(200).json({
    message: 'it\'s me, duck from the other side :)'
  })
})

export { appConfig }

import("./test_only/commandLineStuff.js")
import("./socketRelated.js")