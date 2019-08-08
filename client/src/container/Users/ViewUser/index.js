import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ViewUserTable from './ViewUserTable';

import './style.scss';

export class ViewUser extends Component {
    constructor(props) {
        super(props)    
        
    }
    
    handleEdit(e){
        e.preventDefault();
        this.props.history.push('/admin/edituser', this.props.location.state);
    } 
    
    render() {             
        return (                    
            
            <ViewUserTable 
                data={this.props.location.state}
                handleEdit={(e) => this.handleEdit(e)}
            />      
                        
        )
    }
}

export default withRouter(ViewUser);
