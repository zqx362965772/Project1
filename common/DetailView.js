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
    } = React;

var DetailView = React.createClass({

    handleClick: function () {
        alert(1)
    },
    handleClick1:function(){
        alert(2);
    },
    render: function () {
        console.log(this.props.dataItem);
        var journey = this.props.dataItem;
        return (
            <View style={{flex:1}}>
                <ScrollView
                    contentContainerStyle={Platform.OS==='ios'?this.detailViewStyles.contentContainer:{}}
                    style={Platform.OS==='ios'?{}:this.detailViewStyles.contentContainer}
                    //automaticallyAdjustContentInsets={false}
                    //onScroll={() => { console.log('onScroll!'); }}
                    //scrollEventThrottle={200}
                    >
                    <View style={this.detailViewStyles.headSection}>
                        <Image
                            source={{uri:journey.imgPath}}
                            style={this.detailViewStyles.image}
                            />
                        <View>
                            <Text style={this.detailViewStyles.castTitle}>{journey.name}</Text>
                            <Text style={this.detailViewStyles.detailInfo}>
                                {journey.startCity}
                                {' '}—>{' '}
                                {journey.endCity}
                            </Text>
                            <View style={{height:20}}></View>
                            <Text style={this.detailViewStyles.otherInfo}>发起人:{journey.creator}</Text>
                            <Text style={this.detailViewStyles.otherInfo}>联系电话:{journey.tel}</Text>
                            <Text style={this.detailViewStyles.otherInfo}>出发日期:{journey.time}</Text>
                            <Text style={this.detailViewStyles.otherInfo}>人数:{journey.process}</Text>
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
                        //url={"http://10.105.50.177:8000/map.html?start="+journey.startCity+'&end='+journey.endCity}
                        url={"http://192.168.1.106:8000/map.html?start="+journey.startCity+'&end='+journey.endCity}
                        javaScriptEnabledAndroid={true}
                        />

                    <View style={{height:50}}></View>
                </ScrollView>

                <View style={this.detailViewStyles.footer}>
                    <View style={this.detailViewStyles.footerContainer}>
                        <View style={this.detailViewStyles.footerLRView}>
                            <Button onPress={this.handleClick} style={this.detailViewStyles.footerLRButton}>收藏</Button>
                        </View>
                        <View style={this.detailViewStyles.footerCenterView}>
                            <Button onPress={this.handleClick1} style={this.detailViewStyles.footerCenterButton}>加入同行</Button>
                        </View>
                        <View style={this.detailViewStyles.footerLRView}>
                            <Button onPress={this.handleClick} style={this.detailViewStyles.footerLRButton}>联系他</Button>
                        </View>
                    </View>
                </View>
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
        footerLRButton:{
            width:90,
            backgroundColor:'#FFB90F',
            color: "#ffffff",
            justifyContent: 'center',
            textAlign:'center'
        },
        footerCenterView:{
            flex:1,
            height:50,
            justifyContent: 'center',
            backgroundColor:'#38f'

        },
        footerCenterButton:{
            textAlign:'center',
            //height:50,
            backgroundColor:'#38f',
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
            alignSelf: 'flex-start',
            borderColor: '#000000',
            borderWidth: .5,
            paddingHorizontal: 3,
            marginVertical: 5,
            color: "#38f"
        }
    })
});

module.exports = DetailView;
