import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import githubApi from '../../api/services/GithubService';
import { ExpandMore, StyledExpandContainer } from './StyledUserAccordion';
import CollapsedContent from './CollapsedContent';
import { RepoModel, UserListItemModel } from '../../api/types';

const UserAccordion = ({ userData }: { userData: UserListItemModel }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { data: userData2 } = useQuery({
        queryKey: ['userRepos', userData.login],
        queryFn: () => githubApi.getRepoData(userData.login),
    });

    const showCollapsedContent = () =>
        userData2 &&
        userData2.map((repo: RepoModel) => (
            <CollapsedContent key={repo.id} repo={repo} />
        ));

    return (
        <div>
            <StyledExpandContainer>
                {userData.login}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}>
                    <KeyboardArrowUpIcon />
                </ExpandMore>
            </StyledExpandContainer>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                {showCollapsedContent()}
            </Collapse>
        </div>
    );
};
export default UserAccordion;
