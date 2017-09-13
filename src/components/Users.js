import React, { Component } from 'react';
import User from './User';

class Users extends Component {

    render() {
        let userItems;
        if (this.props.users){
                userItems = this.props.users.map(user => {
                return (
                    <User onEditToggle={this.props.onEditToggle.bind(this)}
                        onEditSave={this.props.onEditSave.bind(this)}
                        onDelete={this.props.onDelete.bind(this)}
                        ageOptions={this.props.ageOptions}
                        user={user}
                        key={user.id} />
                );
            });
        }
        return (
            <table className="users-table">
                <tbody>
                    <tr className="usersHeader">
                        <th>Name</th>
                        <th>Age</th>
                        <th>Nickname</th>
                        <th>Action</th>
                    </tr>
                    {userItems}
                    <tr className="usersFooter"></tr>
                </tbody>
            </table>
        );
    }
}

export default Users;
