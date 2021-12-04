const dayjs = require('dayjs');

const graphql = {
    getTasks: ({ endDate }) => `query {
        task(where: { deadline : { gte : "${dayjs(endDate).toISOString()}" }}) {
            id
            name
            deadline
            importance
            difficulty
            priorityEvaluation
        }
    }`,

    addTask: ({ name, deadline, importance, difficulty, priorityEvaluation }) =>
        `mutation {
            addUserTask(input: {
            name: "${name}"
            deadline: "${dayjs(deadline).toISOString()}",
            importance: ${importance},
            difficulty: ${difficulty},
            priorityEvaluation: ${priorityEvaluation},
            })
            {
                task {
                    id
                    name
                    deadline
                    importance
                    difficulty
                    priorityEvaluation
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
                }
            }
    }`,

    putTask: ({
        id,
        name,
        deadline,
        importance,
        difficulty,
        priorityEvaluation,
    }) =>
        `mutation {
            putUserTask(input: {
                id: "${id}",
                name: "${name}",
                deadline: "${dayjs(deadline).toISOString()}",
                importance: ${importance},
                difficulty: ${difficulty}
                priorityEvaluation: ${priorityEvaluation},
            })
            {
                task {
                    id
                    name
                    deadline
                    importance
                    difficulty
                    priorityEvaluation
                }
            }
    }`,
};

export default graphql;
