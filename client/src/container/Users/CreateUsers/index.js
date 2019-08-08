import React, { Fragment } from 'react';
import CreateUserForm from './CreateUserForm';
import request from 'request';

import './style.scss';

export class CreateUsers extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            department:'',
            role:'',
            email:'',
            emailvalid : '',
            namevalid : '',
        }
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value,
        })

        this.validateInput(name,value);
    }

    validateInput = (name,value) => {        
        if (name == 'username'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({namevalid: 'valid'})
            }
            else{
                this.setState({namevalid: 'invalid'})
            }
        }

        else if (name == 'email'){
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)){
                this.setState({emailvalid: 'valid'})
            }
            else{
                this.setState({emailvalid: 'invalid'})
            }
        }               
    }

    sendEmail(){
        const obj = {
            email: this.state.email
        }
        console.log(obj)

        request({
            url: "http://localhost:4000/resetpassword/sendlinktoemail",
            method: "POST",
            json: true,
            body: obj
        }, (error, response) => {
            let errors ={}
            console.log(response);

            if(response.statusCode===400)
                  {
                      console.log(response);
                      
                    errors["email"]=`${response.body.message.error}`;
                    this.setState({errors})
                  }else if(response.body.message.success){
                      this.setState({isSentSuccess:true})
                      alert("Email Sent successfully"); 
                  }  
            })
    }

    generatePassword(){        
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
     
        return retVal;
               
    }

    buttonClick(e){
        e.preventDefault();        

        const password = this.generatePassword();
        
        console.log(this.state);
        if (this.state.email != "" && this.state.username != "" && this.state.emailvalid==="valid" && this.state.namevalid==="valid"){
            this.sendEmail();
            var myJSONObject = {
                "name": this.state.username,
                "email": this.state.email,
                "password": password,
                "role": this.state.role,
                "department" :this.state.department,
            };

            console.log(this.state.email);
            
            request({
                url: "http://localhost:4000/register",
                method: "POST",
                json: true,   // <--Very important!!!
                body: myJSONObject
            }, function (error, response, body){
                console.log(response, error, body);
                alert(response.statusMessage);
            });           
        }
        
        else if(this.state.emailvalid ==="invalid")
        { 
            console.log("email invalid")
        }
        else if(this.state.namevalid ==="invalid")
        { 
            console.log("name invalid")
        }
        else{
            alert("empty");
        }
        
        
    }
    
    render() {
        return (
           <Fragment>
               <CreateUserForm 
                    handleChange={(e) => this.handleChange(e)} 
                    emailvalid={this.state.emailvalid} 
                    namevalid={this.state.namevalid}
                    onClick={(e) => this.buttonClick(e)}/>
           </Fragment>
        )
    }
}

export default CreateUsers;
