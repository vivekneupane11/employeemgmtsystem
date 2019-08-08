import React, { Component } from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import EditUserForm from './EditUserForm';

import './style.scss';


export class EditUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id:"",
            name:"",
            email:"",
            password:"",
            age:"",
            dob:"",
            address:"",
            contact:'',
            role:"",
            department:"",
            namevalid:"",
            agevalid:"",
            addressvalid:"",
            contactvalid:"",
            display : "display-block",
        }
    }

    componentDidMount(){
        const propdata = this.props.location.state;
        this.setState({
            name: propdata.name,
            age: propdata.age,
            address:propdata.address,
            contact: propdata.contact,
            password: propdata.password,
            email:propdata.email,
            _id: propdata._id,
            role: propdata.role,
            department: propdata.department,
        })
    }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })

        this.validation(name,value);
        
    }

    validation(name,value){
        console.log("enter");
        if (name == 'name'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({namevalid: 'valid'})
            }
            else{
                this.setState({namevalid: 'invalid'})
            }
        }

        else if (name == 'contact'){
            if ((/^\d{10}$/).test(value)){
                this.setState({contactvalid: 'valid'})
            }
            else{
                this.setState({contactvalid: 'invalid'})
            }
        }

        else if (name == 'age'){
            if ((/^\d{2}$/).test(value)){
                this.setState({agevalid: 'valid'});
                console.log(name,this.state.agevalid);
                
            }
            else{
                this.setState({agevalid: 'invalid'})
            }

        }

        else if (name == 'address'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({addressvalid: 'valid'})
            }
            else{
                this.setState({addressvalid: 'invalid'})
            }
        }

        
    }


    handleClick(e){
        e.preventDefault();
        const state=this.state;
        
        var myJSONObject = {
            "_id" : this.state._id,
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "role": this.state.role,
            "department" :this.state.department,
            "contact": this.state.contact,
            "age" : this.state.age,
            "address": this.state.address,
            "dob": this.state.dob
        };

        if  ((state.namevalid ==="" || state.namevalid === "valid") &&
            (state.agevalid =="" || state.agevalid ==="valid")  &&
            (state.contactvalid==="" || state.contactvalid ==="valid")){
            
            request({
                url: "http://localhost:4000/updatedata",
                method: "POST",
                json: true,   // <--Very important!!!
                body: myJSONObject
            }, function (error, response, body){
                alert(body);
            });
    
            this.props.history.push('/admin');
        }

        else{
            alert("invalid");
        }
        
        
        
    }
    
    render() {
        console.log(this.state);
        return (

            <EditUserForm onChange={this.onChange.bind(this)} data = {this.state} handleClick={this.handleClick.bind(this)}/>
            
        )
    }
}

export default withRouter(EditUser)
