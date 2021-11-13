const request = require("supertest");
const superagent = require("superagent");
const FormData = require("form-data");
const app = require("../app");
const fs = require("fs");
const { Category, Course, Comment, User, Video } = require("../models");

let token;
let loginParams = {
  email: "admin@gmail.com",
  password: "12345678",
};
const dataCategories = JSON.parse(
  fs.readFileSync("./data/categories.json", "utf-8")
);
const dataCourses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
const dataVideos = JSON.parse(fs.readFileSync("./data/videos.json", "utf-8"));
const dataComments = JSON.parse(
  fs.readFileSync("./data/comments.json", "utf-8")
);

beforeAll(async () => {
  try {
    await User.bulkCreate(dataUsers);

    const { body } = await request(app).post("/public/login").send(loginParams);

    token = body.access_token;
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await Course.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Category.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Video.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Comment.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /admin/categories", () => {
  test("[201 - Success] add category", async () => {
    await request(app).delete("/admin/categories/1").set("access_token", token);

    await request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send({ name: "Bahasa" });
  });
});


describe("POST /admin/courses", () => {
  test("[201 - Success] add course", async () => {
    const inputAdd = {
      name: "Bahasa Jepang",
      description: "belajar cepat bahasa jepang",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
      Videos: [
        {
          name: "bahasa jepang",
          videoUrl: "https://www.youtube.com/embed/fp0mybLeagQ",
        },
        {
          name: "bahasa jepang",
          videoUrl: "https://www.youtube.com/embed/fp0mybLeagQ",
        },
      ],
    };

    await request(app)
      .post("/admin/categories")
      .set("access_token", token)
      .send({ name: "Bahasa" });

    const response = await request(app)
      .post(`/admin/courses`)
      .set("access_token", token)
      .send(inputAdd);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });

  test("[400 - Invalid Format] add video with invalid format ", (done) => {
    const inputSample = {
      name: "Bahasa Jepang",
      description: "belajar cepat bahasa jepang",
      price: 112000,
      thumbnailUrl:
        "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
      difficulty: "hard",
      status: "active",
      CategoryId: 1,
    };

    const filePath = "./assets/logo.png";

    superagent(app)
      .post("/admin/courses")
      .set("access_token", token)
      .field("name", inputSample.name)
      .field("description", inputSample.description)
      .field("price", inputSample.price)
      .field("thumbnailUrl", inputSample.thumbnailUrl)
      .field("difficulty", inputSample.difficulty)
      .field("status", inputSample.status)
      .field("CategoryId", inputSample.CategoryId)
      .attach("Videos", filePath)
      .then((response) => {
        const { status, body } = response;
        console.log(body, "<<<<< 129");
        expect(status).toBe(400);
        expect(body).toEqual(expect.any(Object));
        expect(body).toHaveProperty("message", "File Format Should Be MP4");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});