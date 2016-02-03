var React = require('react-native');
var MyListView = require('./common/MyListView');
var MyTabBar = require('./common/MyTabBar');
var LoginView = require('./common/LoginView');

var {
    AppRegistry,
    NavigatorIOS,
    StyleSheet,
    View,
    ListView,
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image,
    AlertIOS,
    ToolBarIOS
    } = React;

var DriverApp = React.createClass({
    render: function () {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                      title: '欢乐自驾游',
                      component: MyTabBar
                    }}
                />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

AppRegistry.registerComponent('DriverApp', () => DriverApp);

module.exports = DriverApp;
