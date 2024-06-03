let server = require("../app");
let mockSession = require("mock-session");
let token, cookie;
const { expect } = require("@jest/globals");
const request = require("supertest");
const express = require("express");
const session = require("express-session");
const errorHandler = require("../middleware/errorHandler");
const Tasks = require("../Model/index").taskManagement;
describe("/api/tasks", () => {
  beforeEach(async () => {
    //login and get authorization tokin for each test
    if (server) {
      await server.close();
    }
    const res = await request(server).post(`/api/user/login`).send({
      email: "isra@gmail.com",
      password: "isra134",
    });
    token = res.body.result.access_token;
  });

  //close server and delete any data in DB for each task (seperate test DB)
  afterEach(async () => {
    let response = await Tasks.query().delete();
    await server.close();
  });

  //testing input of tasks
  describe("Post /api/tasks", () => {
    it("inserting a new Task", async () => {
      //adding a new task
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjow thi work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
      ];
      const res = await request(server)
        .post(`/api/tasks`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send(tasks);

      //testing the expected result
      expect(res.status).toBe(200);
      expect(res.body.result.length).toBe(1);
      expect(
        res.body.result.some(
          (t) => t.title === "Complete Another Project Report"
        )
      );
      expect(
        res.body.result.some((t) => t.status === "COMPLETED")
      ).toBeTruthy();
    });
  });

  //updating one task
  describe("Patch /api/task/id", () => {
    it("updating a Task", async () => {
      //adding a dummy task
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
      ];
      let result = await Tasks.query().insert(tasks);
      let taskId = result[0].id;
      //updating the task in payload
      let updateTasks = {
        title: "Complete Another Project Report",
        description: "Will enjoy this work",
        priority: "Medium",
        status: "PENDING",
        user_id: 1,
      };
      //making the update call
      const res = await request(server)
        .patch(`/api/task/${taskId}`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send(updateTasks);
      //comparing the expected results
      expect(res.status).toBe(200);
      expect(res.body.result.priority === "High");
      expect(res.body.result.status === "PENDING");
    });
  });

  //deleting a task
  describe("Delete /api/task/id", () => {
    it("deleting a Task", async () => {
      //creating a dummy task
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
      ];
      let result = await Tasks.query().insert(tasks);
      let taskId = result[0].id;
      //deleting the dummy task
      const res = await request(server)
        .delete(`/api/task/${taskId}`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send({ user_id: 1 });
      //testing the expected output
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(1);
    });
  });

  //getting one task
  describe("get /api/tasks", () => {
    it("getting all Tasks", async () => {
      //adding 2 dummy tasks
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
        {
          title: "Go for a coffee",
          description: "Complete the work",
          priority: "High",
          status: "PENDING",
          user_id: 1,
        },
      ];
      //getting the tasks
      let result = await Tasks.query().insert(tasks);
      const res = await request(server)
        .get(`/api/tasks`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send({ user_id: 1 });
      //testing the expcted output
      expect(res.status).toBe(200);
      expect(res.body.result.length).toBe(2);
      expect(res.body.result.some((t) => t.title === "Will enjoy this work"));
      expect(res.body.result.some((t) => t.status === "PENDING")).toBeTruthy();
    });
  });

  //getting on task
  describe("get /api/task/id", () => {
    it("getting a Task", async () => {
      //creating a dummy task
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
      ];
      let result = await Tasks.query().insert(tasks);
      let taskId = result[0].id;

      //getting the expected output
      const res = await request(server)
        .get(`/api/task/${taskId}`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send({ user_id: 1 });

      //testing the expected output
      expect(res.status).toBe(200);
      expect(res.body.result.priority === "High");
      expect(res.body.result.status === "COMPLETED");
    });
  });

  //testing error handling for authentication
  describe("Test Error handling", () => {
    it("authentication ", async () => {
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "High",
          status: "COMPLETED",
          user_id: 1,
        },
      ];

      //not assigning token for authorization
      const res = await request(server).post(`/api/tasks`).send(tasks);
      //testing the expected statusCode and message
      expect(res.status).toBe(401);
      expect(
        res.body.message ===
          "Unauthorized access, Please check email and password or please add authorization"
      );
    });
  });

  //testing error for URL not found
  describe("Test Error handling for url error", () => {
    it("url not found Error ", async () => {
      let tasks = [
        {
          title: "Complete Another Project Report",
          description: "Will enjoy this work",
          priority: "NO",
          status: "COMPLETED",
          user_id: 1,
        },
      ];
      //adding wrong url intentionally
      const res = await request(server)
        .post(`/api/tas`)
        .set({
          Authorization: "Bearer " + token, // ==> new header
        })
        .send(tasks);
      expect(res.status).toBe(404);
    });
  });
});
