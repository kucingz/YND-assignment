import { styled } from '@mui/material';

export const StyledMainPageCard = styled(`div`)(({ theme }) => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '50px auto',
    padding: '20px',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    //prevents scrollbar from repositioning page
    [theme.breakpoints.up('md')]: {
        paddingLeft: 'calc(100vw - 100%)',
    },
}));
