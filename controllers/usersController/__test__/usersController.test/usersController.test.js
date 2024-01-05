const request = require("supertest");

const app = require("../../../../server");

const userSubscriptionEnum = require("../../../../constants");

describe("test POST users/login", () => {
  it("should return user obj and jwt", async () => {
    const testData = {
      email: "gravatar3@ukr.net",
      password: "Gopaklol1995!",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.stringMatching(
            new RegExp(`(${Object.values(userSubscriptionEnum).join("|")})`)
          ),
        }),
      })
    );
  });
});
