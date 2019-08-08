import React, { Component } from 'react';
import request from 'request';

import DeptTable from './DeptTable';

import './style.scss';

class ListUsers extends Component {   
    constructor(props) {
        super(props)
    
        this.state = {
            _id:"",
            name:"",
            depthead:"",
            dept:[]
        }
    }
        
    componentDidMount(){
        var myJSONObject = {
            "_id" : this.state._id,
            "name" : this.state.name,
            "depthead": this.state.depthead,                       
        };

        request({
            url: "http://localhost:4000/deptgetdata",
            method: "GET",
            json: true,   // <--Very important!!!
            body: myJSONObject
        }, function (error, response, body){
            
            const datas=[];
            response.body.data.map(data => {
                const obj =[
                    {
                        _id: data._id,
                        name : data.name,
                        depthead: data.depthead
                    }
                ]
                Array.prototype.push.apply(datas, obj)                   
            }) 
            this.setState({
                dept:datas,
            })

            console.log(this.state.dept)
        }.bind(this));        
    } 
    
    render() {
        
        return (
            
            <DeptTable datas= {this.state.dept}/>
        )
    }
}

export default ListUsers;
