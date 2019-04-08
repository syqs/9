const express = require('express')
const server = require('./server')
const path = require('path')
const bodyParser = require('body-parser')
const { sync } = require('./db')
const Task = require('data.task');

const app = express()

app.set( 'port', 4444 )
app.use( bodyParser.json() )

const root = sync.chain(() => {
  return new Task((res, rej) => {
    server(app)
    app.listen(4444, ()=>console.log('load ed, port: 4444'))
  })
})

root.fork(console.log, console.log)
