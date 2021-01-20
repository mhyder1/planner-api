module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  JWT_SECRET: "event-planner-api-jwt",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://dunder-mifflin@localhost/planner",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "d-e8eed8a6cdb34fbb92bb03bfe9331409"
}