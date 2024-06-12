import api from '../api/api';
import { FIND_USERS, USERS } from '../api/constants';
import githubApi from '../api/services/GithubService';
import { RepoModel, UserListModel } from '../api/types';
import { vi, Mock } from 'vitest';

vi.mock('../api/api');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

describe('githubApi service', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('getUserList', () => {
        it('fetches user list', async () => {
            const mockUsername = 'testuser';
            const mockResponse: UserListModel = {
                total_count: 5,
                incomplete_results: 'false',
                items: [
                    {
                        login: 'testuser',
                    },
                    {
                        login: 'testuser2',
                    },
                    {
                        login: 'testuser3',
                    },
                    {
                        login: 'testuser4',
                    },
                    {
                        login: 'testuser5',
                    },
                ],
            };

            (api.get as Mock).mockResolvedValueOnce({
                data: mockResponse,
            });

            const result = await githubApi.getUserList(mockUsername);

            expect(api.get).toHaveBeenCalledWith(FIND_USERS, {
                params: {
                    q: mockUsername,
                    per_page: 5,
                },
            });
            expect(result).toEqual(mockResponse);
            expect(result.items.length).toBeLessThanOrEqual(5);
        });

        it('throws an error if API returns error', async () => {
            const mockUsername = 'testuser';
            const mockError = new Error('Network error');

            (api.get as Mock).mockRejectedValueOnce(mockError);

            await expect(githubApi.getUserList(mockUsername)).rejects.toThrow(
                'Network error'
            );
            expect(api.get).toHaveBeenCalledWith(FIND_USERS, {
                params: {
                    q: mockUsername,
                    per_page: 5,
                },
            });
        });
    });

    describe('getRepoData', () => {
        it('fetches repo data', async () => {
            const mockUsername = 'testuser';
            const mockResponse: RepoModel[] = [
                {
                    id: 1,
                    name: 'repo1',
                    description: 'desc123',
                    stargazers_count: 21,
                },
                {
                    id: 2,
                    name: 'repo2',
                    description: 'desc321',
                    stargazers_count: 37,
                },
                {
                    id: 3,
                    name: 'repo3',
                    description: 'desc321333',
                    stargazers_count: 55,
                },
            ];

            (api.get as Mock).mockResolvedValueOnce({
                data: mockResponse,
            });

            const result = await githubApi.getRepoData(mockUsername);

            expect(api.get).toHaveBeenCalledWith(
                `${USERS}/${mockUsername}/repos`
            );
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if the API call fails', async () => {
            const mockUsername = 'testuser';
            const mockError = new Error('Network error');

            (api.get as Mock).mockRejectedValueOnce(mockError);

            await expect(githubApi.getRepoData(mockUsername)).rejects.toThrow(
                'Network error'
            );
            expect(api.get).toHaveBeenCalledWith(
                `${USERS}/${mockUsername}/repos`
            );
        });
    });
});
