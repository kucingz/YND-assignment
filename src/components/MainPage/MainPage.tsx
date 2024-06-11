import { Button, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import githubApi from '../../api/services/GithubService';
import UserAccordion from '../UserAccordion/UserAccordion';
import { StyledMainPageCard } from './StyledMainPage';
import { UserListItemModel } from '../../api/types';

const MainPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');

    const { data: usersListData, refetch } = useQuery({
        enabled: false,
        queryKey: ['users'],
        queryFn: () => githubApi.getUsersList(username),
    });

    const handleUserSearch = () => {
        refetch();
    };

    useEffect(() => {
        if (usersListData && usersListData.items.length === 0) {
            enqueueSnackbar('No user with this name found', {
                variant: 'info',
            });
        }
    }, [usersListData]);

    //I am moving the conditions here for better readability
    const showUserList = () =>
        usersListData &&
        usersListData.items.map((user: UserListItemModel) => (
            <UserAccordion key={user.login} userData={user} />
        ));

    const showUserName = () =>
        usersListData && (
            <Typography>Showing users for "{username}"</Typography>
        );
    return (
        <StyledMainPageCard>
            <Typography textAlign='center' variant='h2'>
                YND Assignment
            </Typography>
            <TextField
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                placeholder='Enter username'
            />
            <Button variant='contained' onClick={handleUserSearch} fullWidth>
                Search
            </Button>
            {showUserName()}
            {showUserList()}
        </StyledMainPageCard>
    );
};

export default MainPage;
