var React = require('react-native');
var Button = require('react-native-button');
var {
    StyleSheet
    } = React;
var MyButton = React.createClass({
    render: function () {
        return (
            <Button
                style={[this.myButtonStyles.button,this.props.style]}
                onPress={this.props.handleClick}
                >
                {this.props.value}
            </Button>
        );
    },
    myButtonStyles: StyleSheet.create({
        button: {
            padding: 5,
            fontSize: 20,
            color: '#ffffff',
            backgroundColor: "#38f",
            height: 40,
            marginTop: 20,
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: "row"
        }
    })
});
module.exports = MyButton;