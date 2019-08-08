import React from 'react';
import './style.scss';
import Button from 'components/Button';

const Modal = (props) =>{
    return (
        <div className={props.className}>
            <div className="label">
               {props.label}
            </div>    

            <div className="button">
                <Button className="secondary1" buttonName="Yes" handleClick={props.handleYes}/>
                <Button className="secondary2" buttonName="No" handleClick={props.handleNo}/>
            </div>        
        </div>
    )
}

export default Modal;
