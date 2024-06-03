const express = require("express");
const tasks = require("./routes/taskManagement");
const users = require("./routes/users");
const session = require("express-session");
const config_data = require("../config.json").development;
const SESSION_SECRET = config_data.session_key;
const debug = require("debug")("app:task-management");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");

const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
  debug(`Listening on port ${port}...`);
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, // Session will expire after 1 hour
    },
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//rate limitting
app.use(limiter);

// parse json request body
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));
app.use("/api", tasks);
app.use("/api", users);

app.use(errorHandler);

//Cross site scripting
app.use(xssClean());

module.exports = server;
