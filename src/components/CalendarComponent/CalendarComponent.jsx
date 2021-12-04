import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class CalendarComponent extends React.Component {
    render() {
        const { onChange, value, ...otherProps } = this.props;

        return (
            <div {...otherProps}>
                <Calendar onChange={onChange} value={value} />
            </div>
        );
    }
}

export default CalendarComponent;
