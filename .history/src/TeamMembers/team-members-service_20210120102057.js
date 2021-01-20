const TeamMembersService = {
    getAllTeamMembers(knex) {
        return knex.from("team_members").select("*");
    },

    getTeamId(knex, creator_id) {
        return knex.select("id").from("teams").where("creator_id", creator_id);
    },

    getTeamMembersByTeamId(knex, team_id) {
        return knex
            .select("*")
            .from("team_members")
            .where("team_id", team_id)
            // .andWhere("first_name")
            // .whereNull("last_name");
    },

    getUsersByTeamMemberId(knex, id) {
        return knex.select("*").from("users").whereIn("id", id);
    },

    insertTeamMember(knex, newTeamMember) {
        return knex
            .insert(newTeamMember)
            .into("team_members")
            .returning("*")
            .then((rows) => {
                return rows[0];
            });
    },

    getTeamMemberByUserId(knex, user_id) {
        return knex.from("team_members").select("*").where("user_id", user_id);
    },

    updateTeamMember(knex, user_id, first_name) {
        return knex("team_members")
            .where("user_id", user_id)
            .update("first_name", first_name);
    },

    deleteTeamMember(knex, user_id) {
        return knex("team_members").where({ user_id }).delete();
    },
};

module.exports = TeamMembersService;