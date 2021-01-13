require('dotenv').config()
let express = require('express')
let morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
let { NODE_ENV } = require('./config')
const winston = require('winston');
const eventsRouter = require("./Events/events-router");
const authRouter = require("./Auth/auth-router");
const teamsRouter = require("./Teams/teams-router");
const usersRouter = require("./Users/users-router");
const teamMembersRouter = require("./TeamMembers/team-members-router");
const emailsRouter = require("./Emails/email-router");





const app = express()

app.use(express.json())

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';


app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
// app.use(basicAuth)
app.use("/api/events", eventsRouter);
app.use("/api/auth", authRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/users", usersRouter);
app.use("/api/team-members", teamMembersRouter);
app.use("/api/emails", emailsRouter);



app.get('/api', (req, res) => {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === "production") {
        response = { error: { message: "server error" } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});



module.exports = app