const graphql = {
    getTasks: `query {
        task {
            id
            name
            deadline
            timeEstimation
            difficulty
        }
    }`,
};

export default graphql;
