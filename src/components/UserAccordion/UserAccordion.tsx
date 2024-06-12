import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import githubApi from '../../api/services/GithubService';
import {
    ExpandMore,
    StyledExpandContainer,
    StyledUserAccordionContainer,
} from './StyledUserAccordion';
import CollapsedContent from './CollapsedContent';
import { RepoModel, UserListItemModel } from '../../api/types';

type UserAccordionProps = {
    userData: UserListItemModel;
    lastListItem: boolean;
};
const UserAccordion = ({ userData, lastListItem }: UserAccordionProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { data: userRepos } = useQuery({
        queryKey: ['userRepos', userData.login],
        queryFn: () => githubApi.getRepoData(userData.login),
    });

    const showCollapsedContent = () =>
        userRepos &&
        userRepos.map((repo: RepoModel) => (
            <CollapsedContent key={repo.id} repo={repo} />
        ));

    return (
        <StyledUserAccordionContainer lastListItem={lastListItem}>
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
        </StyledUserAccordionContainer>
    );
};
export default UserAccordion;
