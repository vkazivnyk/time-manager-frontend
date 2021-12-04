const dayjs = require('dayjs');

const graphql = {
    getTasks: ({ endDate }) => `query {
        task(where: { deadline : { gte : "${dayjs(endDate).toISOString()}" }}) {
            id
            name
            deadline
            importance
            difficulty
        }
    }`,

    addTask: ({ name, deadline, importance, difficulty }) =>
        `mutation {
            addUserTask(input: {
            name: "${name}"
            deadline: "${deadline}",
            importance: ${importance},
            difficulty: ${difficulty}
            })
            {
                task {
                    id
                    name
                    deadline
                    importance
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
                    importance
                    difficulty
                }
            }
    }`,

    putTask: ({ id, name, deadline, importance, difficulty }) =>
        `mutation {
            putUserTask(input: {
                id: "${id}",
                name: "${name}",
                deadline: "${deadline}",
                importance: ${importance},
                difficulty: ${difficulty}
            })
            {
                task {
                    id
                    name
                    deadline
                    importance
                    difficulty
                }
            }
    }`,
};

export default graphql;
