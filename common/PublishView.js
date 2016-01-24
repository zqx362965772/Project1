var React = require('react-native');
var Button = require('react-native-button');
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
    TouchableOpacity
    } = React;

var PublishView = React.createClass({
    render:function(){
        return (
            <ScrollView style={this.publishViewStyles.container}>
                <View style={this.publishViewStyles.header}>
                    <Image
                        style={this.publishViewStyles.backgroundImage}
                        source={{uri:'http://192.168.1.106:8000/background1.jpg'}}>
                        <Button>aaa</Button>
                        <View style={{width:20,height:20,backgroundColor:'red'}}></View>
                    </Image>
                </View>
            </ScrollView>
        )
    },
    publishViewStyles:StyleSheet.create({
        container:{
            backgroundColor:'#ffffff'
        },
        header:{
            height:180
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // or 'stretch'
            alignItems:'center',
            justifyContent:'center'
        }
    })
});
module.exports = PublishView;