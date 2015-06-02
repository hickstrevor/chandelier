"use strict";

var Hapi    = require("hapi");
var bell    = require("bell");
var path    = require("path");
var server  = new Hapi.Server();
var handler = require("./handler");
var config  = require("./config");

server.connection({
  port : Number(process.env.PORT) || 8000
});

server.register([require("bell"), require("hapi-auth-cookie")], function(err) {

  if (err) {
    console.log("Error registering authorization: ", err);
    return;
  }

  server.auth.strategy("google", "bell", {
    provider       : "google",
    password       : config.bell.password,
    clientId       : config.bell.clientID,
    clientSecret   : config.bell.clientSecret,
    isSecure       : false,
    providerParams : {
      redirect_uri : server.info.uri + "/login"
    }
  });

  server.auth.strategy("session", "cookie", {
    password   : config.cookie.password,
    cookie     : "sid",
    redirectTo : "/",
    isSecure   : "false"
  });
});


server.route(require("./routes.js"));

module.exports = server;
