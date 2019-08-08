import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';


const EditUserForm = (props) => {
    
    return (
        <div className="edit-user">
            <h3> Edit User </h3>
            <form className="user-form" id="userForm">
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.namevalid}sdfsdf</p>
                        </div>
                        <Input  type="text" 
                                id="name" 
                                className="input-field" 
                                name="name" 
                                onChange={(e)=> {props.onChange(e)}}
                                label="Name"
                                value={props.data.name}
                        />
                    </div>
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.agevalid}</p>
                        </div>
                        <Input  type="text" 
                                id="age" 
                                className="input-field" 
                                name="age"
                                onChange={(e)=> {props.onChange(e)}}
                                label="Age"
                                value={props.data.age}
                        />
                        
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.dobvalid}</p>
                        </div>
                        <Input  type="date" 
                                id="dob" 
                                className="input-field" 
                                name="dob"
                                onChange={(e)=> {props.onChange(e)}}
                                label="DOB"
                                value={props.data.dob}
                        />
                        
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.contactvalid}</p>
                        </div>
                        <Input  type="text" 
                                id="contact" 
                                className="input-field" 
                                name="contact"
                                onChange={(e)=> {props.onChange(e)}}
                                label="Contact"
                                value={props.data.contact}
                        />
                        
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.addressvalid}</p>
                        </div>
                        <Input  type="text" 
                                id="address" 
                                className="input-field" 
                                name="address"
                                onChange={(e)=> {props.onChange(e)}}
                                label="Address"
                                value={props.data.address}
                        />
                        
                    </div>

                      

                    <div className="submit-button">
                        <Button className="primary" buttonName="Edit" handleClick={(e)=> {props.handleClick(e)}}/>
                    </div>         
                </form>
        </div>
    )
}


export default EditUserForm;