var React = require('react-native');
var LocationView = require('./LocationView');
var LoginView = require('./LoginView');
var dismissKeyboard = require('dismissKeyboard');
var {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
  ScrollView,
  AsyncStorage,
  Alert
  } = React;

var myJourneyIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACi0lEQVRoQ+1ZMWhTQRj+rkmFklp1EMlSU4mlXSQRLZQOxtTduDlWcBGs2MHJQRycK12yiEI3p6Z700akCEFMcNAqRZ+gRQhiikKxTfLLixXfa+5x7457JA8vWy533/99//f/f+COIeQfFnL++D8FLK29yDBqPbHdI9Z37crFyZKKkzpwlBxYKq5bjOHkPmkrl50aURKgAUdJQGF1nZyEc9mpruF4Bt7JpBKNyKF5RkiBIeEkvHJ33pXwSw/mVAyAEIdgEUM12tydGyhVLV4QroA2+b7+CmPs6MFDjUYTpXsLruXM/VuIRiNSImRwiKgebe2leSK4An5MTxQYcJnH6M3nb9jKL7p+Gr45g9H4MSkBsjgELB8ulnMHg/AFZM9/52XfPvz83RZ+LT514cRmrmLydFxKgDQOwRpcLXcMC66An9MTriZ1MmsHzj8GYrE/y7UaYndm1QRI4gwWyx18pQXY1teGk9i7fqPNv/9RHvEvH5RKSBZHiwC7+d5/rWN7ZxeNFuHE0ABOHR9SamJZHC0CpApd82YjQHNCpeF8O1DZ2PScQtJRNR5IjyX9TSEjQGPWnVDGgb/ZePbytSvHF86daX/Xte5loDYHdBH1wjECRFMo9A4ENGSEsNp6QBgpoA3aBIS+hIwAwf+GGaOiMRpQjwphtTWxMFJAG7QJME1smvhfjXLvhURNHPoSCqhHhbDamlgYKaANvgW82tisM+BIQDyUYInw6ex40vVOYQN59UABHtfrStH1HFpOjyX9Xa9X3n5MEGtWe8UFArYZRVLp8ZGOVxrPJyZbBFjzIRFSjgc9Pbn0iWKXDWOogiK3eeQ9S8gnfk9sU3pd7Anm+ySMgG67YRzotgO/AZIZzkCtt5PGAAAAAElFTkSuQmCC";
var favoriteIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEcklEQVRoQ+1ZPXAbRRT+3p1lWdYZlHSpSFKSAplBaqPI6RhmTJEuM9CEkpiGGarIFWUc0pEmmaFzQSjokHJpJQbLRVI6ckM6EFiOfu8es3eSLZ1Od7t3F3syw5bSe2+/b9/Pvn1HeMcXveP48T+BiQc7pUIeOq4zqETgHIAcQHn3f24CaDOoTWATFp4bZkP8FnvF8kC3lL9saam7AG2CcFkJDaMF8FPdHj7ImM2Wku6UcCQCY+D3QPRl1I1n9Jgf6/ZwOwoRZQKdcuE+iLYSAe4xQoxKtlbfVrEtTYBL+dyxnnp2Gtcq26jIcjNrDW+Q2WzLaEkRcBJUo5+V41wGgZ+MyA+bP5dJ9FACAjxreEZEorKc2WLmNtm4EUYikIATNtry3pmdvPd4GK2sPVgPCqdAAp2Nwl6cmNevjhxI1sFSDM9x06g21hcZWEigUy7sgOhujJ2RuXMMBtB7lI1jBszYXqvVK35GfAk4dV5ffhVnV3H6K3feOCZ6j1ZjegHQrcEVv3vCl0Bno/AYoC/iEBCnr121xiGkx/YCwE+MamPu4pwjkPTpTw7hbXlhjkBSsT85/QkB6yABLzA/MGqNmS7Ah0DxVZyyOR373hCM7QVGy6jVr0zbnSHgtsS0l1Tse+0k4gWL16cvt1kC5U+2QNr9MAJ0wQblbOiXLCADiFPXcjbooiia4Yv/Ithtza1MXcB6rYPbGvhvTULZ/sao/b4zEZwhcFQumER0fZEV7dIIma/d0vi2VveHVdivF198DPyyVq1vRiIglJY+HiD9WQ9YSZhCD+jtZmC9TAUaZubna7VGyZeAbOvgeOKrN8mR6AHdH4NP/pTVbGsxmwMbRbkgBpAYCSXwLg2jWj/BHZmAMBSbRATwwQTKxSYIH6lEd2QSEcGDsW/U6uNpB2bnQmFVaBExJ7Fv9VR4o7+7gtEfy0o6QjgwiaMSWN7oI3WzrwRm+Fsag2paScchEFRGO5IXmXfXldvH0K+5nafssl7o6P0U4Z3AARdZ1FZi9dsj0AXpAuZwtP/U0H1oyPI9lQtqJYRUp1xsgfCBiuXs9/+qiJ/IHn/3npoe49Co1WcmgLHb6UXdpwiR/q8ZB2D6065viCl3pzLttOqDxluB7APdSU7vQ14QFck+/U5QrUR+z8rYT8pJBVoE3Bsj00TUKpHkk1JsqOKF9K0uRi+WQpuwOSIfDrF0bYT+rhtmYUvpUe8mc/yxShgo2f+VxyoTw50IrYUsKGk5T+vg1ZMZLYr+SKmsSoMLE2QcZu1BPvJo0QklMdzVYRLo/bD9kvyfwf+QhVKs4e5JKLnj9adn5gnGIWzeDAMv8IWO1yckxpNqU7XdVvYKYz9rD0qJfuCYBnFULlaIcE8ZmIRCULVZpC7tgWkD7j2RqsSdn57a5Ce6NaycyUe+OSJaamv8mVWtUok4dz+z7kQBPsERyQN+7nS/o3GJSSuBOUeg3Em+MPYZ3AZRm9g2YZMpk6ASUSefxDLGzkMmMQ+cB3ilMnpeAMP2/Q/EbAxP70JGeAAAAABJRU5ErkJggg==";
var locationIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFIklEQVRoQ+2ZX0xbVRzHv6d/1hILdGZIlrhK0cUtk2wjPjFDwce5IWj7oMbAfFHjg50x2+PYi8kWk9UYk/lgxqLRGGhgQ/colGx70IVB0GzGSWdnskwWKQxDgfYe87t4y+3tve09t7fBJTsJ4aHnnN/v8/t3zvldhod8sIdcfzwC2GwP2ueB4bEm5BwvA7wDgB8cfjC2TwbkfAoMaYD+2Dic0gX0dN62A74ygOExPyTH+5B4d15Zs1oRlIONwCF9gp5OgrM0rAEoinMeBZjfkuT8Ip4GYzGrIOIA8Yk+cOlM5YprsXkacBxBuH1ExCBiAPHECXD06wmodzlwwO/DwYY6BLxbEKhxy/9ppDKrSC2vyf8vzS3iSnoJC1lJX0+GfrwaOmkWwhwAhUyOkdX7tBsHvG4cCzbi9e1bzcqU5319dx6nk/eQyqzprOMDcPKjZnLDHMDQ+Dmt8mTxY02NeDewTUhx7eRTyb9w9s6cjkf4AMIdR8ptXh5gMNEPhhPqjUj5i/ub0VJbU3L/TOx5+Xdv9FrJeTMPltF1fbYYguMkIiHdkFU2LA0gJyw/p5be4vPiYmsz6l3OcsaBWQDaaCGbQ9fkLGaWMpp9WU+pxDYGWI/7pLrakOWn2naZUp60EAFQIPZdvanxBE/DyYNG+WAMoAkds2GjNp8oAK3VDacSoaQPoGP9j3Zuxzs7xBLWCgBBnEreAyX3xjD2gj6AxvpUKil0RIdVAJJDoVRQYg28YAAwfl19t/ls95N4TbDOW8kBtYG+uTuP9278qXICn0KkY7/WiMUA67fKpDKRYj/ZvkfU+PL8SjxA64MTvxQmtFOiZC64xRYDDE5EwfgZReOXGurwZctTmwLw5swf+H5uUeUFdhSR9phaGR2AxDgYQsokq+FjhweKwwgXEAl1CwGMtjbjgP+xTfHAlfQ/ODw5q/IAEoiE6MGUHzoeKEzg6bZd2OF1CwPkbo1h7bsP5XXuQx/D+Uyn8B50JoR+ulUykYsBhhJcLenvF1uEBdOClS8O4ZWGXjBwxOe/hac3bmmfx3+YKVwXDhXoXHUAkh6fPQ3PG1+BNTwrDGEBYHwKYHsVSZWEUPbyp+DpFD3qAW8tPOHPhSB+Xsqg/cffVNB8GuGO9UbBf6NsFaokiUkGn/sVK4NvA6tLgMcnBGExie0ro4qVrEJYLKP2HWRqV1uBsHaQ2XiV0GasFsL71ijgqTVM7KIENnWVoO2GChO5ktPYCMId+gDOPV2GyheFD4oTmBZX9TptqN3Kg5KWp3WVXafpQZNlt8FYvaLE8eATOB5sFK7jVhYUPWg4X4CLN+k9K4WelKOtT+M5n9eKTqbXUO0/PPl74TVa+ElJ4nS8QG+D6bbdqHM5TCskMnExK2Hv1Rsa5Y2tb5wDitShiW6AD6uVoLYKecJuCFKeLG9fW0XR2qCxZWc46YaNfIxX2tjKeyIxAKBX7QkKJ+pSVJrYlLBn79zXa/aeRzhU1IvVhmT51qKSDzkHPeUKIOgn6lgQhOijn+o8Ka/f3MV5OKWofc3dEuGk/EQeeWGrDwe31SFQs0Xu3ikVi0KEWoep5VVcur+Iy/Ml2usmwkbtBXMeUK+gfqkkxdRnhEilMZxLtZ45+qr7gUORLpdYRxTg0YpBSHGwGFxSzEzIWMsBI7MpIIx3qx9B5jzCp8HZiFXFFRniIWQM04Ssk86N9c+sjPs3oGRlNz6zunIj/4/PrOZMXdVZ9nmgqmoab/4IYJMMnxf7L+PPaU9XCHipAAAAAElFTkSuQmCC";
var aboutIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmElEQVRoQ+2ZsU7DMBCG7yQUBpKInSXlCUAqOwxM8AhIlJF0oLwCfQC6NIy0KzwCAwNiBhbYqB8AJESjSkWoh1KBBI3TpDI4Nrqsie3/8/+fLV0QLH/Qcv3AAGU7yA4Y70AQxbtA1ECEFZ1iieAWEFsidLvT1s2MUHBMi+DEl7qFT4odg7y5G+IQX2Qg2QDt/k3Z4r8EJxCi7q0WBgjacQ2RTnVGJm8tItwTdbcz+Z3UgcCg3c9zQQpQifqUtyNlvO+FXkovA2Q5sVmZg4OqA/48QvN6CBe9d2XTtDpwtbMAS5+O3z+NYPt8YC/Aw/MIts4sA0gi1FhzwHcQjmyMkHJeJBNorQEGKNuBx333h4Tlk1jZFK0RYgCOkGJiOUIcIY4Q3wOpDPBFplgWysO1OqCstuxjlAH+mwMEcCdCL9VgtqYvNFNr0bTOXNbuJykz3oFEPAzd9Zna6yY4MBZO2JJ1pL/Xd2EHCKgrQr/2F8ejypyFAEwVX6gGTBafC2C6+KkANojPBAii146JBSsrdv5Tr3IE/sbYD0QlDUBnooJhAAAAAElFTkSuQmCC";
var USERNAME_KEY = "@UserName:key";
var UserView = React.createClass({

  getInitialState: function () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return ({
      userInfoComponent: <TouchableElement onPress={this.redirectLogin}>
        <View style={this.userViewStyles.row}>
          <Image
            source={{uri:"http://img5q.duitang.com/uploads/item/201408/01/20140801184647_8iN3s.jpeg"}}
            style={this.userViewStyles.photo}
          />
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={[this.userViewStyles.userInfoText,{color:'#38f'}]}>请 登 录</Text>
          </View>
        </View>
      </TouchableElement>,
      userName: ""
    })
  },
  onLocationSelect: function () {
    var data = {username: "Taylor", JourneyId: 1};
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: "实时定位",
        component: LocationView,
        callback: this.navigatorCallback,
        passProps: data
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: "实时定位",
        name: 'locationShare',
        journey: data
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
  renderUserInfo: function () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    var self = this;
    this.getLoginStatus().then(function (userName) {
      if (userName) {
        var component =
          <TouchableElement onPress={self.redirectUserInfo}>
            <View style={self.userViewStyles.row}>
              <Image
                source={{uri:"http://img5q.duitang.com/uploads/item/201408/01/20140801184647_8iN3s.jpeg"}}
                style={self.userViewStyles.photo}
              />
              <View>
                <Text style={self.userViewStyles.userInfoText}>用户名:{userName}</Text>
                <Text style={{color:'#38f',fontWeight:"500",fontSize:10,marginTop:5}}>普通会员</Text>
              </View>
            </View>
          </TouchableElement>;
        self.setState({userInfoComponent: component, userName: userName});
      }
    }).done();
  },
  redirectUserInfo: function () {
    if (Platform.OS === 'ios') {

    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: "个人资料",
        name: 'register',
        source:'userView'
      });
    }
  },
  redirectLogin: function () {
    var navigator = this.props.navigator;
    var self = this;
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        component: LoginView,
        passProps: {navigator: navigator, callback: self.renderUserInfo}
      });
    } else {
      dismissKeyboard();
      this.props.navigator.push({
        title: "用户登录",
        name: 'login',
        navigator: navigator,
        callback: self.renderUserInfo
      });
    }
  },
  componentWillMount: function () {
    this.renderUserInfo();
  },
  onMyJourneySelect(){
    if (Platform.OS === 'ios') {

    } else {
      dismissKeyboard();
      this.props.navigator.push({
        name: 'myJourney',
        source:'userView'
      });
    }
  },
  render: function () {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <ScrollView style={this.userViewStyles.container}>
        <View style={this.userViewStyles.touchView}>
          {this.state.userInfoComponent}
        </View>

        <View style={this.userViewStyles.touchView}>
          <TouchableElement onPress={this.onMyJourneySelect}>
            <View style={this.userViewStyles.row}>
              <Image
                source={{uri:myJourneyIcon}}
                style={this.userViewStyles.listIcon}
              />
              <View>
                <Text style={this.userViewStyles.listItemText}>我的自驾游</Text>
              </View>
            </View>
          </TouchableElement>
          <TouchableElement>
            <View style={this.userViewStyles.row}>
              <Image
                source={{uri:favoriteIcon}}
                style={this.userViewStyles.listIcon}
              />
              <View>
                <Text style={this.userViewStyles.listItemText}>我的收藏</Text>
              </View>
            </View>
          </TouchableElement>
          <TouchableElement onPress={this.onLocationSelect}>
            <View style={this.userViewStyles.row}>
              <Image
                source={{uri:locationIcon}}
                style={this.userViewStyles.listIcon}
              />
              <View>
                <Text style={this.userViewStyles.listItemText}>实时定位</Text>
              </View>
            </View>
          </TouchableElement>
        </View>
        <View style={this.userViewStyles.touchView}>
          <TouchableElement>
            <View style={this.userViewStyles.row}>
              <Image
                source={{uri:aboutIcon}}
                style={this.userViewStyles.listIcon}
              />
              <View>
                <Text style={this.userViewStyles.listItemText}>关于我们</Text>
              </View>
            </View>
          </TouchableElement>
        </View>
      </ScrollView>
    )
  },
  userViewStyles: StyleSheet.create({
    container: {
      backgroundColor: '#F0F0F0'
    },
    row: {
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 5,
      borderBottomWidth: .5,
      borderColor: "#CCCCCC"
    },
    touchView: {
      marginTop: 30
    },
    photo: {
      width: 65,
      height: 65,
      margin: 10,
      borderRadius: 10
    },
    userInfoText: {
      marginTop: 7,
      fontWeight: "400"
    },
    listIcon: {
      width: 30,
      height: 30,
      margin: 2
    },
    listItemText: {
      marginLeft: 10,
      fontSize: 14,
      fontWeight: "400"
    }
  })
});
module.exports = UserView;