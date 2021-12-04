import React from 'react';
import Style from './HomePage.module.scss';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            /*Task : {
                Id: '',
                UserId: '',
                Name: '',
                DeadLine: '',
                TotalSeconds: '',
                Difficulty: '',
                Priority: '',
            },*/
            errors: [],
        };
    }

    render() {
        const { tasks, errors } = this.state;

        return (
            <div className={Style.Wrapper}>
                <div className={Style.TaskWrapper}>
                    {tasks.map(element => (
                        <Task />
                    ))}
                </div>
            </div>
        );
    }
}
