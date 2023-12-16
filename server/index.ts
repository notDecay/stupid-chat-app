import express from "express"

const server = express()
const PORT = 3000
export { server }

server.listen(PORT, () => {
  console.log("server is listened at port", PORT, ":)")
})

import "./api"