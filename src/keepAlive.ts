import moment from 'moment-timezone'
import axios from 'axios'
const oneMinute = 1000 * 60
const isOffPeak = (date = moment()) =>
  date.tz('Europe/London').hour() < 12 || date.tz('Europe/London').hour() > 21

export function keepAlive() {
  return setInterval(() => {
    if (isOffPeak()) return
    console.log('KEEP_ALIVE')
    for (let i = 0; i < 10; i++) {
      axios.get(`https://deep-email-validator.herokuapp.com/?email=a`)
    }
  }, oneMinute * 2)
}
