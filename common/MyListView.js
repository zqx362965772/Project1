var React = require('react-native');
var DetailView = require('./DetailView');
var dismissKeyboard = require('dismissKeyboard');
var {
  StyleSheet,
  View,
  ListView,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  Alert
  } = React;

var REQUEST_URL = "http://112.126.77.216/gaodezijiayou/travelQueryAll.action";
var MY_JOURNEY = "http://112.126.77.216/gaodezijiayou/travelUserQueryByUsername.action";

//var REQUEST_URL = "http://192.168.1.106:8000/journeyList.json";
//var REQUEST_URL = "http://10.105.50.177:8000/journeyList.json";

var MyListView = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  },
  componentDidMount: function () {
    this.fetchData();
  },
  onSelect: function (dataItem) {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: dataItem.name,
        component: DetailView,
        passProps: {dataItem}
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: dataItem.name,
        name: 'journey',
        journey: dataItem
      });
    }
  },
  async getLoginStatus() {
    var value = null;
    try {
      value = await AsyncStorage.getItem(USERNAME_KEY);
    } catch (error) {
      //console.log('AsyncStorage error: ' + error.message);
      alert(error.message);
    }
    return value;
  },
  fetchData: function () {
    var userName = this.getLoginStatus();

    if (this.props.source === 'userView') {
      fetch(MY_JOURNEY+'?username='+userName)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true
          });
        })
        .done();
    } else {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.data),
            loaded: true
          });
        })
        .done();
    }
  },
  renderSeparator: function (sectionID, rowID, adjacentRowHighlighted) {
    var style = this.myListViewStyles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, myListViewStyles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={style}/>
    );
  },
  renderRow: function (dataItem) {
    return (
      <MyListViewItem
        dataSource={dataItem}
        onSelect={this.onSelect.bind(this,dataItem)}
      />
    )
  },
  renderLoadingView: function () {
    return (
      <View style={this.myListViewStyles.loading}>
        <Text>
          loading...
        </Text>
      </View>
    );
  },
  render: function () {
    //console.log(this.state.dataSource);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}          //分隔线
      />
    );
  },
  myListViewStyles: StyleSheet.create({
    rowSeparator: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: 1,
      marginLeft: 4
    },
    rowSeparatorHide: {
      opacity: 0.0
    }
  })
});
var MyListViewItem = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement onPress={this.props.onSelect}>
          <View style={this.myListViewItemStyles.row}>
            <Image
              //source={require('../test.jpg')}
              style={this.myListViewItemStyles.cellImage}
              source={{uri:this.props.dataSource.imgPath}}
              //style={{width: 50, height: 50}}
            />
            <View style={this.myListViewItemStyles.textContainer}>
              <Text style={this.myListViewItemStyles.title}>{this.props.dataSource.name}</Text>
              <Text style={this.myListViewItemStyles.time}>{this.props.dataSource.time}
                {' '}&bull;{' '}
                <Text style={this.myListViewItemStyles.rate}>
                  {this.props.dataSource.memberNum + "/" + this.props.dataSource.memberMax}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableElement>
      </View>
    )
  },
  myListViewItemStyles: StyleSheet.create({
    title: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 2,
    },
    time: {
      color: '#999999',
      fontSize: 12
    },
    rate: {
      color: "#02B300"
    },
    textContainer: {
      flex: 1
    },
    row: {
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 5
    },
    cellImage: {
      width: 60,
      height: 80,
      backgroundColor: '#dddddd',
      marginRight: 10
    }
  })
});
module.exports = MyListView;
