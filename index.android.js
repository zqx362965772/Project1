var React = require('react-native');
var MyListView = require('./common/MyListView');
var DetailView = require('./common/DetailView');
var TabBarAndroid = require("./common/TabBarAndroid");
var PublishView = require("./common/PublishView");
var UserView = require('./common/UserView');
var LoginView = require('./common/LoginView');
var {
    AppRegistry,
    Navigator,
    StyleSheet,
    View,
    Text,
    BackAndroid,
    ToolbarAndroid,
    ScrollView,
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
    if (route.name === 'listView') {
        return (
            <IndexView navigator = {navigationOperations}/>
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
                    title={route.journey.name}/>
                <DetailView
                    style={{flex: 1}}
                    navigator={navigationOperations}
                    dataItem={route.journey}
                />
            </View>
        );
    }else if(route.name = 'login'){
        return (
            <LoginView />
        )
    }
};
var IndexView = React.createClass({
    getInitialState: function () {
        return({
            component:<IndexListView navigator={this.props.navigator} />
        })
    },
    handlePress1:function(){
        this.setState({
            component:<IndexListView navigator={this.props.navigator} />
        })
    },
    handlePress2:function(){
        this.setState({
            component:<PublishView />
        })
    },
    handlePress3:function(){
        this.setState({
            component:<UserView navigator={this.props.navigator}/>
        })
    },
    render: function () {
        return (
            <View style={{flex:1}}>
                {this.state.component}
                <TabBarAndroid handlePress={[this.handlePress1,this.handlePress2,this.handlePress3]}/>
            </View>
        )
    }
});
var IndexListView = React.createClass({
    render:function(){
        return (
            <ScrollView>
                <View>
                    <View style={{height:56,alignItems:'center',justifyContent:'center',backgroundColor: '#38f'}}>
                        <Text style={{height:30,fontSize:18,color:'#ffffff'}}>欢乐自驾游</Text>
                    </View>
                    <MyListView navigator={this.props.navigator}/>
                </View>
            </ScrollView>
        )
    }
});
var DriverApp = React.createClass({
    render: function () {
        var initialRoute = {name: 'listView'};
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
