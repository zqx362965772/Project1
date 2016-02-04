/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var MyButton = require("./MyButton");
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    AsyncStorage,
    Platform,
    TouchableOpacity
    } = React;
var USERNAME_KEY = "@UserName:key";

var MyTextInput = React.createClass({
    render: function () {
        return (
            <View style={this.myTextInputStyles.container}>
                <Text style={{marginLeft:15}}>{this.props.label}</Text>
                <TextInput secureTextEntry={this.props.type==="password"} onChangeText={this.props.handleInput}
                           placeholder={this.props.placeholder}
                           style={this.myTextInputStyles.input}>
                </TextInput>
            </View>
        )
    },
    myTextInputStyles: StyleSheet.create({
        container: {
            borderBottomWidth: 0.5,
            borderColor: "#CCCCCC",
            //padding: 7,
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

    async setLoginStatus(userName) {
        try {
            await AsyncStorage.setItem(USERNAME_KEY, userName);
        } catch (error) {
            alert('AsyncStorage error: ' + error.message);
        }
    },
    handleSubmit: function () {
        //1.提交服务器
        //2.本地存储
        this.setLoginStatus(this.state.userName);
        //3.关闭页面
        if(this.props.callback){
            this.props.callback();
        }
        this.props.navigator.pop();
    },
    render: function () {
        console.log(this.state);
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={styles.container}>
                <MyTextInput style={styles.text} name="userName" type="text" label="账号" placeholder="邮箱地址/电话"
                             handleInput={this.handleInput.bind(this,"userName")}></MyTextInput>
                <MyTextInput style={styles.text} name="password" type="password" label="密码" placeholder="请填写密码"
                             handleInput={this.handleInput.bind(this,"password")}></MyTextInput>
                <MyButton handleClick={this.handleSubmit} value="登 陆"></MyButton>
                <TouchableOpacity style={[styles.mt30,{justifyContent:'center',alignItems:'center'}]}>
                    <Text style={{color:'#38f'}}>没有账号？立即注册</Text>
                </TouchableOpacity>
            </View>
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
    },

    mt30: {
        marginTop: 30
    }
});

module.exports = LoginForm;