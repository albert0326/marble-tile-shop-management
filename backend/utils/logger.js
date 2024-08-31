// utils/logger.js

const winston = require("winston");

const { combine, timestamp, printf, errors } = winston.format;

// Define the log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: "info", // Set default logging level
  format: combine(
    timestamp(),
    errors({ stack: true }), // Capture stack trace of errors
    logFormat
  ),
  transports: [
    // Log to file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    // Log to console
    new winston.transports.Console({
      format: combine(timestamp(), winston.format.colorize(), logFormat),
    }),
  ],
});

module.exports = logger;
