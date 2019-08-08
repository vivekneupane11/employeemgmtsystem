import React, { Component } from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import EditDeptForm from './EditDeptForm';

import './style.scss';


export class EditDepart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id:"",
            name:"",
            depthead:""
        }
    }

    componentDidMount(){
        const propdata = this.props.location.state;
        this.setState({
            _id: propdata._id,
            name: propdata.name,
            depthead:propdata.depthead,
            namevalid:"",
            deptheadvalid:"",
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

        else if (name == 'depthead'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({deptheadvalid: 'valid'})
            }
            else{
                this.setState({deptheadvalid: 'invalid'})
            }
        }       
    }


    handleClick(e){
        e.preventDefault();
        const state=this.state;
        console.log("handleClick")
        var myJSONObject = {
            "_id" : this.state._id,
            "name": this.state.name,
            "depthead": this.state.depthead
        };

        if  ((state.namevalid ==="" || state.namevalid === "valid") &&
            (state.deptheadvalid =="" || state.deptheadvalid ==="valid")){
            
            request({
                url: "http://localhost:4000/deptupdatedata",
                method: "POST",
                json: true,   // <--Very important!!!
                body: myJSONObject
            }, function (error, response, body){
                console.log(body.detail.message);
                alert(body.detail.message);
            });
    
            this.props.history.push('/admin/listdept');
        }

        else{
            alert("invalid");
        }      
        
    }
    
    render() {
        console.log(this.state);
        return (

            <EditDeptForm onChange={this.onChange.bind(this)} data = {this.state} handleClick={this.handleClick.bind(this)}/>
            
        )
    }
}

export default withRouter(EditDepart)
