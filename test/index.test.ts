import Axios from 'axios'
import _ from 'lodash'
import server from '../src/index'
const axios = Axios.create({
  baseURL: 'http://localhost:8080',
})

describe('name', () => {
  afterAll(() => {
    server.close()
  })
  it('test endpoint', async () => {
    const res = await axios('/email/validate?email=davidadler@gmail.com')
    expect(res.data.valid).toBe(true)
    expect(res.data).toMatchSnapshot()
  })

  it('test endpoint POST', async () => {
    const res = await axios.post('/email/validate', {
      email: 'davidadler@gmail.com',
    })
    expect(res.data.valid).toBe(true)
    expect(res.data).toMatchSnapshot()
  })
})
