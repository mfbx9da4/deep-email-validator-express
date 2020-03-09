import validate from 'deep-email-validator'
import http from 'http'
import express, { Response } from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'

const app = express()

app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const validateEndpoint = async (options: any, res: Response<unknown>) => {
  const { email } = options
  if (!email)
    return res.status(400).send({ error: { name: 'Email not provided' } })
  const result = await validate(email)
  console.log('result', result)
  res.send(result)
}

app.post('/email/validate', async (req, res) => {
  return validateEndpoint(req.body, res)
})

app.get('/email/validate', async (req, res) => {
  return validateEndpoint(req.query, res)
})

if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const server = http.createServer(app)
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})

export default server
