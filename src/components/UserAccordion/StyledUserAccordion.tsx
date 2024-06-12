import { IconButton, IconButtonProps, Typography, styled } from '@mui/material';
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const StyledExpandContainer = styled(`div`)({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    padding: '10px',
});

export const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const StyledCollapsedContent = styled(`div`)({
    backgroundColor: '#e0e0e0',
    margin: '10px 0px 0px 20px',
    padding: '10px',
    wordBreak: 'break-all',
});

export const StyledStarsTypography = styled(Typography)({
    display: 'flex',
    marginLeft: '10px',
});

export const StyledLeftSideContent = styled(`div`)({
    display: 'flex',
    justifyContent: 'space-between',
});

export const StyledUserAccordionContainer = styled(`div`)(
    ({ lastListItem }: { lastListItem: boolean }) => ({
        paddingBottom: lastListItem ? '60px' : '',
    })
);
