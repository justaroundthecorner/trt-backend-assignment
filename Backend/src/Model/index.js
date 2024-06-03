const knexConfig = require('../knexfile')
const Knex = require('knex')

const { Model} = require('objection')

const knex = Knex(knexConfig)
Model.knex(knex)

const taskManagement =require('./tasks')
const users =require('./users')

module.exports =
{
    taskManagement,
    users
}