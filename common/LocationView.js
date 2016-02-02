var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image,
    ScrollView,
    WebView,
    } = React;


var LocationView = React.createClass({
    render: function () {
        return (
            <ScrollView style={this.userViewStyles.container}>
                <WebView
                    style={{height:550}}
                    url={"http://112.126.77.216/gaodezijiayou/location.html?username=qingxin.zheng&journeyId=1"}
                    javaScriptEnabledAndroid={true}
                    />
            </ScrollView>
        )
    },
    userViewStyles: StyleSheet.create({
        container: {
            backgroundColor: '#F0F0F0'
        }
    })
});
module.exports = LocationView;