import React, { Component } from 'react';
import request from 'request';
import UserTable from './UserTable';
import './style.scss';

class ListUsers extends Component {   
    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            name:"",
            email:"",
            password:"",
            age:"",
            dob:"",
            address:"",
            contact:'',
            employee:[],
        }
    }
        
    componentDidMount(){
        var myJSONObject = {
            "_id":this.state.id,
            "name": this.state.username,
            "email": this.state.email,
            "password": this.state.password,   
            "age":this.state.age,
            "dob": this.state.dob,
            "contact": this.state.contact,
            "address": this.state.address   
                 
        };

        request({
            url: "http://localhost:4000/getdata",
            method: "GET",
            json: true,   // <--Very important!!!
            body: myJSONObject
        }, function (error, response, body){
            
            const datas=[];
            response.body.data.map(data => {
                const obj =[
                    {
                        _id:data._id,
                        name : data.name,
                        email: data.email,
                        role : data.role,
                        department : data.department,
                        age:data.age,
                        dob: data.dob,
                        contact: data.contact,
                        address: data.address,
                        password: data.password
                    }
                ]
                Array.prototype.push.apply(datas, obj)                   
            }) 
            this.setState({
                employee:datas,
            })
        }.bind(this));        
    } 
    
    render() {
        
        return (
            <UserTable datas= {this.state.employee}/>
        )
    }
}

export default ListUsers;
