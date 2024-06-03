const Task = require("../Model/index").taskManagement;
const { transaction } = require("objection");

class TaskData {
  async insertTasks(userId, reqParam, payload) {
    //transaction for DB insertion
    const knex = Task.knex();
    const trx = await transaction.start(Task.knex());
    try {
      console.log(userId)
      //adding user id in task taple
      payload = payload.map((a) => ({ ...a, user_id: parseInt(userId) }));

      //query to insert a new Task
      let result = await Task.query(trx).insert(payload);
      result = {
        success: true,
        result,
        message: "tasks Added",
        status: 200,
      };
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
  async updateTask(userId, reqParam, payload) {
    //transaction for DB manipulations
    const knex = Task.knex();
    const trx = await transaction.start(Task.knex());
    try {
      let taskId = reqParam.id;

      //query to update a Task
      let result = await Task.query(trx)
        .patchAndFetchById(taskId, payload)
        .where("user_id", userId);

      result = {
        success: true,
        result,
        message: "tasks updated",
        status: 200,
      };
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
  async deleteTask(userId, reqParam) {
    const knex = Task.knex();
    const trx = await transaction.start(Task.knex());
    try {

      let taskId = reqParam.id;
      //query to delete a Task
      let result = await Task.query(trx)
        .deleteById(taskId)
        .where("user_id", userId);

        result = {
          success: true,
          result,
          message: "tasks successfully deleted",
          status: 200,
        };
        await trx.commit();
        return result;
      
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
  async getAllTasks(queryParam) {
    const knex = Task.knex();
    const trx = await transaction.start(Task.knex());
    try {

     
      //query to get all tasks
      let result =  Task.query(trx)
      result = await result;
      result = {
        success: true,
        result,
        message: "getting all tasks",
        status: 200,
      };
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
  async getOneTask(params, queryParams) {
    const knex = Task.knex();
    const trx = await transaction.start(Task.knex());
    try {
      let taskId = params.id;
      //query to get a task with id and additional filters
      let result = await Task.query(trx).where("id", taskId)
      result = {
        success: true,
        result,
        message: "getting the task",
        status: 200,
      };
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}
module.exports = TaskData;
