import React from 'react';
import './sidebar.scss';
import { Link } from 'react-router-dom';

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconState1: true,
            iconState2: true,
            iconState3: true,
            icon1: 'icon icon-triangle-right',
            icon2: 'icon icon-triangle-right',
            icon3: 'icon icon-triangle-right'
        };
    }

    toggleIcon(val) {
        switch (val) {
            case 1:
                this.state.iconState1
                    ? this.setState({
                          iconState1: false,
                          icon1: 'icon icon-circle-down'
                      })
                    : this.setState({
                          iconState1: true,
                          icon1: 'icon icon-triangle-right'
                      });
                break;
            case 2:
                this.state.iconState2
                    ? this.setState({
                          iconState2: false,
                          icon2: 'icon icon-triangle-down'
                      })
                    : this.setState({
                          iconState2: true,
                          icon2: 'icon icon-triangle-right'
                      });
                break;
            case 3:
                this.state.iconState3
                    ? this.setState({
                          iconState3: false,
                          icon3: 'icon icon-triangle-down'
                      })
                    : this.setState({
                          iconState3: true,
                          icon3: 'icon icon-triangle-right'
                      });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="sidebar">
                <div className="home-link d-flex justify-flex-start">
                    <i className="icon icon-home" />
                    <a className="link home">Home</a>
                </div>
                <div>
                    <div className="dropdown-link">
                        <i className="icon icon-user" />
                        <a
                            className="link users"
                            id="userUser"
                            data-toggle="collapse"
                            onClick={e => this.toggleIcon(1)}
                            href="#userOpen"
                            role="button"
                            aria-expanded="false"
                        >
                            User
                        </a>
                        <i className={this.state.icon1} />
                    </div>
                    <div id="userOpen" className="dropdown-links collapse">
                        <div>
                            <Link to="/admin/createusers">
                                {' '}
                                <a className="link">Create Users</a>
                            </Link>
                        </div>
                        <div>
                            <a className="link">Edit User</a>
                        </div>
                        <div>
                            <a className="link">Remove User</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="dropdown-link">
                        <i className="icon icon-menu-bar" />
                        <a
                            className="link department"
                            data-toggle="collapse"
                            onClick={e => this.toggleIcon(2)}
                            href="#deptOpen"
                            role="button"
                            aria-expanded="false"
                        >
                            Department
                        </a>
                        <i className={this.state.icon2} />
                    </div>
                    <div id="deptOpen" className="dropdown-links collapse">
                        <div>
                            <Link to="/admin/createdepart">
                                <a className="link">Create Department</a>
                            </Link>
                        </div>
                        <div>
                            <Link to="/admin/listdept">
                                <a className="link">List Department</a>
                            </Link>
                        </div>
                        <div>
                            <a className="link">Remove Department</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="dropdown-link">
                        <i className="icon icon-document" />
                        <a
                            className="link documents"
                            data-toggle="collapse"
                            onClick={e => this.toggleIcon(3)}
                            href="#docsOpen"
                            role="button"
                            aria-expanded="false"
                        >
                            Documents
                        </a>
                        <i className={this.state.icon3} />
                    </div>
                    <div id="docsOpen" className="dropdown-links collapse">
                        <div>
                            {' '}
                            <Link to="/admin/document">
                                {' '}
                                <a className="link">Create Documents</a>
                            </Link>{' '}
                        </div>
                        <div>
                            {' '}
                            <Link to="/admin/view-document">
                                {' '}
                                <a className="link">View Documents</a>
                            </Link>{' '}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;
