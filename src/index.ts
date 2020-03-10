import validate from 'deep-email-validator'
import http from 'http'
import express, { Response } from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const validateEndpoint = async (options: any, res: Response<unknown>) => {
  const { email } = options
  if (!email)
    return res.status(400).send({ error: { name: 'Email not provided' } })

  // Coerce query params
  for (const key in options) {
    if (key !== 'email') {
      options[key] =
        options[key] !== false &&
        options[key] !== 'false' &&
        options[key] !== '0'
    }
  }

  const result = await validate(options)
  res.send(result)
}

app.get('/', async (req, res) => {
  return validateEndpoint(req.query, res)
})

app.get('/email/validate', async (req, res) => {
  return validateEndpoint(req.query, res)
})

app.post('/email/validate', async (req, res) => {
  return validateEndpoint(req.body, res)
})

if (app.get('env') === 'development') {
  app.use(errorHandler())
}

const server = http.createServer(app)
server.listen(app.get('port'), function() {
  console.log('Express server listening at http://localhost:' + app.get('port'))
})

// Keep the endpoint alive
const keepAlive = async () => {
  try {
    await axios.get('https://deep-email-validator.herokuapp.com/')
    console.log('Keep Alive')
  } catch (e) {
    console.log('Error pinging endpoint')
  }
  setTimeout(keepAlive, 1000 * 60 * 3)
}
keepAlive()

export default server
