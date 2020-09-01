import * as React from 'react';
import { Text, View, Image, ScrollView, Modal, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component {
    
    constructor(){
        super();
        this.state={
            emailID:'',
            password:'',
            firstName:'',
            lastName:'',
            adress:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:false,
        }
    }

    signup = async (emailID,password,confirmPassword)=> {
        if (password != confirmPassword){
            return Alert.alert('Password Does not Match \n Check your password');
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailID,password).then(
                ()=>{
                    db.collection('users').add({
                        first_name:this.state.firstName,
                        last_name:this.state.lastName,
                        address:this.state.adress,
                        contact:this.state.contact,
                        email_id:this.state.emailID
                    })
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

    }

    showModal = ()=>{
        return(
            <Modal
                animationType = 'fade'
                transparent = {true}
                visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width:'100%'}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>Registration</Text>
                            <TextInput
                                placeholder = 'First Name'
                                style = {styles.formTextInput}
                                onChangeText={
                                    (text)=>{
                                        this.setState({firstName:text})
                                    }
                                }
                                maxLength = {12}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Last Name'
                                style = {styles.formTextInput}
                                onChangeText={
                                    (text)=>{
                                        this.setState({lastName:text})
                                    }
                                }
                                maxLength = {12}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Contact Number'
                                style = {styles.formTextInput}
                                keyboardType='numeric'
                                onChangeText={
                                    (text)=>{
                                        this.setState({contact:text})
                                    }
                                }
                                maxLength={10}
                            ></TextInput>
                            <TextInput
                                placeholder = 'Adress'
                                multiline = {true}
                                style = {styles.formTextInput}
                                onChangeText={
                                    (text)=>{
                                        this.setState({adress:text})
                                    }
                                }
                            ></TextInput>
                            <TextInput
                                placeholder = 'abc@example.com'
                                style = {styles.formTextInput}
                                keyboardType='email-address'
                                onChangeText={
                                    (text)=>{
                                        this.setState({emailID:text})
                                    }
                                }
                            ></TextInput>
                            <TextInput
                                placeholder = 'Enter desired Password'
                                style = {styles.formTextInput}
                                secureTextEntry = {true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({password:text})
                                    }
                                }
                            ></TextInput>
                            <TextInput
                                placeholder = 'Confirm Password'
                                style = {styles.formTextInput}
                                secureTextEntry = {true}
                                onChangeText={
                                    (text)=>{
                                        this.setState({confirmPassword:text})
                                    }
                                }
                            ></TextInput>
                            <View>
                                <TouchableOpacity
                                    onPress = {
                                        ()=>{
                                            this.signup(this.state.emailID,this.state.password,this.state.confirmPassword)
                                        }
                                    }
                                    style = {styles.registerButton}
                                >
                                    <Text style = {styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress = {
                                        ()=>{
                                            this.setState({
                                                isModalVisible:false,
                                            })
                                        }
                                    }
                                    style = {styles.cancelButton}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>

            </Modal>
        )
    }

    login = async (emailID,password)=> {
        if(emailID && password){
            try{
                console.log('try')
                const response = await firebase.auth().signInWithEmailAndPassword(emailID,password)
                if (response){
                    Alert.alert('Login Succesful')
                    this.props.navigation.navigate('DonateBooks')
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
            <KeyboardAvoidingView style = {styles.container}>
                {
                    this.showModal()
                }
                <View style = {styles.profileContainer}>
                    <Text style = {styles.title}>Book Santa</Text>
                </View>
                <View style = {styles.buttonContainer}>
                    <TextInput
                        placeholder = 'abc@example.com'
                        placeholderTextColor = 'white'
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
                        placeholderTextColor = 'white'
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
                        onPress = {()=>{this.setState({
                            isModalVisible:true,
                        })}}
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
        },
        
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
    },
    cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
})