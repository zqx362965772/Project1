var React = require('react-native');
var DetailView = require('./DetailView');
var MyButton = require('./MyButton');
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
    TouchableOpacity,
    TextInput,
    DatePickerIOS,
    AlertIOS
    } = React;

var PublishView = React.createClass({
    render: function () {
        return (
            <ScrollView style={this.publishViewStyles.container}>
                <View style={this.publishViewStyles.header}>
                    <Image
                        style={this.publishViewStyles.backgroundImage}
                        source={{
                            //uri:'http://192.168.1.106:8000/background1.jpg'
                            uri:'http://10.105.50.177:8000/background1.jpg'
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
            imgPath:'http://m2.quanjing.com/2m/rob_pre003/rob-795-69.jpg',
            //数据库中不用的
            date: new Date(),
            source:'add'        //传给DetailView标示来源
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
                journey: publishData
            });
        }
    },
    onDatePickerFocus: function () {
        this.setState({
            showDatePicker: true
        });
    },
    renderDatePiker: function () {
        if (this.state.showDatePicker) {
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
            padding: 20,
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

var PublishView2 = React.createClass({
    render: function () {
        return (
            <ScrollView style={this.publishViewStyles.container}>
                <View style={this.publishViewStyles.header}>
                    <Image
                        style={this.publishViewStyles.backgroundImage}
                        source={{
                            //uri:'http://192.168.1.106:8000/background2.jpg'
                            uri:'http://10.105.50.177:8000/background3.jpg'
                        }}>
                    </Image>
                </View>
                <View>
                    <PublishForm2 basicData={this.props.publishData} navigator={this.props.navigator}/>
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

var PublishForm2 = React.createClass({
    getInitialState: function () {
        //基本信息数据：this.props.basicData
        var cities = [this.props.basicData.startCity];
        return {
            cities: cities
        }
    },
    promptResponse: function (data) {
        var newCities = this.state.cities;
        newCities.push(data);
        this.setState({
            cities: newCities
        });
    },
    handleAdd: function () {
        AlertIOS.prompt("城市名", null, null, this.promptResponse);
    },
    handleSubmit:function(){
        var dataItem = {};
        for(var p in this.props.basicData){
            dataItem[p] = this.props.basicData[p];
        }
        dataItem["cities"] = Array.prototype.join.call(this.state.cities,',');

        console.log(dataItem);

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
    renderCities: function () {
        var cities = this.state.cities;
        var rows = [];
        for (var i = 0; i < cities.length; i++) {
            var text =
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text>目标地{i+1}:<Text style={{color:'#38f'}}>{cities[i]}</Text></Text>
                    </View>
                ;
            rows.push(text);
        }
        return rows;
    },
    render: function () {
        console.log(this.state);
        return (
            <View style={this.publishForm2Styles.container}>

                <View style={this.publishForm2Styles.separate}></View>
                <View style={this.publishForm2Styles.subContainer}>
                    {this.renderCities()}
                </View>
                <MyButton handleClick={this.handleAdd} value="添加城市"></MyButton>
                <MyButton handleClick={this.handleSubmit} value="提交行程"></MyButton>

            </View>
        );
    },
    publishForm2Styles: StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20
        },
        subContainer: {
            flex: 1,
            //justifyContent: 'center',
            //alignItems: 'center',
            padding: 20
        },
        separate: {
            height: 10
        }
    })
});

var MyTextInput = React.createClass({
    render: function () {
        return (
            <View style={this.myTextInputStyles.container}>
                <Text>{this.props.label}</Text>
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
            //padding: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center'

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
            fontSize: 14
        }
    })
});


module.exports = PublishView;