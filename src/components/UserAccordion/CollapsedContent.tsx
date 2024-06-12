import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';
import {
    StyledCollapsedContent,
    StyledLeftSideContent,
    StyledStarsTypography,
} from './StyledUserAccordion';
import { RepoModel } from '../../api/types';

type CollapsedContentProps = {
    repo: RepoModel;
};
const CollapsedContent = ({ repo }: CollapsedContentProps) => {
    return (
        <StyledCollapsedContent>
            <StyledLeftSideContent>
                <Typography variant='h6' fontWeight='bold'>
                    {repo.name}
                </Typography>
                <StyledStarsTypography>
                    {repo.stargazers_count}
                    <StarIcon fontSize='small' sx={{ marginTop: '2px' }} />
                </StyledStarsTypography>
            </StyledLeftSideContent>
            <Typography variant='body2'>{repo.description}</Typography>
        </StyledCollapsedContent>
    );
};

export default CollapsedContent;
