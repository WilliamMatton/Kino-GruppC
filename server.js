const http = require('http')
const fs = require('fs')
const path = require('path')

const port = Number(process.env.PORT) || 5080

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
