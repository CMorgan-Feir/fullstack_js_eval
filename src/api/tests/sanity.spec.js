const fixtures = require('./fixtures')
const { execSync } = require('child_process')
const httpStatusCodes = require('../lib/httpStatusCodes')
const { client } = require('./setup/supertestServer')

before(async () => {
  // reset the database before every run
  execSync('/usr/bin/make postgres.reset')
})

describe('Sanity Check', () => {
  it('GET / should return a 200', async () => {
    await client
      .get('/')
      // assert the Content-Type header returns the correct value
      .expect('Content-Type', fixtures.contentTypes.json)
      // assert the http status code is 200
      .expect(httpStatusCodes.OK, fixtures.passingRootServerResponse)
  })

  it('GET /health should return a 200 indicating a healthy database connection', async () => {
    await client
      .get('/health')
      .expect('Content-Type', fixtures.contentTypes.json)
      .expect(httpStatusCodes.OK, fixtures.passingHealthCheckResponse)
  })
})
