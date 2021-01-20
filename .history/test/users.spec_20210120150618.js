const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray } = require('./users.fixtures')

describe.only('Users Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('users').truncate())

  afterEach('cleanup',() => db('users').truncate())

  describe.only(`GET /api/users`, () => {
    context(`Given no users`, () => {
      it.only(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/users')
          .expect(200, [])
      })
    })

    context('Given there are articles in the database', () => {
      const testUsers = makeUsersArray()

      beforeEach('insert users', () => {
        return db
          .into('users')
          .insert(testUsers)
      })

      it('responds with 200 and all of the users', () => {
        return supertest(app)
          .get('/users')
          .expect(200, testUsers)
      })
    })
  })

//   describe(`GET /articles/:article_id`, () => {
//     context(`Given no articles`, () => {
//       it(`responds with 404`, () => {
//         const articleId = 123456
//         return supertest(app)
//           .get(`/articles/${articleId}`)
//           .expect(404, { error: { message: `Article doesn't exist` } })
//       })
//     })

//     context('Given there are articles in the database', () => {
//       const testArticles = makeArticlesArray()

//       beforeEach('insert articles', () => {
//         return db
//           .into('blogful_articles')
//           .insert(testArticles)
//       })

//       it('responds with 200 and the specified article', () => {
//         const articleId = 2
//         const expectedArticle = testArticles[articleId - 1]
//         return supertest(app)
//           .get(`/articles/${articleId}`)
//           .expect(200, expectedArticle)
//       })
//     })
//   })
})