//The github api returns a lot more fields, but for the purpose of the assignment I create types for the ones I need, o make it more readable :)
export type UserListModel = {
    total_count: number;
    incomplete_results: string;
    items: UserListItemModel[];
};
export type UserListItemModel = {
    login: string;
};

export type RepoModel = {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
};
