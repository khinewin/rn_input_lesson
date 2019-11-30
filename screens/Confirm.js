import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView, Image, StyleSheet, Platform, ActivityIndicator, Dimensions} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import {Container, Header,Card, Item,Input,Form, Left, Right,Button, Title, Body, Content} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Firebase from '../components/Firebase'
export default class Confirm extends Component{
    constructor(props) {
        super(props)
       // console.log(props.navigation.getParam("email"))
        this.state=({email:props.navigation.getParam('email'), password:props.navigation.getParam('password'), error:'', showError:false, info:'', showInfo:false, showLoading: false})
    }
    

    clearError=()=>{
        setTimeout(()=>{
              this.setState({error:'', showError: false})  
        }, 3000)
    }
    doSignin=()=>{
        this.setState({showLoading: true})
       const email=this.state.email;
       const password=this.state.password;
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            const user=Firebase.auth().currentUser;
            user.sendEmailVerification();
        })
        .then(()=>{
            this.setState({info: "The verification link is send to your email.", showInfo:true, showLoading:false})
            
        })
        .then(()=>{
            this.clearError();
        })

       
    }

    render(){
        const showError=this.state.showError;
        const error=this.state.error;
        const info=this.state.info;
       const showInfo=this.state.showInfo;
        return(
            <KeyboardAwareScrollView enableOnAndroid={true}>

             <Container style={{paddingTop: 100}}>
                 <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 50}}>
                     <Image source={require('../images/logo.jpg')} style={{width: 120, height: 60}}></Image>
                 </View>
                 {
                     showError && (
                         <View style={
                             {   position:'absolute',
                                top :40,
                                right: 10,
                                backgroundColor: "#000",
                                 borderRadius: 10,
                                 padding: 10,
                                 justifyContent:'center',
                                 alignItems: 'center'
                             }
                         }>
                             
                             <Text style={{
                                 color: "#fff"
                             }}><Icon name="exclamation-circle" color="red"></Icon> {error}</Text>
                         </View>
                     )
                 }
                 {
                     showInfo && (
                         <View style={
                             {   position:'absolute',
                                top :40,
                                right: 0,
                                margin: 10,
                                backgroundColor: "#000",
                                 borderRadius: 10,
                                 padding: 10,
                                 justifyContent:'center',
                                 alignItems: 'center'
                             }
                         }>
                             
                             <Text style={{
                                 color: "#fff"
                             }}><Icon name="check-circle" color="green"></Icon> {info}</Text>
                         </View>
                     )
                 }
                 <Content style={{padding: 20}}>
                   <Form>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 20}}>
                        Please confirm your email frist to signin.
                    </Text>
                    <Text>
                        if you don't get confirm link send confirm email link again.
                    </Text>
                    </View>
                    <Button onPress={()=>this.doSignin()} rounded style={{justifyContent: 'center', marginBottom: 20, marginTop: 20}}>
                        <Text style={{color:"#fff"}}>Send Confirm Email Link Again</Text>
                        { this.state.showLoading && (<ActivityIndicator  color="#fff"></ActivityIndicator> ) }
                    </Button>
                    <Button transparent iconLeft  style={{justifyContent: 'center'}} onPress={()=>this.props.navigation.navigate("Login")}>
                    <Icon name="sign-in-alt"></Icon>
                        <Title style={{color:"#000"}}> Sign In</Title>
                    </Button>
                   </Form>
                 </Content>
             </Container>
             </KeyboardAwareScrollView>
          
        )
    }
}

const styles=StyleSheet.create({
    formGroup:{
        marginBottom: 20
    }
})