var React = require('react-native');
var MyListView = require('./common/MyListView');
var DetailView = require('./common/DetailView');
var TabBarAndroid = require("./common/TabBarAndroid");
var PublishView = require("./common/PublishView");
var PublishView2 = require("./common/PublishView2");
var UserView = require('./common/UserView');
var LoginView = require('./common/LoginView');
var LocationView = require('./common/LocationView');
var RegisterView = require('./common/RegisterView');

var {
  AppRegistry,
  Navigator,
  StyleSheet,
  View,
  Text,
  BackAndroid,
  ToolbarAndroid,
  ScrollView,
  Alert
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
      <IndexView navigator={navigationOperations} />
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
  } else if (route.name === 'login') {
    return (
      <LoginView navigator={navigationOperations} callback={route.callback}/>
    )
  } else if (route.name === 'locationShare') {
    return (
      <LocationView username="taylor" journeyId="1"/>
    )
  } else if (route.name === 'publish') {
    return (
      <PublishView2 navigator={navigationOperations} publishData={route.publishData}/>
    )
  } else if (route.name === 'userInfo') {
    return (
      <LoginView navigator={navigationOperations} publishData={route.publishData}/>
    )
  } else if (route.name === 'register') {
    return (
      <RegisterView navigator={navigationOperations} source={route.source}/>
    )
  } else if(route.name === 'myJourney'){
    <MyListView navigator={navigationOperations} source={route.source}/>
  }
};
var IndexView = React.createClass({
  getInitialState: function () {
    return ({
      component: <IndexListView navigator={this.props.navigator} source={this.props.source}/>
    })
  },
  handlePress1: function () {
    this.setState({
      component: <IndexListView navigator={this.props.navigator}/>
    })
  },
  handlePress2: function () {
    this.setState({
      component: <PublishView navigator={this.props.navigator}/>
    })
  },
  handlePress3: function () {
    this.setState({
      component: <UserView navigator={this.props.navigator}/>
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
  render: function () {
    return (
      <ScrollView>
        <View>
          <View style={{height:56,alignItems:'center',justifyContent:'center',backgroundColor: '#38f'}}>
            <Text style={{height:30,fontSize:18,color:'#ffffff'}}>{this.props.source === 'userView'?"我参与的":"欢乐自驾游"}</Text>
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
