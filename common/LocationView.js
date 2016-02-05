var React = require('react-native');

var {
    StyleSheet,
    ScrollView,
    WebView,
    View
    } = React;


var LocationView = React.createClass({
    render: function () {
        return (
            <View style={this.userViewStyles.container}>
                <WebView
                    style={{height:1000}}
                    url={"http://112.126.77.216/gaodezijiayou/location.html?username=qingxin.zheng&journeyId=1"}
                    javaScriptEnabledAndroid={true}
                    />
            </View>
        )
    },
    userViewStyles: StyleSheet.create({
        container: {
            backgroundColor: '#F0F0F0'
        }
    })
});
module.exports = LocationView;