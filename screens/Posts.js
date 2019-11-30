import React, {Component} from 'react'
import { View, Text, AsyncStorage} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import {Container, Header, Left, Button} from 'native-base'
import firebaseSDK from '../components/Firebase'

export default class Posts extends Component{
    constructor(props){
        super(props)
        this.state=({
            users:[
                {name: "mgmg", email:"mgmg@gmail.com"},
                {name: "koko", email:"koko@gmail.com"},
                {name: "aungaung", email:"aunguang@gmail.com"},
                {name: "tuntun", email:"tuntun@gmail.com"},
            ]
        })
    }

 render(){
        return(
          <Container>
              <Header style={{backgroundColor:"royalblue"}}>
                    <Left style={{marginLeft: 10}} >
                        <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                        <Icon name="bars" color="#fff" size={16}></Icon>
                        </Button>
                        
                    </Left>
              </Header>
          </Container>
        )
    }
}