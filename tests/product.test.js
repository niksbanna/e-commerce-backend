const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../server.js");

require("dotenv").config();


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe("GET /api/products", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        console.log(res.body.length);
        expect(res.body.success).toBe(true);
    });
});

describe("GET /api/products", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.productsCount).toBeGreaterThan(0);
    });
});

describe("GET /api/product/:id", () => {
    it("should return single product", async () => {
        const res = await request(app).get("/api/products/6482bf5881f3b84efc9bca04");
        expect(res.statusCode).toBe(200);
        console.log(res.body.length);
        expect(res.body.success).toBe(true);
    });
});
