const request = require("supertest");
const app = require("../src/server");
const User = require("../src/models/User");

test("if health endpoint returns code 200", async () => {
  const res = await request(app).get("/user/health");
  expect(res.statusCode).toBe(201);
});

test("if /user/ creates a user in my db", async () => {
  const res = await request(app).post("/user/").send({
    username: "Test2",
    email: "test2@email.com",
    password: "test123",
  });
  const users = await User.findAll();
  expect(users[0]).toHaveProperty("username", "Test");
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("user");
});

test("is /user/ PUT request updates specific user", async () => {
  await User.create({});
  const res = await (
    await request(app).put("/user/")
  ).send({
    userId: 1,
    password: "steveGary",
  });
  expect(await User.findByPK(1)).toHaveProperty("password", "steveGary");
});
