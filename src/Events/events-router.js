const express = require('express')
const xss = require('xss')
const logger = require('../logger')
const EventsService = require('./events-service')

const eventsRouter = express.Router()
const bodyParser = express.json()

const events = [
    {
        id: 1,
        description:
            "Cater wedding. Need two bartenders to set up and run bar station; 10 servers to set up tables and accommodate guests as needed",
        location: "123 S. Boulevard",
        date: "2020-12-03",
        user_id: 1,
        time_start: "5:00 PM",
        time_end: "9:00 PM",
        title: "Johnson Family Wedding",
        team_id: "1"
    }
]

const serializeEvent = (event) => {
    return {
        id: event.id,
        description: xss(event.description),
        location: event.location,
        date: event.date,
        team_id: event.team_id,
        time_start: event.time_start,
        time_end: event.time_end,
        title: xss(event.title),

    };
};

eventsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        console.log(req.query);
        EventsService.getAllEvents(knexInstance).then((events) => {
            res.json(events);
        })
            .catch(next);
    })
    .post(bodyParser, (req, res, next) => {
        const {
            time_start,
            time_end,
            location,
            description,
            date,
            title,
            team_id,
        } = req.body;
        const newEvent = {
            time_start,
            time_end,
            location,
            description,
            date,
            title,
            team_id,
        };
        for (const [key, value] of Object.entries(newEvent))
            if (value == null) {
                return res.status(400).json({
                    error: {
                        message: `Missing '${key}' in request body`
                    },

                })
            }
        EventsService.insertEvent(req.app.get("db"), newEvent)
            .then((event) => {
                res.json(event);
            })
            .catch(next);
    });
eventsRouter
    .route("/:id")
    .all((req, res, next) => {
        EventsService.getById(req.app.get("db"), req.params.id)
            .then((event) => {
                if (!event) {
                    return res.status(404).json({
                        error: { message: `Event doesn't exist` },
                    });
                }
                res.event = event;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(res.event);
    })
    .delete((req, res, next) => {
        EventsService.deleteEvent(req.app.get("db"), req.params.id)
            .then((numRowsAffected) => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch((req, res, next) => {
        const {
            id,
            title,
            description,
            location,
            date,
            time_start,
            time_end,
            team_id,
        } = req.body;
        const eventToUpdate = {
            id,
            title,
            description,
            location,
            date,
            time_start,
            time_end,
            team_id,
        };

        const numberOfValues = Object.values(eventToUpdate).filter(Boolean).length;
        if (numberOfValues === 0) {
            logger.error(`Invalid update without required fields`);
            return res.status(400).json({
                error: {
                    message: `Request body must contain team_id and either 'description', 'title', location, date, time_start or time_end`,
                },
            });
        }

        EventsService.updateEvent(req.app.get("db"), req.params.id, eventToUpdate)
            .then((numRowsAffected) => {
                res.status(204).end();
            })
            .catch(next);
    });

module.exports = eventsRouter;
