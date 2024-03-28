import handler from "../../pages/api/movies/[id]/likes";
import { createMocks } from "node-mocks-http";

jest.mock("../../lib/mongodb", () => ({
    __esModule: true,
    default: {
        db: jest.fn(() => ({
            collection: jest.fn(() => ({
                findOne: jest.fn(async () => ({ idTMDB: 123, likeCounter: 5 })),
                updateOne: jest.fn(async () => ({ matchedCount: 0, modifiedCount: 0 })),
                insertOne: jest.fn(async (data) => ({ insertedId: data.idTMDB })),
                find: jest.fn(() => ({
                    limit: jest.fn(() => ({
                        toArray: jest.fn(async () => []),
                    })),
                })),
            })),
        })),
    },
}));

describe("/api/likes API", () => {
    it("should get like counter for a movie", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: { idMovie: 123 },
        });

        await handler(req, res);
        expect(res.statusCode).toBe(200);
    });
});