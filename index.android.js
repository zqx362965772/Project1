var React = require('react-native');
var MyListView = require('./common/MyListView');
var DetailView = require('./common/DetailView');
var {
    AppRegistry,
    Navigator,
    StyleSheet,
    View,
    ListView,
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image,
    BackAndroid,
    ToolbarAndroid,
    ScrollView
    } = React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

var RouteMapper = function (route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    if (route.name === 'search') {
        return (
            <ScrollView>
                <View style={{height:56,alignItems:'center',justifyContent:'center',backgroundColor: '#38f'}}>
                    <Text style={{height:30,fontSize:18,color:'#ffffff'}}>欢乐自驾游</Text>
                </View>
                <MyListView navigator={navigationOperations} />
            </ScrollView>
        );
    } else if (route.name === 'journey') {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid
                    actions={[]}
                    //navIcon={require('image!android_back_white')}
                    onIconClicked={navigationOperations.pop}
                    style={styles.toolbar}
                    titleColor="white"
                    title={route.journey.name} />
                <DetailView
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    dataItem={route.journey}
                    />
            </View>
        );
    }
};

var DriverApp = React.createClass({
    render: function () {
        var initialRoute = {name: 'search'};
        return (
            <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={RouteMapper}
                />
        );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    toolbar: {
        backgroundColor: '#38f',
        height: 56
    }
});

AppRegistry.registerComponent('DriverApp', () => DriverApp);

module.exports = DriverApp;
