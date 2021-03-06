/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    } = React;
//AppRegistry = React.AppRegistry


var MyButton = React.createClass({
    render: function () {
        return (
            <Button
                style={this.myButtonStyles.button}
                onPress={this.props.handleClick}
                >
                登 陆
            </Button>
        );
    },
    myButtonStyles: StyleSheet.create({
        button: {
            fontSize: 20,
            color: '#ffffff',
            backgroundColor: "#02B300",
            height: 40,
            marginTop: 20,
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: "row",
        }
    })
});
var MyTextInput = React.createClass({
    render: function () {
        return (
            <View style={this.myTextInputStyles.container}>
                <Text>{this.props.label}</Text>
                <TextInput secureTextEntry={this.props.type==="password"} onChangeText={this.props.handleInput}
                           placeholder={this.props.placeholder}
                           style={this.myTextInputStyles.input}></TextInput>
            </View>
        )
    },
    myTextInputStyles: StyleSheet.create({
        container: {
            //borderBottomWidth: 0.5,
            borderColor: "#CCCCCC",
            padding: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center'

        },
        text: {
            fontSize: 20
        },
        input: {
            marginLeft: 20,
            justifyContent: 'center',
            flexDirection: "row",
            width: 250,
            height: 40,
            borderWidth: 0
        }
    })
});

var LoginForm = React.createClass({
    getInitialState: function () {
        return {
            userName: '',
            password: ''
        }
    },
    handleInput: function (name, text) {
        var newState = {};
        newState[name] = text;
        this.setState(newState);
    },
    handleSubmit: function () {
        alert("提交表单" + this.state.userName + "/" + this.state.password);
    },
    render: function () {
        console.log(this.state);
        return (
            <View style={styles.container}>
                <MyTextInput style={styles.text} name="userName" type="text" label="账号" placeholder="邮箱地址/电话"
                             handleInput={this.handleInput.bind(this,"userName")}></MyTextInput>
                <MyTextInput style={styles.text} name="password" type="password" label="密码" placeholder="请填写密码"
                             handleInput={this.handleInput.bind(this,"password")}></MyTextInput>
                <MyButton handleClick={this.handleSubmit}></MyButton>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F5FCFF',
        borderBottomWidth: 2
    },
    text: {
        height: 50,
        backgroundColor: "#ffffff",
        borderWidth: .5,
        borderColor: '#CCCCCC',
        margin: 20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    center: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
});

AppRegistry.registerComponent('LoginForm', () => LoginForm);
