const Sequelize = require('sequelize');
const sequelize = new Sequelize('db','me','root', {dialect:'sqlite3'})
const Task = require('data.task');

const Question = sequelize.define('Question', {
  question: Sequelize.String,
  answer: Sequelize.String,
  questionTimesShown: Sequelize.Number,
  numOfUsersVoted: Sequelize.Number
})

const sync = new Task((res, rej) => sequelize.sync().then(res).catch(rej))

module.exports = {sync}
