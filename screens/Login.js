import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Image, StyleSheet, Platform, Dimensions} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import {Container, Header,Card, Item,Input,Form, Left, Right,Button, Title, Body, Content} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Firebase from '../components/Firebase'
export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state=({email:'', password:'', error:'', showError:false, showLoading: false})
    }

    clearError=()=>{
        setTimeout(()=>{
              this.setState({error:'', showError: false})  
        }, 3000)
    }

    saveUser=async(userName)=>{
        const user=AsyncStorage.setItem('userName',userName)
        return user;
    }

    doSignin=()=>{
       
        const email=this.state.email;
        const password=this.state.password;
        

      
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
        this.setState({showLoading:true})
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res)=>{
            const user=res.user;
            if(user.emailVerified){
                const tUer={
                    name: user.displayName,
                    email:user.email,
                    id:user.uid,
                    
                }
                const mUser=JSON.stringify(tUer)
                //console.log(tUer)
               
                this.saveUser(mUser)
                this.props.navigation.navigate("Dashboard")
            }else{
                this.setState({showLoading:false})
                this.props.navigation.navigate("Confirm", {email: email, password:password})
            }
           // console.log(user)
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
        const showError=this.state.showError;
        const error=this.state.error;
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
                 <Content style={{padding: 20}}>
                   <Form>
                   <Item rounded style={styles.formGroup}>
                        <Input
                        autoCapitalize="none"
                        onChangeText={(t)=>this.setState({email: t})}
                        value={this.state.email}
                        keyboardType="email-address"
                        returnKeyType="next"
                        getRef={(input)=>this.emailRef=input}
                        onSubmitEditing={()=>this.passwordRef._root.focus()}
                        placeholder='Email'/>
                    </Item>
                    <Item rounded style={styles.formGroup}>
                        <Input 
                        onChangeText={(t)=>this.setState({password:t})}
                        value={this.state.password}
                        secureTextEntry={true}
                        returnKeyType="done"
                        ref={(input)=>this.passwordRef=input}
                        onSubmitEditing={()=>this.doSignin()}
                        placeholder='Password'/>
                    </Item>
                    <Button onPress={()=>this.doSignin()} rounded style={{justifyContent: 'center', marginBottom: 20}}>
                        <Title style={{color:"#fff"}}>Signin</Title>
                        { this.state.showLoading && (<ActivityIndicator  color="#fff"></ActivityIndicator> ) }
                    </Button>
                    <Button transparent iconLeft  style={{justifyContent: 'center'}} onPress={()=>this.props.navigation.navigate("Register")}>
                    <Icon name="user-plus"></Icon>
                        <Title style={{color:"#000"}}> Signup</Title>
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