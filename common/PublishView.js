var React = require('react-native');
var DetailView = require('./DetailView');
var MyButton = require('./MyButton');
var PublishView2 = require('./PublishView2');
var dismissKeyboard = require('dismissKeyboard');
var {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  ScrollView,
  TextInput,
  DatePickerIOS,
  Alert,
  AlertIOS,
  AsyncStorage
  } = React;
var USERNAME_KEY = "@UserName:key";
var PublishView = React.createClass({
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
  render: function () {
    this.getLoginStatus().then(userName=>{
      if(!userName){
        if (Platform.OS === 'ios') {

        } else {
          dismissKeyboard();
          this.props.navigator.push({
            name: 'login'
          });
        }
      }
    })
    return (
      <ScrollView style={this.publishViewStyles.container}>
        <View style={this.publishViewStyles.header}>
          <Image
            style={this.publishViewStyles.backgroundImage}
            source={{
                            uri:'http://112.126.77.216/ZQX_DO_NOT_TOUCH/background1.jpg'
                        }}>
          </Image>
        </View>
        <View>
          <PublishForm navigator={this.props.navigator}/>
        </View>
      </ScrollView>
    )
  },
  publishViewStyles: StyleSheet.create({
    container: {
      backgroundColor: '#ffffff'
    },
    header: {
      height: 180
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
});
var PublishForm = React.createClass({
  getInitialState: function () {
    return {
      //基本信息
      name: '',
      time: '',
      memberMax: 0,
      memberNum: 0,
      startCity: '',
      tel: '',
      remark: '',
      showDatePicker: true,
      imgPath: 'http://m2.quanjing.com/2m/rob_pre003/rob-795-69.jpg',
      //数据库中不用的
      date: new Date(),
      source: 'add'        //传给DetailView标示来源
    }
  },

  handleInput: function (name, text) {
    var newState = {};
    newState[name] = text;
    this.setState(newState);
  },
  onDateChange: function (date) {
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    this.setState({time: time, date: date});
  },
  handleSubmit: function () {
    var self = this;
    var publishData = self.state;
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: self.state.name,
        component: PublishView2,
        passProps: {publishData}
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: "行程规划",
        name: 'publish',
        publishData: publishData
      });
    }
  },
  onDatePickerFocus: function () {
    this.setState({
      showDatePicker: true
    });
  },
  renderDatePiker: function () {
    if (this.state.showDatePicker&&Platform.OS=='ios') {
      return (
        <View style={this.publishFormStyles.datePicker}>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
            onDateChange={this.onDateChange}
          />
        </View>
      )
    }
  },
  render: function () {
    return (
      <View style={this.publishFormStyles.container}>
        <MyTextInput style={this.publishFormStyles.text} name="name" type="text" label="发帖标题"
                     placeholder="不超过10个字符"
                     handleInput={this.handleInput.bind(this,"name")}></MyTextInput>
        <MyTextInput style={this.publishFormStyles.text} name="tel" type="text" label="联系电话"
                     placeholder="请输入数字"
                     handleInput={this.handleInput.bind(this,"tel")}></MyTextInput>
        <MyTextInput style={this.publishFormStyles.text} name="memberMax" type="text" label="需求人数"
                     placeholder="请输入数字"
                     handleInput={this.handleInput.bind(this,"memberMax")}></MyTextInput>
        <MyTextInput style={this.publishFormStyles.text} name="startCity" type="text" label="出发城市"
                     placeholder="请输入城市名"
                     handleInput={this.handleInput.bind(this,"startCity")}></MyTextInput>
        <MyTextInput style={this.publishFormStyles.text} name="remark" type="text" label="详细信息"
                     placeholder="请输入详细信息"
                     handleInput={this.handleInput.bind(this,"remark")}></MyTextInput>
        <MyTextInput style={this.publishFormStyles.text} name="time" type="text" label="出发时间"
                     placeholder="请输入出发时间"
                     handleInput={this.handleInput.bind(this,"time")}
                     handleFocus={this.onDatePickerFocus}
                     handleBlur={this.onDatePickerBlur}
                     value={this.state.time}
        >
        </MyTextInput>
        {this.renderDatePiker()}
        <MyButton handleClick={this.handleSubmit} value="下 一 步"></MyButton>
      </View>
    );
  },
  publishFormStyles: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //padding: 20,
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
  })
});

var MyTextInput = React.createClass({
  render: function () {
    return (
      <View style={this.myTextInputStyles.container}>
        <Text style={{marginLeft:20}}>{this.props.label}</Text>
        <TextInput
          secureTextEntry={this.props.type==="password"}
          onChangeText={this.props.handleInput}
          placeholder={this.props.placeholder}
          style={this.myTextInputStyles.input}
          onFocus={this.props.handleFocus}
          onBlur={this.props.handleBlur}
          value={this.props.value}
        >
        </TextInput>
      </View>
    )
  },
  myTextInputStyles: StyleSheet.create({
    container: {
      borderBottomWidth: 0.5,
      borderColor: "#CCCCCC",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
    },
    text: {
      fontSize: 12
    },
    input: {
      marginLeft: 20,
      justifyContent: 'center',
      flexDirection: "row",
      width: 250,
      height: 40,
      fontSize: 14,
      borderWidth: 0
    }
  })
});


module.exports = PublishView;