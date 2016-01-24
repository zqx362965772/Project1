var React = require('react-native');
var MyListView = require('./MyListView');
var PublishView = require('./PublishView');
var UserView = require('./UserView')
var {
    StyleSheet,
    View,
    ListView,
    Text,
    Platform,
    Image,
    TabBarIOS
    } = React;

var icon1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
var icon2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABwElEQVRoQ93a7U3DQAyA4bcbwAZsACPABjABMAGMAhMAEwAbwATABNAJgA2Qo3N1nO7y1ftwelJ/VEmrPGc7keys2JG12hEHS4AcA1fAqdv0d+AGePCDYB1yAdwlsuYWuNZj1iGy+4c96X8CvMhx65A9d6EpzCsgqWcSoumku92H+QH2LUL8mjgDnlxapTBr4MAaxEdcAvdBbcQwz3o3s1IjQwg1+Zhf4Aj4shKRsYgQI8+STdRaR2QKQh+IWjf/Mq8lZApCz90Ud/hsaQWZg5Brj90EOlMLSHZEC0gRRG1IMURNSFFELUhxRA1IFURpSDVESUhVRClIdUQJSBNEbkgzRE5IU0QuSHNEDogJxLYQM4htIKYQcyHmEHMgJhFTIWYRUyCmEWMh5hFjIItADEEWg+iDLAqRgiwOEYNIt/vbtSOTXT13fAo47HBm/x52GqVR/DgCYgoRi4i06mUUrCsWFXOIGOTNDU/80PsYk4gQIrO4z0TyCkaWzryH6id7DQz9oV8j/m73/c4cIoyIjLHOB+QmESFE0qob9Xrrww3s5e0C+chc2+TyU0tel9CpqV54NzFdwmoxsSqyLzsD+QOQ660z0M9hPQAAAABJRU5ErkJggg==';
var icon3 ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADeUlEQVRoQ+2ZjZFMQRSFz0ZgRcBGgAgQASJABIgAESACRIAI1kawKwJEgAioT/VRXeO9fq/73p1hartqy0yZ7nfPPef+9TvQnqyDPcGhCyALTF6XdFPSoSQ+s87K34mk79lKyGbkkaTHkq42DAXEE0lvMsFkAcHzx5X3v0p6XzwPEyyYuVWY4jtA3kr6mAEoAwggTgsLnwojLeNg7EVlPIAfRuWWAeSlJCQFCDy+Rv9Ij9+y91Jh5XaEmSgQDPpcDDiS9KXTGPYjPcAAZFhmUSCWCVp/0AnCP38m6amkD5LuDp4RriPo+07R+GgWIgkQY0jy8q6AIAXqRUgWkn4WAMMKGd5YHown8eh/D4RAvSbpRgnaUWXsnJEMaTnz/SgtzZAzotJysN8rlXzECOoJXQE9GJ+HVhSIU+dzSXweWT7jVekKRs4Ip98Mb1qeEVbDQCiCrwM1gD7tW6Fgp0CcfmnL6ZtG1j9R2Z02R/osg86QZ1haGfq2PCP9WhiIjaAwknV6+y320zBSS5hJevf/kXI0/XKQWQEMFb5nWZqhGsIDM4BwDp0rMwXd65rBij3uehmLWzP+KsdkAUES9yX1FEZPlqFCaJRZQJx5YIMMtsQK9YPJkn8jGS81RnyYYwV2CNzWelemwXBsZDPCeWaFz3M3IzBAJ+CRNoWNzGC3Y5yF+M5FBFWbWZzFSMx3Bza3Lr6FXBXQrR9lxcgmEIxk4JpazB1kuDRZnScjOIhixy2LAWE48QNTzB8jdWeWlExGXBeWHFR3vNEROT1rEehkIoxcUxc8WcIKnfPwxVxW1oIFrkvry7k1RdGtu+1AcjjAF97dwT8qLao4xtczNtmJzMRqXQ/Vabrewz6Y8S19F5geIMjG7z/4zCID8WDaDYLYbQf/t+nlTfbMHOmYpIBjyGYsOgPOgqWlLuH3hrVAAIAcDIBGj+9+B1J7rwYz59Up+XE2hbLOdIDgOQBqriUgHE4QW0KkUA5eCk57mX1Ov9QW9pm9lmHs4zlcx1pyzPSz7LSA1G+hkBDUw8A2FwwhUSRHIiD2JsG0gFgiyAgP9b77yAIMuzB5pZXa54DUL3CiF9QZgOpMN9lozgExG6GXLxkIqjNcRCcL7hwQzxahC4FkIL7omGw254DU7XiyPSnH/WX33gNJcds2D1kqiNu0JfSsCyAh953D5l/GfskzIOpAgQAAAABJRU5ErkJggg==';
var MyTabBar = React.createClass({

    getInitialState:function(){
        return {
            selectedTab:'ListView'
        }
    },
    render: function () {
        return (
            <TabBarIOS
                style={this.props.style}
                tintColor="#38f"
                barTintColor="white"
                translucent={true}
                >
                <TabBarIOS.Item
                    title="首 页"
                    icon={{uri: icon1, scale: 3}}
                    selected={this.state.selectedTab === 'ListView'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'ListView'
                        });
                      }}
                    >
                    <MyListView navigator = {this.props.navigator}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="发 布"
                    icon={{uri: icon2, scale: 2}}
                    selected={this.state.selectedTab === 'Publish'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'Publish'
                        });
                      }}
                    >
                    <PublishView />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="我 的"
                    icon={{uri: icon3, scale: 2}}
                    selected={this.state.selectedTab === 'Me'}
                    onPress={()=>{
                        this.setState({
                            selectedTab:'Me'
                        })
                    }}
                    >
                    <UserView />
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    },
    myTabBarStyles: StyleSheet.create({
        tabContent: {
            flex: 1,
            alignItems: 'center'
        },
        tabText: {
            color: 'white',
            margin: 50,
        }
    })
});


module.exports = MyTabBar;
