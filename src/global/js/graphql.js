const dayjs = require('dayjs');

const graphql = {
    getTasks: ({ endDate }) => `query {
        task(
        where: { deadline : { gte : "${dayjs(endDate).toISOString()}" }}) {
            id
            name
            deadline
            importance
            difficulty
            priorityEvaluation
            timeEvaluation
            deadlineMissEvaluation
        }
    }`,

    addTask: ({ name, deadline, importance, difficulty }) =>
        `mutation {
            addUserTask(input: {
            name: "${name}"
            deadline: "${dayjs(deadline).toISOString()}",
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
                    priorityEvaluation
                    timeEvaluation
                    deadlineMissEvaluation
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
                    priorityEvaluation
                    timeEvaluation
                    deadlineMissEvaluation
                }
            }
    }`,

    putTask: ({ id, name, deadline, importance, difficulty }) =>
        `mutation {
            putUserTask(input: {
                id: "${id}",
                name: "${name}",
                deadline: "${dayjs(deadline).toISOString()}",
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
                    priorityEvaluation
                    timeEvaluation
                    deadlineMissEvaluation
                }
            }
    }`,
};

export default graphql;
