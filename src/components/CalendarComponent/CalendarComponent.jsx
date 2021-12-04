import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classes from './CalendarComponent.scss';

class CalendarComponent extends React.Component {
    render() {
        const { ...otherProps } = this.props;

        return (
            <div {...otherProps}>
                <Calendar />
            </div>
        );
    }
}

export default CalendarComponent;
