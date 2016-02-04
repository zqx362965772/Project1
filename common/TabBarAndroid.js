var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    TouchableNativeFeedback,
    Alert
    } = React;
var icon1 ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB6klEQVRoQ+1ZQU7CQBT9vwlsxRt4BD2BeAK9AV3AhCWcgHICcUcmXdQb4AnkBnoDPYJuSzLf/NohlRgdYT4xze+mCRle+95/8yDzEFpyYUt4gBL5b5Ns30SGw2EfEWeI2I+k9so5d5fn+ZrxjDE3ADAAAL7HuL7gVxMxxmQAMIuB/g3GtP7sVgh/bq3NkCeRJMkjALwDQFaWZVEUxdshD03TtNftdlPGA4CTGksM3zl3haPRaI2IlwAwtdYuDiGw+11jzAQA/CTE8InoAY0xxC9QluXpoZPYJTIej8+ccy/HwN8SsdaKJJgXShpfiYTuJZ1IoFJeKLVWoGD8Y1ulom72XxRTa4Vayq9TawUqptYKFGq7TK0VqJhaK1Aotda+Qul/rVDlNLUCldLUChRKU2tfoTS1QpXT1ApUSlMrUChNrX2Fal9qSZzGs7qSqdU87ed+ZIWI1xL9iDQR379U/YhvrIiIW6pss9ncx+xJJCbCjVin0xkgYlVMVY1VrVrUDpFFQcQ1Ec0R8YmfQUQXXLYSEZeuvb9u6h/Wf3aIfkHd6k5qm0V8jgwU24mIFr41Fmmp6k3INfRukztNkmS1XC5fY9MTIdI4Lm1aNnoZ2hRDlIh0GXo0InWQPPPdWnse205HJSL58q0k8gHCTPXH4HmAfwAAAABJRU5ErkJggg==";
var icon2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABwElEQVRoQ93a7U3DQAyA4bcbwAZsACPABjABMAGMAhMAEwAbwATABNAJgA2Qo3N1nO7y1ftwelJ/VEmrPGc7keys2JG12hEHS4AcA1fAqdv0d+AGePCDYB1yAdwlsuYWuNZj1iGy+4c96X8CvMhx65A9d6EpzCsgqWcSoumku92H+QH2LUL8mjgDnlxapTBr4MAaxEdcAvdBbcQwz3o3s1IjQwg1+Zhf4Aj4shKRsYgQI8+STdRaR2QKQh+IWjf/Mq8lZApCz90Ud/hsaQWZg5Brj90EOlMLSHZEC0gRRG1IMURNSFFELUhxRA1IFURpSDVESUhVRClIdUQJSBNEbkgzRE5IU0QuSHNEDogJxLYQM4htIKYQcyHmEHMgJhFTIWYRUyCmEWMh5hFjIItADEEWg+iDLAqRgiwOEYNIt/vbtSOTXT13fAo47HBm/x52GqVR/DgCYgoRi4i06mUUrCsWFXOIGOTNDU/80PsYk4gQIrO4z0TyCkaWzryH6id7DQz9oV8j/m73/c4cIoyIjLHOB+QmESFE0qob9Xrrww3s5e0C+chc2+TyU0tel9CpqV54NzFdwmoxsSqyLzsD+QOQ660z0M9hPQAAAABJRU5ErkJggg==';
var icon3 ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADeUlEQVRoQ+2ZjZFMQRSFz0ZgRcBGgAgQASJABIgAESACRIAI1kawKwJEgAioT/VRXeO9fq/73p1hartqy0yZ7nfPPef+9TvQnqyDPcGhCyALTF6XdFPSoSQ+s87K34mk79lKyGbkkaTHkq42DAXEE0lvMsFkAcHzx5X3v0p6XzwPEyyYuVWY4jtA3kr6mAEoAwggTgsLnwojLeNg7EVlPIAfRuWWAeSlJCQFCDy+Rv9Ij9+y91Jh5XaEmSgQDPpcDDiS9KXTGPYjPcAAZFhmUSCWCVp/0AnCP38m6amkD5LuDp4RriPo+07R+GgWIgkQY0jy8q6AIAXqRUgWkn4WAMMKGd5YHown8eh/D4RAvSbpRgnaUWXsnJEMaTnz/SgtzZAzotJysN8rlXzECOoJXQE9GJ+HVhSIU+dzSXweWT7jVekKRs4Ip98Mb1qeEVbDQCiCrwM1gD7tW6Fgp0CcfmnL6ZtG1j9R2Z02R/osg86QZ1haGfq2PCP9WhiIjaAwknV6+y320zBSS5hJevf/kXI0/XKQWQEMFb5nWZqhGsIDM4BwDp0rMwXd65rBij3uehmLWzP+KsdkAUES9yX1FEZPlqFCaJRZQJx5YIMMtsQK9YPJkn8jGS81RnyYYwV2CNzWelemwXBsZDPCeWaFz3M3IzBAJ+CRNoWNzGC3Y5yF+M5FBFWbWZzFSMx3Bza3Lr6FXBXQrR9lxcgmEIxk4JpazB1kuDRZnScjOIhixy2LAWE48QNTzB8jdWeWlExGXBeWHFR3vNEROT1rEehkIoxcUxc8WcIKnfPwxVxW1oIFrkvry7k1RdGtu+1AcjjAF97dwT8qLao4xtczNtmJzMRqXQ/Vabrewz6Y8S19F5geIMjG7z/4zCID8WDaDYLYbQf/t+nlTfbMHOmYpIBjyGYsOgPOgqWlLuH3hrVAAIAcDIBGj+9+B1J7rwYz59Up+XE2hbLOdIDgOQBqriUgHE4QW0KkUA5eCk57mX1Ov9QW9pm9lmHs4zlcx1pyzPSz7LSA1G+hkBDUw8A2FwwhUSRHIiD2JsG0gFgiyAgP9b77yAIMuzB5pZXa54DUL3CiF9QZgOpMN9lozgExG6GXLxkIqjNcRCcL7hwQzxahC4FkIL7omGw254DU7XiyPSnH/WX33gNJcds2D1kqiNu0JfSsCyAh953D5l/GfskzIOpAgQAAAABJRU5ErkJggg==';
var TabBarAndroid = React.createClass({

    render: function () {
        return (
            <View style={[this.tabBarAndroidStyles.container,this.props.style]}>
                <View style={this.tabBarAndroidStyles.tabBlock}>
                    <TouchableNativeFeedback onPress={this.props.handlePress[0]}>
                        <View>
                            <Image style={{height:35,width:35}} source={{uri:icon1}}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={this.tabBarAndroidStyles.tabBlock}>
                    <TouchableNativeFeedback onPress={this.props.handlePress[1]}>
                        <View>
                            <Image style={{height:35,width:35}} source={{uri:icon2}}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={this.tabBarAndroidStyles.tabBlock}>
                    <TouchableNativeFeedback onPress={this.props.handlePress[2]}>
                        <View>
                            <Image style={{height:35,width:35}} source={{uri:icon3}}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    },
    tabBarAndroidStyles: StyleSheet.create({
        container: {
            flex: .1,
            justifyContent: 'flex-end',
            backgroundColor: 'F0F0F0',
            flexDirection: 'row',
            borderTopWidth: .5,
            borderColor: '#CCCCCC'
        },
        tabBlock: {
            flex: 1,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
});
module.exports = TabBarAndroid;