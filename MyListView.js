var React = require('react-native');
var {
    AppRegistry,
    NavigatorIOS,
    StyleSheet,
    View,
    ListView,
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    Image
    } = React;

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var MyListView = React.createClass({
    getInitialState: function() {
        return {
            //dataSource: ds.cloneWithRows([
            //    {title:"",time:'2016-2-06',process:'3/4'},
            //    {title:"",time:'2016-2-06',process:'3/4'}
            //])
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };
    },
    componentDidMount:function(){
        this.fetchData('');
    },
    fetchData:function(query){
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true
                });
            })
            .done();
    },
    renderSeparator:function(sectionID, rowID, adjacentRowHighlighted){
        var style = this.myListViewStyles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
            <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
        );
    },
    renderRow:function(dataItem){
        return (
            <MyListViewItem
                dataSource = {dataItem}
                />
        )
    },
    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    },
    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={this.renderSeparator}          //分隔线
                />
        );
    },
    myListViewStyles:StyleSheet.create({
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
    getInitialState:function() {
        return {

        }
    },
    handlePress:function(){
        alert("press");
    },
    render:function(){
        var TouchableElement = TouchableHighlight;
        if(Platform.OS==='android'){
            TouchableElement = TouchableNativeFeedback;
        }
        return(
            <View>
                <TouchableElement onPress={this.handlePress}>
                    <View style={this.myListViewItemStyles.row}>
                        <Image
                            source={require('./test.jpg')}
                            style={this.myListViewItemStyles.cellImage}
                            //source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}
                            //style={{width: 50, height: 50}}
                            />
                        <Text>{this.props.dataSource.title}</Text>
                    </View>
                </TouchableElement>
            </View>
        )
    },
    myListViewItemStyles:StyleSheet.create({
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
            marginRight: 10,
        }
    })
});