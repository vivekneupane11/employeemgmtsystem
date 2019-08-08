import React from 'react';
import Button from 'components/Button';
import './index.scss';
import Error from 'components/Error';
import { withRouter } from 'react-router-dom';
const axios = require('axios');
class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            errors: {
                title: false,
                description: false,
                file: false,
                isFormInValid: false
            },
            file: null,
            filename: ''
        };
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        //make changes to ingredients
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        newState.form = undefined;
        newState.password = undefined;
        this.setState({
            errors: newState
        });
    }
    setPrivacy(e) {
        console.log(e.target.value);
    }
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myFile', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (this.state.title && this.state.description && this.state.file) {
            axios
                .post('http://localhost:4000/uploadfile', formData, config)
                .then(response => {
                    this.props.history.push({
                        pathname: './view-document',
                        state: { success: true }
                    });
                })
                .catch(error => {
                    console.log(error.response.data);
                });
        } else {
            let errors = {};
            errors['form'] = 'Please Enter valid information';
            errors['isFormInValid'] = true;
            this.setState({ errors: errors });
        }
        console.log(this.state.errors);
    }
    handlefiles(e) {
        const filename = e.target.value;
        this.setState({ file: e.target.files[0], filename: filename });
    }
    render() {
        return (
            <div className="upload-wrapper">
                <div className="container">
                    <div className="header">
                        <div className="heading">
                            <h2>Upload Document</h2>
                        </div>
                        <div className="">
                            <p>Page Description</p>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Cum, ex?
                            </p>
                        </div>
                    </div>
                    <div className="upload-form-body">
                        <form
                            className="demo-form"
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <div className="inputfields">
                                <input
                                    type="file"
                                    id="file"
                                    name="myFile"
                                    className="inputfile"
                                    onChange={e => this.handlefiles(e)}
                                />
                            </div>
                            <div className="inputfields ">
                                <p>Select Document</p>
                                <div className="filename">
                                    <input
                                        type="text"
                                        value={this.state.filename}
                                    />
                                    <label htmlFor="file">
                                        <i className="icon-document" />
                                        Select a file
                                    </label>
                                </div>
                            </div>
                            <div className="inputfields title">
                                <p>Title:</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={this.state.title}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="inputfields description">
                                <p> Description:</p>
                                <textarea
                                    name="description"
                                    value={this.state.description}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div
                                className="inputfields radio "
                                onChange={e => {
                                    this.setPrivacy(e);
                                }}
                            >
                                <p>Make Private:</p>
                                <input
                                    type="radio"
                                    name="Privacy"
                                    value="yes"
                                    defaultChecked
                                />
                                Yes
                                <input type="radio" name="Privacy" value="no" />
                                No
                            </div>
                            {this.state.errors['form'] && (
                                <Error
                                    className={'warning'}
                                    errorMessage={this.state.errors['form']}
                                />
                            )}
                            <div className="inputfields">
                                <Button className={'primary'}>
                                    <i className="icon-document" />
                                    Upload Document
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Document);
