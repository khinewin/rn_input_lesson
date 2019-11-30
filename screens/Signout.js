import React,{Component} from 'react'
import {View, Text, Image, Alert, ScrollView, StatusBar, AsyncStorage} from 'react-native'
import {Title, Body,Card, Button, Container} from 'native-base'

export default class Signout extends Component{
    constructor(props){
        super(props)
       
       
    }
   
    
   
    doSignout=async()=>{
        AsyncStorage.removeItem('userName')
        this.props.navigation.navigate("Login")
    }

    render(){
        return(
            <View>
                
                    <View style={{justifyContent: 'center', alignItems:'center', marginTop: 100, marginBottom: 50}}>
                        <Text style={{fontWeight:'bold'}}>Confirm Sign Out ?</Text>
                    </View>
                    <View>
                        <Button onPress={()=>this.doSignout()} bordered success style={{marginLeft: 50, marginRight: 50, marginBottom: 20, justifyContent:'center', alignItems:'center'}}>
                            <Title>Yes</Title>
                        </Button>
                        <Button onPress={()=>this.props.navigation.goBack()} bordered danger style={{marginLeft: 50, marginRight: 50, justifyContent:'center', alignItems:'center'}}>
                            <Title>No</Title>
                        </Button>
                       
                    </View>
                
            </View>
        )
    }
}