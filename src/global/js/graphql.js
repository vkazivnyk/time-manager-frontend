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

    deleteTask: taskId =>
        `mutation {
            deleteUserTask(input: {
                id: "${taskId}"
            })
            {
                task {
                    id
                    name
                    deadline
                    timeEstimation
                    difficulty
                }
            }
    }`,
};

export default graphql;
