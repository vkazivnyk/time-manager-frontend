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

    putTask: ({ id, name, deadline, timeEstimation, difficulty }) =>
        `mutation {
            putUserTask(input: {
                id: "${id}",
                name: "${name}",
                deadline: "${deadline}",
                timeEstimation: "${timeEstimation}",
                difficulty: "${difficulty}"
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
