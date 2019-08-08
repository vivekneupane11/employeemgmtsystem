import React from 'react';
import { withRouter } from 'react-router-dom';
import './documentcard.scss';
import Error from 'components/Error';
import Button from 'components/Button';
class UserTable extends React.Component {
    renderTable = () => {
        return this.props.datas.map(data => {
            return (
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{data.email}</h4>
                                <p class="card-text">
                                    With supporting text below as a natural
                                    lead-in to additional content.
                                </p>
                                <p>Private</p>
                                <Button className={'secondary2'}>
                                    Make Public
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    handleClick(e, data) {
        this.props.history.push(`/admin/viewuser/${data._id}`, data);
    }

    render() {
        return (
            <div className="view-wrapper">
                <div className="view-container">
                    <div className="notification">
                        {this.props.notification}
                        <Error
                            className={'success'}
                            errorMessage={'New Document Added'}
                        />
                    </div>
                    <div className="list-document">{this.renderTable()}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserTable);
