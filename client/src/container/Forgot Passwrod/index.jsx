
import React from 'react'
import Button from '../../components/Button/index.jsx'
import Input from '../../components/Input/index.jsx'
import { Link } from 'react-router-dom'
import '../../assets/styles/forgotpassword.scss'
import Error from '../../components/Error/index.jsx'
import { FaAngleDoubleLeft, } from 'react-icons/fa';
import '../../components/Error/index.jsx'
import ValidateField from '../../utils/helpers/ValidateField'
import request from 'request';
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            fields: {
                email:''
            },
            errors: {
                isValidEmail:false
            },
            isSentSuccess:false
        }
    }
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        let fields = this.state.fields;
        fields[name] = value;
        let newState = JSON.parse(JSON.stringify(this.state.errors))
        newState.email = undefined
        this.setState({
            errors: newState
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const error = ValidateField(this.state.fields)
        console.log(error)
        this.setState({ errors: error })
        if (error["isValidEmail"]) {
            const obj = {
                email: this.state.fields["email"]
            }
            request({
                url: "http://localhost:4000/resetpassword/sendlinktoemail",
                method: "POST",
                json: true,
                body: obj
            }, (error, response) => {
                let errors ={}
                console.log(response);
                if(response.body.message.success){
                    this.setState({isSentSuccess:true})
                     
                } 
                else
                      {
                          console.log(response);
                        errors["email"]=`${response.body.message.error}`;
                        this.setState({errors})
                      } 
                })
        }
    }
    render() {
        return (
            <div className='forget-password-form'>
                {!this.state.isSentSuccess &&
                    <form className="forgotpassword-form"
                        noValidate
                        onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-header'>
                            <h2 className='form-heading'>Reset Password</h2>
                            <p className='form-descp'>Enter your Email Address to reset the password</p>
                            <Link to='/'>
                                <span className='links'><FaAngleDoubleLeft />Back</span>
                            </Link>
                        </div>
                        <Input id={'email_id'}
                            label={'Email'}
                            name={'email'}
                            type={'text'}
                            icon={false}
                            value={this.state.email}
                            validity={"this.state.validEmail"}
                            onChange={(e) => this.handleChange(e)} />
                        <div className='forgotpassword-footer'>
                        <div className='error-message'>
                        {this.state.errors.email &&
                            <Error errorMessage={this.state.errors.email} className={"warning"}/>}
                        </div>
                            <div className='buttonwrapper-next'>
                                    <Button buttonName={'SEND'} className={"primary"} />
                            </div>
                        </div>
                    </form>}
                {this.state.isSentSuccess &&
                    <div>
                        <div className='successful'>
                            <p>Thanks! We've just sent you an email with a link to set a new password. Go to your inbox, and click on the link in the email to continue.</p>
                        </div>
                       <a href="https://gmail.com">Go To Your Email</a>
                    </div>
                }
            </div>)
    }
}

export default ForgotPassword;