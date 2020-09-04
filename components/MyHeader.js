import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

export default class MyHeader extends Component {

  constructor(){
    super()
    this.state = {
      value : '',
    }
  }

  getNumberOfUnreadNotifictations = ()=>{
    db.collection('all_notifications').where('notification_status','==','unread').onSnapshot((snapshot)=>{
      var unreadNotifications = snapshot.docs.map((doc)=>{
        return doc.data();
      })
      this.setState({
        value:unreadNotifications.length
      })
    }
    )
  }

  componentDidMount(){
    this.getNumberOfUnreadNotifictations
  }

  BellIconWithBadge = (props)=>{
    return(
      <View>
        <Icon
          name = 'bell'
          type = 'font-awesome'
          color = "#696969"
          size = {25}
          onPress = {()=>{
            this.props.navigation.navigate('Notifications')
          }}
        ></Icon>
        <Badge
          value = {this.state.value}
          containerStyle = {{position : 'absolute', top:-4, right:-4}}
        ></Badge>
      </View>
    )
  }

  render(){
    return(
      <Header
      leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = '#696969' onPress = {()=>{
        this.props.navigation.toggleDrawer()
      }}></Icon>}
      rightComponent = {<this.BellIconWithBadge {...this.props} />}
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
    />
    )
  }
}
