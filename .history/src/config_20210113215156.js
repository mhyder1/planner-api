module.exports = {
  PORT: process.env.PORT || 8001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  JWT_SECRET: "event-planner-api-jwt",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://dunder-mifflin@localhost/planner",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}