"use strict";

var Sequelize = require('sequelize');

var sequelize = new Sequelize('db', 'me', 'root', {
  dialect: 'sqlite3'
});

var Task = require('data.task');

var Question = sequelize.define('Question', {
  question: Sequelize.String,
  answer: Sequelize.String,
  questionTimesShown: Sequelize.Number,
  numOfUsersVoted: Sequelize.Number
});
var sync = new Task(function (res, rej) {
  return sequelize.sync().then(res).catch(rej);
});
module.exports = {
  sync: sync
};