import { render, screen } from '@testing-library/react';
import Index from '../../pages/index';
import { useAuth } from '../../src/contexts/auth.context';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    pathname: '/',
    ...moreRouterData
}));

jest.mock('../../src/contexts/auth.context');

describe('[UI.Component] Index', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            push: jest.fn(),
        });
    });

    it('should render the index page', () => {
        useAuth.mockReturnValue({
            logout: jest.fn(),
        });

        render(<Index />);

        expect(screen.getByText('Material UI - Next.js example')).toBeInTheDocument();
    });
});