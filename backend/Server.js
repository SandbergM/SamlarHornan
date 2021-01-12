const express = require("express");
const session = require("express-session");
const store = require("better-express-store");

const { PORT, SECRET } = require("./config");

module.exports = class Server {
  static hasBeenInstantiated = false;

  constructor() {
    if (Server.hasBeenInstantiated) {
      throw new Error("An instance of this server is already created/Running!");
    }
    Server.hasBeenInstantiated = true;
    this.app = express();
  }

  start() {
    this.app.use(express.json());
    this.#addSession();
    this.#addAcl();
    this.#addJsonCheck();
    //this.#addLogger();
    this.#addRouter();
    this.#run();
  }

  #addSession() {
    this.app.use(
      session({
        secret: SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: "auto" },
        store: store({ dbPath: "./database.db" }),
      })
    );
  }

  #addAcl() {
    this.app.use(require("./middleware/ACL/ACL"));
  }

  #addLogger() {
    // Used for debugging purposes
    this.app.use(require("./middleware/Logger/Logger"));
  }

  #addJsonCheck() {
    this.app.use((error, req, res, next) => {
      if (error) {
        res.status(500);
        res.json({
          error: "Something went wrong - probably badly formatted JSON",
          errorDetails: error,
        });
      }
    });
  }

  #addRouter() {
    this.app.use(require("./Router"));
  }

  #run() {
    this.app.listen(PORT || 8080, () => {
      console.log(`Listening on port ${PORT || 8080}`);
    });
  }
};
