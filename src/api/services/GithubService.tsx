import api from '../api';
import { FIND_USERS, USERS } from '../constants';
import { RepoModel, UserListModel } from '../types';

const getUserList = async (username: string): Promise<UserListModel> => {
    try {
        const response = await api.get<UserListModel>(FIND_USERS, {
            params: {
                q: username,
                per_page: 5,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getRepoData = async (username: string): Promise<RepoModel[]> => {
    try {
        const response = await api.get<RepoModel[]>(
            `${USERS}/${username}/repos`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
const githubApi = {
    getUserList,
    getRepoData,
};
export default githubApi;
