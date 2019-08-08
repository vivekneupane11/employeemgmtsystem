import React, { Component } from 'react';
import './style.scss';
import img from 'assets/img/dummy.jpeg';

class Navigation extends Component {
    handleClick() {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    }
    render() {
        return (
            <div className="navigations">
                <nav className="navbar navbar-expand-lg navbar-custom">
                    <div className="custom-nav">
                        <div className="navbar-logo navbar-brand">Company</div>
                        <div className="user-functions">
                            <span className="icons icon-bell" />
                            <div className="username">Admin</div>
                            <img className="user-image" src={img} alt="x" />
                            <button onClick={e => this.handleClick(e)}>
                                logout
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;
