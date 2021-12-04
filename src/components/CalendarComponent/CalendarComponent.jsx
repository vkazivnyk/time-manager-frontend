import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classes from './CalendarComponent.scss';

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={classes.container}>
                <Calendar />
            </div>
        );
    }
}

export default CalendarComponent;
