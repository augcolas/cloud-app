import { render, screen } from '@testing-library/react';
import Index from '../../pages/index';
import { useAuth } from '../../src/contexts/auth.context';
import {act} from "react-test-renderer";
import {beforeEach, describe} from "node:test";

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));

//mock auth context
jest.mock('../../src/contexts/auth.context');

//mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: { results: [], page: 1, total_pages: 1 } }),
    })
);

//mock window.scrollTo
global.window.scrollTo = jest.fn();

describe('[UI.Component] Index', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            push: jest.fn(),
        });
    });

    it('should render the index page', async() => {
        useAuth.mockReturnValue({
            logout: jest.fn(),
        });

        await act(async () => {
            render(<Index />);
        });


        expect(screen.getByText('What would you like to discover ?')).toBeInTheDocument();
    });
});