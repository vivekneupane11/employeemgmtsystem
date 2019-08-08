import React from 'react'
import '../../assets/styles/resetpassword.scss'
import Button from '../../components/Button/index'
import Input from '../../components/Input/index'
import Error from '../../components/Error/index'
import ValidateField from './ValidateField'
import { FaAngleDoubleRight } from 'react-icons/fa';
import request from 'request';
import { Link } from 'react-router-dom'
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                password:'',
                confirmPassword:'' 
            },
            errors: {
                isValidPassword:false,
            },
            isResetSuccessful:false,
            isTokenVerified:false,
            isTokenExpired:false,
            token:props.match.params.token,
            email:props.match.params.email
        }
    }
    componentDidMount(){
        console.log(this.state.token);
        let tokenObj={
            token:this.state.token,
            email:this.state.email
        }
        console.log(tokenObj)
        request({
            url: "http://localhost:4000/resetpassword/verifytoken",
            method: "POST",
            json: true,
            body: tokenObj
        },(error, response) => {
            let errors ={}
            console.log(response);
            if(response.body.message.success){
                this.setState({isTokenVerified:true}) 
             }
            else
                  {
                     console.log(response);
                         this.setState({isTokenExpired:true}) 
                   
                  }
                     
                  
            })
    }
    handleUserInput(e) {
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
        if (error["isValidPassword"]) {
            this.setState({isResetSuccessful:true})
            const obj = {
                password: this.state.fields["password"],
                email:this.state.email
            }
            request({
                url: "http://localhost:4000/resetpassword/updatepassword",
                method: "POST",
                json: true,
                body: obj
            },(error, response) => {
                let errors ={}
                console.log(response);
                if(response.body.detail.success){
                this.setState({isTokenVerified:false})  
                } 
                else 
                      {
                          console.log(response);
                        errors["email"]=`${response.body.message.error}`;
                        console.log(response.body.message.error);
                        this.setState({errors})
                      }
                })
        }
    }
    render() {
        return (
            <div>
             {this.state.isTokenExpired &&
             <div className='token-error-message'>
             <h3>Sorry your reset time has Expired!</h3>
              <Link to='/forgot-password'>Send Another Email?</Link>
       
             </div>}
                {this.state.isTokenVerified &&
                    <form className="demo-form"
                        noValidate
                        onSubmit={(e) => this.handleSubmit(e)}>
                        <div className='form-header'>
                            <h2 className='form-heading'>Reset Password</h2>
                            <div className="form-descp">
                                <p className=''>Enter Your New Password</p>
                            </div>
                        </div>
                        <div className="input-fields">
                            <Input 
                                label={'Password'}
                                name={'password'}
                                type={'password'}
                                value={this.state.password}
                                onChange={(e) => this.handleUserInput(e)}
                                toggleCondition={true}
                            />
                            <Input 
                                label={'Confirm Password'}
                                name={'confirmPassword'}
                                type={'password'}
                                value={this.state.password}
                                onChange={(e) => this.handleUserInput(e)}
                                toggleCondition={true}
                            />
                        </div>
                        <div className="fade-in">
                            <div className="error">
                            {this.state.errors.password &&
                             <Error errorMessage={this.state.errors.password} className={"warning"}/>}
                            </div>
                                <div className='buttonwrapper'>
                                    <Button buttonName={"RESET"} className={"primary"} />
                                </div>
                        </div>
                    </form>}
                {this.state.isResetSuccessful &&
                    <div className='demo-form'>
                        <div className='successful '>
                            <p>Reset Successful! Go to login page and Enjoy</p>
                        </div>
                        <Link to='/'>
                            <span className='d-flex justify-content-end'>Go To Your Email<FaAngleDoubleRight /></span>
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

export default ResetPassword;