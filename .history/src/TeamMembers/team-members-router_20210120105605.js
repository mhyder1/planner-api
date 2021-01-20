const express = require("express");
const knex = require("knex");
const TeamMembersService = require("./team-members-service");
const { requireAuth } = require("../middleware/jwt-auth");
const logger = require("../logger");

const teamMembersRouter = express.Router();

teamMembersRouter
    .route("/")
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        const creator_id = req.user_id;
        // Gets team_member and user's profile data
        // SELECT * FROM team_members WHERE team_id = 9 AND accepted = true AND event_id IS null;
        TeamMembersService.getTeamId(knexInstance, creator_id)
            .then((tid) => {
                const team_id = tid[0].id;
                TeamMembersService.getTeamMembersByTeamId(knexInstance, team_id)
                    .then((teamMembers) => {
                        const users = teamMembers.map((t) => t.user_id);
                        TeamMembersService.getUsersByTeamMemberId(knexInstance, users)
                            .then((teamMemberData) => {
                                const newTeamMemberObject = { teamMemberData, teamMembers };

                                res.json(newTeamMemberObject);
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    })
    .post(requireAuth, (req, res, next) => {
        const { team_id, user_id, first_name, last_name, phone_number} = req.body;
        let newTeamMember = {
            team_id,
            user_id,
           first_name,
           last_name,
           phone_number
        };
        for (const [key, value] of Object.entries(newTeamMember))
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` },
                });
            }
        // const event_id = req.body.event_id;
        newTeamMember = { team_id, user_id, first_name, last_name, phone_number };

        TeamMembersService.insertTeamMember(req.app.get("db"), newTeamMember)
            .then((tmemb) => {
                res.json(tmemb);
            })
            .catch(next);
    });
teamMembersRouter
    .route("/:user_id")
    .all((req, res, next) => {
        // const creator_id = user_id;
        TeamMembersService.getTeamMemberByUserId(
            req.app.get("db"),
            req.params.user_id
        )
            .then((members) => {
                if (!members) {
                    return res.status(400).json({
                        error: { message: `Member doesn't exist` },
                    });
                }
                res.members = members;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        console.log(res.members)
        res.json(res.members);
    })
    .delete(requireAuth, (req, res, next) => {
        TeamMembersService.deleteTeamMember(req.app.get("db"), req.params.user_id)
            .then((nupdatedTeamMember) => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch((req, res, next) => {
        const { user_id, first_name, last_name, } = req.body;
        const newMember = { user_id, first_name, last_name};
        const numberOfValues = Object.values(newMember).filter(Boolean).length;
        if (numberOfValues === 0) {
            logger.error(`Invalid update without required fields`);
            return res.status(400).json({
                error: {
                    message: `Request body must contain both 'user_id', 'first_name' and 'last_name'`,
                },
            });
        }

        TeamMembersService.updateTeamMember(req.app.get("db"), user_id, first_name, last_name)
            .then((nupdatedTeamMember) => {
                res.status(204).json("PATCH a success");
            })
            .catch(next);
    });

module.exports = teamMembersRouter;