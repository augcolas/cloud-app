import handler from '../../pages/api/movies';
import {getMovies} from "../../src/services/movies/movies.service";

jest.mock('../../src/services/movies/movies.service');

describe('[API.Handler] movies', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated list of movies', async () => {
        // Mocking the request object with query parameters
        const req = {
            method: 'GET',
            query: {
                query: 'search query',
                page: 1,
            },
        };

        // Sample movies data
        const moviesData = [
            { id: 1, title: 'Movie 1', year: 2022 },
            { id: 2, title: 'Movie 2', year: 2023 },
        ];

        // Mocking the getMovies function
        getMovies.mockResolvedValue(moviesData);

        // Mocking the response object
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        // Call the handler function
        await handler(req, res);

        // Assert that getMovies was called with the correct parameters
        expect(getMovies).toHaveBeenCalledWith(req.query);

        // Assert that the response status and JSON data are as expected
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 200, data: moviesData });
    });

    it('should return 405 if method is not GET', async () => {
        // Mocking the request object with query parameters
        const req = {
            method: 'POST',
            query: {
                query: 'search query',
                page: 1,
            },
        };

        // Mocking the response object
        const res = {
            status: jest.fn(() => res),
            end: jest.fn(),
        };

        // Call the handler function
        await handler(req, res);

        // Assert that the response status and end are as expected
        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.end).toHaveBeenCalled();
    });
});