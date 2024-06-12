import { CircularProgress } from '@mui/material';
import { StyledFade } from './StyledLoader';

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <StyledFade in={loading} loading={loading} unmountOnExit>
            <CircularProgress size={60} />
        </StyledFade>
    );
};

export default Loader;
