import React,{Component} from 'react'
import {View, Text, Image, ScrollView, AsyncStorage} from 'react-native'
import {Title, Body,Card} from 'native-base'

export default class User extends Component{
    constructor(props){
        super(props)
        this.state=({userName:''})
    }

    componentDidMount=()=>{
        this.fetchUser();
    }
    fetchUser=async()=>{
        const res=await AsyncStorage.getItem('userName');
        const tUser=JSON.parse(res)
       // console.log(tUser.name)
        this.setState({userName: tUser.name})
    }
    get user(){
        return{
            name
        }
    }

    render(){
        return(
            <ScrollView style={{flex: 1}}>
            <View style={{justifyContent:'center', alignItems:'center', margin: 10}}>
                    <Image source={require('../images/user.png')} style={{width: 100, height: 100}}></Image>
                <Title>
                    {this.state.userName}
                </Title>
            </View>
            </ScrollView>
        )
    }
}