import { ThemeProvider } from '@emotion/react';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import githubApi from '../api/services/GithubService';
import { UserListItemModel } from '../api/types';
import { theme } from '../assets/theme';
import MainPage from '../components/MainPage/MainPage';
import userReducer from '../redux/slices/userSlice';

const store = configureStore({
    reducer: { user: userReducer },
});
require('dotenv').config({ path: '.env' });
vi.mock('axios');
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 1000 * 60 * 60 * 24,
        },
    },
});

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <SnackbarProvider>
                    <ThemeProvider theme={theme}>{ui}</ThemeProvider>
                </SnackbarProvider>
            </Provider>
        </QueryClientProvider>
    );
};
describe('MainPage', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    test('renders page correctly', () => {
        renderWithProviders(<MainPage />);
        expect(
            screen.getByPlaceholderText('Enter username')
        ).toBeInTheDocument();
        expect(screen.getByText('YND Assignment')).toBeInTheDocument();
    });

    test('displays validation', async () => {
        renderWithProviders(<MainPage />);
        fireEvent.click(screen.getByText('Search'));
        await waitFor(() =>
            expect(screen.getByText('Field is required')).toBeInTheDocument()
        );
    });

    test('fetches then displays users', async () => {
        const usersListData = {
            total_count: 1,
            incomplete_results: 'false',
            items: [{ login: 'testUser' }] as UserListItemModel[],
        };
        (githubApi.getUserList = vi.fn()).mockResolvedValueOnce(usersListData);

        renderWithProviders(<MainPage />);
        fireEvent.change(screen.getByPlaceholderText('Enter username'), {
            target: { value: 'test' },
        });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() =>
            expect(githubApi.getUserList).toHaveBeenCalledWith('test')
        );
        await waitFor(() =>
            expect(
                screen.getByText('Showing users for "test"')
            ).toBeInTheDocument()
        );
    });
});
