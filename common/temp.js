'use strict';

var React = require('react-native');
var {
    DatePickerIOS,
    StyleSheet,
    Text,
    TextInput,
    View,
    AppRegistry
    } = React;

var DatePickerExample = React.createClass({
    getDefaultProps: function () {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
        };
    },

    getInitialState: function() {
        return {
            date: this.props.date,
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
        };
    },

    onDateChange: function(date) {
        this.setState({date: date});
    },

    onTimezoneChange: function(event) {
        var offset = parseInt(event.nativeEvent.text, 10);
        if (isNaN(offset)) {
            return;
        }
        this.setState({timeZoneOffsetInHours: offset});
    },

    render: function() {
        // Ideally, the timezone input would be a picker rather than a
        // text input, but we don't have any pickers yet :(
        return (
            <View>
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                    />
            </View>
        );
    },
});


var styles = StyleSheet.create({
    textinput: {
        height: 26,
        width: 50,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        padding: 4,
        fontSize: 13,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    labelView: {
        marginRight: 10,
        paddingVertical: 2,
    },
    label: {
        fontWeight: '500',
    },
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
    },
    heading: {
        fontWeight: '500',
        fontSize: 14,
    },
});
AppRegistry.registerComponent('DriverApp', () => DatePickerExample);

module.exports = DatePickerExample;
