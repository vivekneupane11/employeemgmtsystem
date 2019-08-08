import React from 'react';

const DepartmentForm = (props) => {
    const {name, handleChange, handleClick} = props;
return (
    <div className="createDepart">
                <h3 className="m-2">Create Department</h3>
                <form className="d-flex flex-column justify-content-center align-items-center">
                    <div className="createDepartForm form-group">
                        <label htmlFor="departName">Department Name:</label>
                        <input type="text" className="form-control departName" id="departName" onChange={handleChange}></input>
                    </div> 
                    <button type="submit" className="submitBtn" onClick={handleClick}>Create</button>   
                </form>                
            </div>
        )

}

export default DepartmentForm;