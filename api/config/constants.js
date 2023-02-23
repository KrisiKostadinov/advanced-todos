module.exports = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  HASH_SALT_ROUNDS: 10,

  // messages
  messages: {
    CONNECTED_TO_DB: "Connected to the db",
    CONNECTION_ERROR: "Connection error",
    SERVER_STARTED: "Server started on port:",
    SERVER_WORKS: "Server works!",
    INVALID_CREDENTIALS: "Invalid username or password!",
  },

  // status codes
  status_codes: {
    CREATED: 201,
    OK: 200,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
  },

  // routes
  ruotes_constats: {
    users: {
      INITIAL: "/users",
      REGISTER: "/register",
      LOGIN: "/login",
    },
  }
};
