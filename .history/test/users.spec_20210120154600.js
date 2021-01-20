const knex = require('knex')
const app = require('../src/app')
const { makeUsersArray } = require('./users.fixtures')

describe.only("Users Endpoints", function () {
    let db;
    before("make knex instance", () => {
      db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set("db", db);
    });
  
    after("disconnect from db", () => db.destroy());
  
    before("clean the tables", () => db.raw(`
      DROP TABLE IF EXISTS events, teams, team_members;
      DROP TABLE IF EXISTS users;
       CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        email TEXT,
        first_name TEXT,
        last_name Text, 
        password TEXT NOT NULL UNIQUE,
        date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
        profile_image TEXT,
        phone_number TEXT,
        user_type TEXT NOT NULL
        );
      `
      ));

    before("clean users table", () => db("users").truncate());
    afterEach("cleanup", () => db("users").truncate());
  
    describe(`GET/ users`, () => {
      context(`Given no users`, () => {
        it(`responds with 200 and an empty list`, () => {
          return supertest(app).get("/api/users").expect(200, []);
        });
      });
      context("Given there are users in the database", () => {
        const testUsers = makeUsersArray();
        beforeEach("insert users", () => {
          return db.into("users").insert(testUsers);
        });
        it("responds with 200 and all of the users", () => {
          return supertest(app).get("/api/users").expect(200, testUsers);
          // TODO: add more assertions about the body
        });
      });
    });
  
    describe(`GET /users/:id`, () => {
      context("Given there are users in the database", () => {
        const testUsers = makeUsersArray();
  
        beforeEach("insert users", () => {
          return db.into("users").insert(testUsers);
        });
        it("It responds with 200 and the specified user", () => {
          const userId = 1;
          const expectedUser = testUsers[userId - 1];
          return supertest(app)
            .get(`/api/users/${userId}`)
            .expect(200, expectedUser);
        });
      });
    });
  
//     describe(`POST /events`, () => {
//       it(`It creates a user, responding with 201 and the new user`, function () {
//         this.retries(3);
//         const newUser = {
//           fullname: "Dunder Mifflin",
//           username: "dunder",
//           password: "password",
//           employer: true,
//         };
//         return supertest(app)
//           .post("/api/users")
//           .send(newUser)
//           .expect(201)
//           .expect((res) => {
//             expect(res.body.fullname).to.eql(newUser.fullname);
//             expect(res.body.username).to.eql(newUser.username);
//             expect(res.body.password).to.eql(newUser.password);
//             expect(res.body.employer).to.eql(newUser.employer);
//             expect(res.body).to.have.property("id");
//             expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
//           })
//           .then((userRes) =>
//             supertest(app)
//               .get(`/api/users/${userRes.body.id}`)
//               .expect(userRes.body)
//           );
//       });
//       const requiredFields = [
//         "fullname",
//         "username",
//         "password",
//         "employer",
//       ];
//       requiredFields.forEach((field) => {
//         const newUser = {
//           fullname: "Dunder Mifflin",
//           username: "dunder",
//           password: "password",
//           employer: true,
//         };
//         it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//           delete newUser[field];
  
//           return supertest(app)
//             .post("/api/users")
//             .send(newUser)
//             .expect(400, {
//               error: { message: `Missing '${field}' in request body` },
//             })
//           })
//       });
//     });
  
//     describe(`DELETE /api/users/:user_id`, () => {
//       context(`Given no users`, () => {
//           it(`responds with 404`, () => {
//             const userId = 1234
//             return supertest(app)
//               .delete(`/api/users/${userId}`)
//               .expect(404, { error: { message: `User doesn't exist` } })
//           })
//         })
//       context('Given there are users in the database', () => {
//         const testUsers = makeUsersArray()
    
//         beforeEach('insert users', () => {
//           return db
//             .into('users')
//             .insert(testUsers)
//         })
    
//         it('responds with 204 and removes the user', () => {
//           const idToRemove = 2
//           const expectedUsers = testUsers.filter(user => user.id !== idToRemove)
//           return supertest(app)
//             .delete(`/api/users/${idToRemove}`)
//             .expect(204)
//             .then(res =>
//               supertest(app)
//                 .get(`/api/users`)
//                 .expect(expectedUsers)
//             )
//         })
//       })
//   })
  })