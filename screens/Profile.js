import React, {Component} from 'react'
import { View,Platform, Image, AsyncStorage} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { Container, Header, Left, Body, Right, CardItem, Item, Thumbnail, Button, Title, Text, Card } from 'native-base';

export default class Profile extends Component{

    constructor(props){
        super(props)
        this.state=({userName:'', email: ''})
    }

    componentDidMount=()=>{
        this.fetchUser();
    }
    fetchUser=async()=>{
        const res=await AsyncStorage.getItem('userName');
        const tUser=JSON.parse(res)
       // console.log(tUser.name)
        this.setState({userName: tUser.name, email:tUser.email})
    }

    render(){
        return(
            <Container>
                <Header style={{backgroundColor:"royalblue",paddingTop: Platform.OS==="android" ? 40 : 0, paddingBottom: Platform.OS==="android" ? 20 : 0}}>
                <Left>
                    <Button onPress={()=>this.props.navigation.openDrawer()} transparent style={{marginLeft: 10}}>
                        <Icon name='bars' size={14} color="#fff" />
                    
                    </Button>
                </Left> 
                <Body>
                    <Title style={{color:"#fff"}}>Profile</Title>
                </Body>
                <Right>
                   
                </Right>
                </Header>
                <Card>

                    <CardItem>
                    <Left>
                        <Thumbnail source={require('../images/user.png')} />
                        <Body>
                        <Text>{this.state.userName}</Text>
                        <Text note>{this.state.email}</Text>
                        </Body>
                    </Left>
                    </CardItem>
                    <CardItem cardBody>
                    <Image source={require('../images/user.png')} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                    
                    </CardItem>
                </Card>
            </Container>
        )
    }
}