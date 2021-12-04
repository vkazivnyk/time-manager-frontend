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

    putTask: ({ id, name, deadline, timeEstimation, difficulty }) =>
        `mutation {
            putUserTask(input: {
                id: "${id}",
                name: "${name}",
                deadline: "${deadline}",
                timeEstimation: ${timeEstimation},
                difficulty: ${difficulty}
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
