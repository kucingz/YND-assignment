import { ThemeProvider } from '@mui/material';
import './App.css';
import { theme } from './assets/theme';
import MainPage from './components/MainPage/MainPage';
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

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
    queryCache: new QueryCache({
        onError: (error) =>
            enqueueSnackbar(`${error.message}`, {
                variant: 'error',
            }),
    }),
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}>
                <ThemeProvider theme={theme}>
                    <MainPage />
                </ThemeProvider>
            </SnackbarProvider>
        </QueryClientProvider>
    );
}

export default App;
