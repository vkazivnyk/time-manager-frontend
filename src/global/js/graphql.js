const graphql = {
    getTasks: `query {
        task {
            id
            name
            deadline
            totalSeconds
            difficulty
        }
    }`,
};

export default graphql;
