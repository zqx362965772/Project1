var React = require('react-native');
var DetailView = require('./DetailView');
var MyButton = require('./MyButton');
var dismissKeyboard = require('dismissKeyboard');
var {
    StyleSheet,
    View,
    Text,
    Platform,
    Image,
    ScrollView,
    TextInput,
    AlertIOS,
    Alert
    } = React;

var PublishView2 = React.createClass({
    render: function () {
        return (
            <ScrollView style={this.publishViewStyles.container}>
                <View style={this.publishViewStyles.header}>
                    <Image
                        style={this.publishViewStyles.backgroundImage}
                        source={{
                            //uri:'http://192.168.1.106:8000/background2.jpg'
                            uri:'http://112.126.77.216/gaodezijiayou/background3.jpg'
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
        console.log(this.props.basicData);
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
        if(Platform.OS==='ios'){
            AlertIOS.prompt("城市名", null, null, this.promptResponse);
        }else{
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            )
        }
    },
    handleSubmit: function () {
        var dataItem = {};
        for (var p in this.props.basicData) {
            dataItem[p] = this.props.basicData[p];
        }
        dataItem["cities"] = Array.prototype.join.call(this.state.cities, ',');

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
                        <Text>目标地{i + 1}:<Text style={{color:'#38f'}}>{cities[i]}</Text></Text>
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
            borderWidth:0
        }
    })
});
module.exports = PublishView2;