process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'
require('dotenv').config()
let { expect } = require('chai')
let supertest = require('supertest')

global.expect = expect
global.supertest = supertest
