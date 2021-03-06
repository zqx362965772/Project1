var React = require('react-native');
var Button = require('react-native-button');
var MyButton = require('./MyButton');
var dismissKeyboard = require('dismissKeyboard');

var {
  StyleSheet,
  View,
  Text,
  Platform,
  Alert,
  Image,
  ScrollView,
  WebView,
  } = React;
var USERNAME_KEY = "@UserName:key";
var ADD_REQUEST = "http://112.126.77.216/gaodezijiayou/travelAdd.action";
var Favorite_REQUEST = "http://112.126.77.216/gaodezijiayou/favoriteAdd.action";
var Join_REQUEST = "http://112.126.77.216/gaodezijiayou/favoriteAdd.action"
var DetailView = React.createClass({
  async getLoginStatus() {
    var value = null;
    try {
      value = await AsyncStorage.getItem(USERNAME_KEY);
    } catch (error) {
      //console.log('AsyncStorage error: ' + error.message);
      Alert.alert(error.message);
    }
    return value;
  },
  handleFavoriteClick: function () {
    try{
      this.getLoginStatus().then(userName=>{
        fetch(Favorite_REQUEST+'?travelId='+this.props.dataItem.id+'&username='+userName).then((res)=>{
          Alert.alert('收藏成功!');
        })
      });
    }catch(e){
      Alert.alert(e.message);
    }
  },
  handleJoinClick: function () {
    try{
      this.getLoginStatus().then(userName=>{
        fetch(Favorite_REQUEST+'?travelId='+this.props.dataItem.id+'&username='+userName).then((res)=>{
          Alert.alert('收藏成功!');
        })
      });
    }catch(e){
      Alert.alert(e.message);
    }
  },
  handleAdd: function () {
    var postData = JSON.parse(JSON.stringify(this.props.dataItem));
    console.log(postData);
    var url = ADD_REQUEST + "?";
    postData.username = "AAA";
    Array.prototype.join.call(postData.cities, ',');
    console.log(postData);
    for (var k in postData) {
      url += "&" + k + "=" + postData[k];
    }
    console.log(url);
    fetch(url, {
      method: 'GET',
      header: {}
      //body:JSON.stringify(postData)
    }).then((response)=> {
      var self = this;
      var publishData = self.state;
      if (Platform.OS === 'ios') {

      } else {
        dismissKeyboard();
        this.props.navigator.push({
          title: "行程规划",
          name: 'listView'
        });
      }
      console.log(response);
    }).done();
  },
  renderFooter: function () {
    //从添加页面和列表页面渲染不一样的button
    if (this.props.dataItem.source === 'add') {
      return (
        <MyButton handleClick={this.handleAdd} value="确认提交"></MyButton>
      )
    }
    return (
      <View style={this.detailViewStyles.footer}>
        <View style={this.detailViewStyles.footerContainer}>
          <View style={this.detailViewStyles.footerLRView}>
            <Button onPress={this.handleFavoriteClick} style={this.detailViewStyles.footerLRButton}>收藏</Button>
          </View>
          <View style={this.detailViewStyles.footerCenterView}>
            <Button onPress={this.handleJoinClick}
                    style={this.detailViewStyles.footerCenterButton}>加入同行</Button>
          </View>
        </View>
      </View>
    )
  },
  renderCities: function () {
    var cityArr = this.props.dataItem.cities.split(',');
    var str = cityArr[0];
    for (var i = 1; i < cityArr.length; i++) {
      str += " -> " + cityArr[i];
    }
    return str;
  },
  render: function () {
    console.log(this.props.dataItem);
    var journey = this.props.dataItem;
    return (
      <View style={{flex:1}}>
        <ScrollView
          contentContainerStyle={Platform.OS==='ios'?this.detailViewStyles.contentContainer:{}}
          style={Platform.OS==='ios'?{}:this.detailViewStyles.contentContainer}
        >
          <View style={this.detailViewStyles.headSection}>
            <Image
              source={{uri:journey.imgPath}}
              style={this.detailViewStyles.image}
            />


            <View style={{flex:1}}>
              <Text style={this.detailViewStyles.castTitle}>{journey.name}</Text>
              <Text style={this.detailViewStyles.detailInfo}>
                {this.renderCities()}
              </Text>
              <View style={{height:20}}></View>
              <Text style={this.detailViewStyles.otherInfo}>发起人:{journey.creator}</Text>
              <Text style={this.detailViewStyles.otherInfo}>联系电话:{journey.tel}</Text>
              <Text style={this.detailViewStyles.otherInfo}>出发日期:{journey.time}</Text>
              <Text style={this.detailViewStyles.otherInfo}>需求人数:{journey.memberMax}</Text>
            </View>
          </View>
          <View style={this.detailViewStyles.grayLine}></View>
          <View style={this.detailViewStyles.remark}>
            <Text style={this.detailViewStyles.blueText}>具体信息：</Text>
            <Text>{journey.remark}</Text>
          </View>
          <View style={this.detailViewStyles.grayLine}></View>
          <View>
            <Text style={this.detailViewStyles.blueText}>地图定位：</Text>
          </View>
          <WebView
            style={{height:300}}
            url={
                            "http://112.126.77.216/ZQX_DO_NOT_TOUCH/map.html?cities="+journey.cities
                        }
            javaScriptEnabledAndroid={true}
          />

          <View style={{height:50}}></View>
        </ScrollView>

        {this.renderFooter()}
      </View>
    );
  },
  detailViewStyles: StyleSheet.create({
    footerLRView: {
      height: 50,
      width: 90,
      justifyContent: 'center',
      backgroundColor: '#FFB90F'
    },
    footerLRButton: {
      width: 90,
      backgroundColor: '#FFB90F',
      color: "#ffffff",
      justifyContent: 'center',
      textAlign: 'center'
    },
    footerCenterView: {
      flex: 1,
      height: 50,
      justifyContent: 'center',
      backgroundColor: '#38f'

    },
    footerCenterButton: {
      textAlign: 'center',
      //height:50,
      backgroundColor: '#38f',
      justifyContent: 'flex-end',
      color: "#ffffff"
      //padding:10
    },
    footer: {
      flex: .1,
      //alignItems:'flex-end',
      justifyContent: 'flex-end'
    },
    footerContainer: {
      height: 50,
      borderTopWidth: .5,
      borderColor: '#CCCCCC',
      backgroundColor: '#F0F0F0',
      //alignItems:'flex-start',
      flexDirection: 'row'
    },
    footerButton: {
      height: 50,
      backgroundColor: "#02B300",
      width: 100,
      color: "#ffffff",
      justifyContent: 'center',
      padding: 10,
    },
    blueText: {
      fontWeight: '600',
      color: '#38f',
      marginBottom: 5
    },
    remark: {
      //height:200
    },
    grayLine: {
      marginTop: 10,
      marginBottom: 10,
      height: 0.5,
      borderWidth: 0,
      backgroundColor: "#CCCCCC"
    },
    otherInfo: {
      marginTop: 10
    },
    contentContainer: {
      flex: .9,
      padding: 10,
      //height:200
    },
    headSection: {
      flexDirection: 'row'
    },
    image: {
      width: 134,
      height: 200,
      backgroundColor: '#eaeaea',
      marginRight: 10,
    },
    castTitle: {
      fontWeight: '500',
      fontSize: 22,
      marginBottom: 3,
    },
    detailInfo: {
      //borderColor: '#000000',
      //borderWidth: .5,
      color: "#38f",
      //flex: 1,
      //marginBottom: 2,
      //width:100
      fontWeight: '900',
      maxWidth: 180
    }
  })
});

module.exports = DetailView;
