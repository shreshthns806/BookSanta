import * as React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    
    constructor(){
        super();
        this.state={
            emailID:'',
            password:'',
        }
    }

    signup = async (emailID,password)=> {
        firebase.auth().createUserWithEmailAndPassword(emailID,password).then(
            ()=>{
                return(
                    Alert.alert('User added successfully')
                )
            }
        ).catch(
            (error)=> {
                return (
                    Alert.alert(error.message)
                )
            }
        )
    }

    login = async (emailID,password)=> {
        if(emailID && password){
            try{
                console.log('try')
                const response = await firebase.auth().signInWithEmailAndPassword(emailID,password)
                if (response){
                    Alert.alert('Login Succesful')
                }
            }
            catch(error){
                console.log(error.code,error.message)
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert('User does not exist');
                        break;
                    case 'auth/invalid-email':
                        Alert.alert('Incorrect EmailID or password');
                        break;
                    case 'auth/wrong-password':
                        Alert.alert('Incorrect Password')
                        break;
                    
                }
            }
        }
        else {
            Alert.alert('Enter Email and Password')
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style = {{alignItems:'center', marginTop:20,}}>
                <View>
                    <Text style = {{textAlign:'center', fontSize:28}}>Wireless Library</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TextInput
                        placeholder = 'abc@example.com'

                        style = {styles.loginBox}
                        keyboardType='email-address'
                        onChangeText={
                            (text)=>{
                                this.setState({emailID:text})
                            }
                        }
                    ></TextInput>
                    <TextInput
                        placeholder = 'Enter your password here...'
                        style = {styles.loginBox}
                        secureTextEntry = {true}
                        onChangeText={
                            (text)=>{
                                this.setState({password:text})
                            }
                        }
                    ></TextInput>
                    <TouchableOpacity
                        style = {[styles.button, {marginBottom:20, marginTop:20,}]}
                        onPress = {()=>{this.login(this.state.emailID,this.state.password)}}
                    >
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{this.signup(this.state.emailID,this.state.password)}}
                    >
                        <Text style = {styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
        container:{
          flex:1,
          backgroundColor:'#F8BE85'
        },
        profileContainer:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
        },
        title :{
          fontSize:65,
          fontWeight:'300',
          paddingBottom:30,
          color : '#ff3d00'
        },
        loginBox:{
          width: 300,
          height: 40,
          borderBottomWidth: 1.5,
          borderColor : '#ff8a65',
          fontSize: 20,
          margin:10,
          paddingLeft:10
        },
        button:{
          width:300,
          height:50,
          justifyContent:'center',
          alignItems:'center',
          borderRadius:25,
          backgroundColor:"#ff9800",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8,
          },
          shadowOpacity: 0.30,
          shadowRadius: 10.32,
          elevation: 16,
        },
        buttonText:{
          color:'#ffff',
          fontWeight:'200',
          fontSize:20
        },
        buttonContainer:{
          flex:1,
          alignItems:'center'
        }
})