import api from '../api';
import { FIND_USERS, REPOS, USERS } from '../constants';
import { RepoModel, UserListModel } from '../types';

const getUsersList = async (username: string): Promise<UserListModel> => {
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
            `${USERS}/${username}/${REPOS}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
const githubApi = {
    getUsersList,
    getRepoData,
};
export default githubApi;
