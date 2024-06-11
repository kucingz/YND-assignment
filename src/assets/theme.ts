import { createTheme } from '@mui/material';

import { responsiveFontSizes } from '@mui/material/styles';
export const theme = responsiveFontSizes(
    createTheme({
        typography: {
            fontFamily: 'Oswald',
            button: {
                textTransform: 'none',
            },
        },
    })
);
