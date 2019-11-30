import React, {Component} from 'react'
import { View, StatusBar, Platform} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';

export default class Dashboard extends Component{
    render(){
        return(
            <Container>
                <StatusBar barStyle="light-content" ></StatusBar>
                <Header style={{backgroundColor:"royalblue",paddingTop: Platform.OS==="android" ? 40 : 0, paddingBottom: Platform.OS==="android" ? 20 : 0}}>
                <Left>
                    <Button onPress={()=>this.props.navigation.openDrawer()} transparent style={{marginLeft: 10}}>
                        <Icon name='bars' size={14} color="#fff" />
                    
                    </Button>
                </Left> 
                <Body>
                    <Title style={{color:"#fff"}}>Dashboard</Title>
                </Body>
                <Right>
                   
                </Right>
                </Header>
            </Container>
        )
    }
}