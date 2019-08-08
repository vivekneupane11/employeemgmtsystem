import React from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import img from 'assets/img/dummy.jpeg';

import Button from 'components/Button';
import Modal from 'components/Modal';

class ViewDeptTable extends React.Component{
    constructor(props) {
        super(props)
        
        this.state = {
            display: "display-none"
        }
    }   

    handleDelete(){
        this.setState({
            display:"display-block"
        })
    }

    handleYes(){
        var myJSONObject={
            "_id" : this.props.data._id
        }

        console.log("sth wrong")
        request({
            url: "http://localhost:4000/deptdeletedata",
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject
        }, function (error, response, body){
            console.log(error, response,body);
        })
        this.props.history.push('/admin/listdept');
        
        this.setState({
            display:"display-none"
        })
    }

    handleNo(){
        this.setState({
            display:"display-none"
        })
    }  
    
    render(){
        return (
            <div className="view-dept">
                <div className="title d-flex">
                    <h3>{this.props.name} Details</h3>
                    <div className="d-flex justify-space-between">
                        <Button className="secondary1" buttonName="Delete" handleClick={(e)=> this.handleDelete(e)} />
                        <Button className="secondary2" buttonName="Edit" handleClick={this.props.handleEdit}/>
                    </div>
                </div>
                <div className="view-dept-table">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.props.data.name}</td>
                            </tr>
                            
                            <tr>
                                <td>Department Head</td>
                                <td>{this.props.data.depthead}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
                <Modal 
                    label="Are you sure you want to delete?" 
                    className={this.state.display}
                    handleYes={this.handleYes.bind(this)}
                    handleNo={this.handleNo.bind(this)}/>
            </div>
        )
    }

   
}

export default withRouter(ViewDeptTable);
