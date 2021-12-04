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
    addTask: ({ name, deadline, timeEstimation, difficulty }) =>
        `mutation {
            addUserTask(input: {
            name: "${name}"
            deadline: "${deadline}",
            timeEstimation: ${timeEstimation || 0},
            difficulty: ${difficulty}
            })
            {
                task {
                    id
                    name
                    deadline
                    timeEstimation
                    difficulty
                    user {
                        id
                        email
                        userName
                    }
                }
            }
        }`,
};

export default graphql;
