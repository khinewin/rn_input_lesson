
import React, {Component} from 'react'
import {AsyncStorage, StatusBar} from 'react-native'

export default class Auth extends Component {
    
    componentDidMount=()=>{
        this.checkAuth();
    }

    checkAuth=async()=>{
        const user=await AsyncStorage.getItem('userName')
        this.props.navigation.navigate(user ? "Posts" : "Login")
    }

    render(){
        return(
            <StatusBar barStyle="default"></StatusBar>
        )
    }




}