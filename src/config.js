module.exports = {
  PORT: process.env.PORT || 8001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  JWT_SECRET: "event-planner-api-jwt",
  DATABASE_URL: "postgresql://dunder_mifflin@localhost/event_planner"
}