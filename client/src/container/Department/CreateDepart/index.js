import React,{Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';

import './style.scss';
import DepartmentForm from './DepartmentForm';
import request from 'request';

class CreateDepart extends Component {

    state={
        name:''
    }

    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleClick(e){
        e.preventDefault();
        if (this.state.name !== ""){
            var myJSONObject = {
               "name": this.state.name,
    
            };
            request({
                url: "http://localhost:4000/department",
                method: "POST",
                json: true,   // <--Very important!!!
                body: myJSONObject
            }, function (error, response, body){
                alert(response.body);
            });

            this.props.history.push('/admin/listdept');
        }
    }


    render() {
        const {name} = this.state;
        return (
            <Fragment>
                <DepartmentForm name={name} handleChange={this.handleChange} handleClick={(e) => {this.handleClick(e)}}/>
            </Fragment>
        )
    }
}

export default withRouter(CreateDepart);
