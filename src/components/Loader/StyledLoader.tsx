import { Fade, styled } from '@mui/material';

export const StyledFade = styled(Fade)(({ loading }: { loading: boolean }) => ({
    margin: 'auto',
    transitionDelay: loading ? '100ms' : '0ms',
}));
