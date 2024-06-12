import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import githubApi from '../../api/services/GithubService';
import { UserListItemModel } from '../../api/types';
import { setUsername } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/storeHooks';
import Loader from '../Loader/Loader';
import UserAccordion from '../UserAccordion/UserAccordion';
import { StyledMainPageCard } from './StyledMainPage';

const MainPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const storeUsername: string = useAppSelector(
        (state) => state.user.username
    );
    const validationSchema = z.object({
        username: z.string().min(1, 'Field is required'),
    });
    const {
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: { username: '' },
    });

    const username = watch('username');

    const {
        isFetching,
        data: userListData,
        refetch,
    } = useQuery({
        enabled: false,
        queryKey: ['users'],
        queryFn: () => githubApi.getUserList(username),
    });

    const submitForm: SubmitHandler<{ username: string }> = (data) => {
        dispatch(setUsername(data.username));
        refetch();
    };

    //I am moving the conditions here for better readability
    const showUserListAndName = () => {
        return isFetching ? (
            <Loader loading={isFetching} />
        ) : (
            userListData && (
                <>
                    <Typography>
                        {userListData.items.length === 0
                            ? `No user with the username "${storeUsername}" found`
                            : `Showing users for "${storeUsername}"`}
                    </Typography>
                    {userListData.items.map((user: UserListItemModel, i) => (
                        <UserAccordion
                            lastListItem={userListData.items.length === i + 1}
                            key={user.login}
                            userData={user}
                        />
                    ))}
                </>
            )
        );
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <StyledMainPageCard>
                <Typography textAlign='center' variant='h2'>
                    YND Assignment
                </Typography>

                <TextField
                    error={!!errors.username?.message}
                    {...register('username')}
                    placeholder='Enter username'
                    helperText={errors.username?.message ?? ' '}
                />

                <Button variant='contained' type='submit' fullWidth>
                    Search
                </Button>
                {showUserListAndName()}
            </StyledMainPageCard>
        </form>
    );
};

export default MainPage;
