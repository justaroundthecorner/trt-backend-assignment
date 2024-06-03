const TaskData = require("../data/taskData");

class TaskBusiness {
  constructor() {
    this.taskData = new TaskData();
  }

  // insert all tasks
  async insertTasks(userId,reqParam, reqBody) {
    let result;
    try {
      result = await this.taskData.insertTasks(userId,reqParam, reqBody);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //update one single task
  async updateTask(userId,reqParam,reqBody) {
    let result;
    try {
      result = await this.taskData.updateTask(userId,reqParam, reqBody);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //delete one task
  async deleteTask(userId,reqParam) {
    let result;
    try {
      result = await this.taskData.deleteTask(userId,reqParam);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //get all tasks
  async getAllTasks(queryParams) {
    let result;
    try {
      result = await this.taskData.getAllTasks(queryParams);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //get one task
  async getOneTask(params,queryParams) {
    let result;
    try {
      result = await this.taskData.getOneTask(params,queryParams);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = TaskBusiness;
