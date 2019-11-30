import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'

import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Drawer} from 'native-base'
import { createDrawerNavigator} from 'react-navigation-drawer'

import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Addpost from './screens/Addpost';
import Posts from './screens/Posts'
import Dashboard from './screens/Dashboard'
import Confirm from './screens/Confirm'

import Auth from './screens/Auth'

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5'

import User from './screens/User'
import Signout from './screens/Signout'



export default class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render(){

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    

    const AppAuth=createStackNavigator({
        Login: {
          screen: Login
        },
        Register: {
          screen: Register
        },
        Confirm:{
          screen: Confirm
        }
    },
    
    
    {
      
      defaultNavigationOptions:{
        header: null,
       
      },
     
    
    })

    const AppDashboard=createDrawerNavigator({
      User:{
          screen:Dashboard,
          navigationOptions:{
            drawerLabel:({tintColor})=><User></User>
          }
      },
      Dashboard:{
        screen: Dashboard,
        navigationOptions:{
          drawerLabel:"Dashboard",
          drawerIcon:({tintColor})=><Icon name="tachometer-alt" size={14} color={tintColor}></Icon>
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions:{
          drawerLabel:"Profile",
          drawerIcon:({tintColor})=><Icon name="user-circle" size={14} color={tintColor}></Icon>
        }
      },
      Signout: {
        screen: Signout,
        navigationOptions:{
          drawerLabel:"Sign Out",
          drawerIcon:({tintColor})=><Icon name="sign-out-alt" size={14} color={tintColor}></Icon>
        }
      }
    }
    )

    const AppPost=createBottomTabNavigator({
        Posts:{
          screen:Posts,
          navigationOptions:{
            tabBarIcon:({tintColor})=><Icon name="tags" color={tintColor}></Icon>
          }
        },
        Addpost:{
          screen: Addpost,
          navigationOptions:{
            tabBarLabel: "Add",
            tabBarIcon:({tintColor})=><Icon name="plus-circle" color={tintColor}></Icon>
          }
        }
    })

    const AppSwitch=createSwitchNavigator({
        Auth: Auth,
        AppAuth: AppAuth,
        AppDashboard: AppDashboard,
        AppPost: AppPost
    },{
      initialRouteName: "Auth"
    })

    const AppContainer=createAppContainer(AppSwitch)


    return(<AppContainer></AppContainer>)
  }
}
