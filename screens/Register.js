import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView, ActivityIndicator, Image, StyleSheet ,Platform} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import {Container, Header,Card, Item,Input,Form, Left, Right,Button, Title, Body, Content, TabHeading} from 'native-base'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Firebase from '../components/Firebase'

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state=({
            name:'', 
            email:'',
             password:'',
              retypePassword:'',
               error:'', 
               showError:false,
               showLoading:false,
               info:'',
               showInfo:false
            })

    }
 
    clearError=()=>{
        setTimeout(()=>{
              this.setState({error:'', showError: false})  
        }, 3000)
    }

    doSignup=()=>{
        const name=this.state.name;
        const email=this.state.email;
        const password=this.state.password;
        const retypePassword=this.state.retypePassword;

        if(name.length <=0){
            this.setState({error: "The name field is required.", showError: true})
            this.clearError();
            return;
        }
        if(email.length <=0){
            this.setState({error: "The email field is required.", showError: true})
            this.clearError();
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email)==false){
            this.setState({showError: true, error: "The email format is invalid."})
            this.clearError();
            return;
        }
        if(password.length <=0){
            this.setState({error: "The password field is required.", showError: true})
            this.clearError();
            return;
        }
        if(password.length < 6){
            this.setState({error: "The password must at lest 6.", showError: true})
            this.clearError();
            return;
        }
        if(password !=retypePassword){
            this.setState({error: "The password  and retype password must match.", showError: true})
            this.clearError();
            return;
        }


        this.setState({showLoading:true})

        
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            user = Firebase.auth().currentUser;
            user.sendEmailVerification();
        })
        .then(function () {
            user.updateProfile({
                displayName: name,
               // photoURL: photoURL
            });
            
        })
        .then(()=>{
            this.setState({info: "The verification link is send to your email.", showInfo:true})
            setTimeout(()=>{
                this.props.navigation.navigate("Login")
            }, 5000)
        })
        
        .catch((err)=>{
            this.setState({showLoading:false})
            const error=JSON.stringify(err)
            const resErr=JSON.parse(error)
            this.setState({error: resErr.message, showError: true})
            this.clearError();
            console.log(resErr)
        })


    }
   
    
    render(){

       const error=this.state.error;
       const showError=this.state.showError;
       const info=this.state.info;
       const showInfo=this.state.showInfo;

        return(
            
           
                <KeyboardAwareScrollView enableOnAndroid={true}>

               
             <Container style={{paddingTop: 100}}>
                 <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 20}}>
                     <Image source={require('../images/logo.jpg')} style={{width: 120, height: 60}}></Image>
                 </View>
                 {
                     showError && (
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
                   <Item rounded style={styles.formGroup}>
                        <Input 
                        returnKeyType="next"
                        onSubmitEditing={(event)=>{}}
                        getRef={input => {
                            this.firstNameRef = input;
                          }}
                          onSubmitEditing={() => {
                            this.emailRef._root.focus();
                          }}
                          onChangeText={(t)=>this.setState({name: t})}
                        
                        value={this.state.name}
                        placeholder='Name'/>
                    </Item>
                   <Item rounded style={styles.formGroup}>
                        <Input
                        ref={input => {
                            this.emailRef = input;
                          }}
                          onSubmitEditing={()=>this.passwordRef._root.focus()}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        onChangeText={(t)=>this.setState({email: t})}
                        value={this.state.email}
                        returnKeyType="next"
                        placeholder='Email'/>
                    </Item>
                    <Item rounded style={styles.formGroup}>
                        <Input 
                        onChangeText={(t)=>this.setState({password: t})}
                        value={this.state.password}
                        secureTextEntry={true}
                        returnKeyType="next"
                        ref={(input)=>this.passwordRef=input}
                        onSubmitEditing={()=>this.retypePasswordRef._root.focus()}
                        placeholder='Password'/>
                    </Item>
                    <Item rounded style={styles.formGroup}>
                        <Input
                        onChangeText={(t)=>this.setState({retypePassword: t})}
                        value={this.state.retypePassword}
                        secureTextEntry={true}
                        returnKeyType="done"
                        ref={(input)=>this.retypePasswordRef=input}
                        onSubmitEditing={()=>this.doSignup()}
                        placeholder='Retype Password'/>
                    </Item>
                    <Button onPress={()=>this.doSignup()} iconRight rounded style={{justifyContent: 'center', marginBottom: 20}}>
                        <Title style={{color:"#fff"}}>Signup</Title>
                        { this.state.showLoading && (<ActivityIndicator  color="#fff"></ActivityIndicator> ) }
                    </Button>
                    <Button transparent iconLeft  style={{justifyContent: 'center'}} onPress={()=>this.props.navigation.navigate("Login")}>
                    <Icon name="sign-in-alt"></Icon>
                        <Title style={{color:"#000"}}> Signin</Title>
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