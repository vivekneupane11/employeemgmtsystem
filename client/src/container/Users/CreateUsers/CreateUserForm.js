import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';

const CreateUserForm = (props) => {
    const {handleChange, onClick, namevalid, emailvalid} = props;
    
    return(
        <div className="w-100">
            <h3>Create Users</h3>
            <div className="create-user-form d-flex flex-column align-items-center justify-content-center">
                <form className="user-form" id="userForm">
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{namevalid}</p>
                        </div>
                        <Input  type="text" 
                                id="userName" 
                                className="input-field" 
                                name="username" 
                                onChange={handleChange}
                                label="Name"
                        />
                    </div>
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{emailvalid}</p>
                        </div>
                        <Input  type="text" 
                                id="email" 
                                className="input-field" 
                                name="email"
                                onChange={handleChange}
                                label="Email"
                        />
                        
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <label htmlFor="roleSelect">Role: </label>
                        <select name="role" 
                                className="input-field" 
                                form="userForm" 
                                id="roleSelect"
                                onChange={handleChange}>
                            <option value="HR">HR</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <label htmlFor="departSelect">Department: </label>
                        <select name="department" 
                                className="input-field" 
                                form="userForm" 
                                id="departSelect"
                                onChange={handleChange}>
                            <option value="HR">HR</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>     

                    <div className="submit-button">
                        <Button className="primary" buttonName="Create" handleClick={onClick}/>
                    </div>            
                </form>
            </div>
        </div>
    )
}

export default CreateUserForm;
