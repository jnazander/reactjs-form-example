import React, {
    Component
} from 'react';

class User extends Component {

    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    saveEditedUser(e) {
        if (this.refs.name.value === '') {
            alert('Name is required');
            return;
        }
        if (this.refs.nickname.value === '') {
            alert('Nickname is required');
            return;
        }
        this.setState({
            user: {
                id: this.props.user.id,
                name: this.refs.name.value,
                age: this.refs.age.value,
                nickname: this.refs.nickname.value
            }
        }, function() {
            this.props.onEditSave(this.state.user);
        });
    }

    render() {
        if (this.props.user.editMode) {
            let ageOptions = this.props.ageOptions.map(age => {
                return <option key={age} value={age}>{age}</option>
            });
            return (
                <tr className="user-row user-editable-row">
                    <td>
                        <input className="input-name" type="text" ref="name" defaultValue={this.props.user.name} />
                    </td>
                    <td>
                        <select className="inputAge" ref="age" defaultValue={this.props.user.age}>{ageOptions}</select>
                    </td>
                    <td>
                        <input className="input-nickname" type="text" ref="nickname" defaultValue={this.props.user.nickname} />
                    </td>
                    <td>
                        <input type="button" value="Save" onClick={this.saveEditedUser.bind(this)} />
                        <input type="button" value="Cancel" onClick={this.props.onEditToggle.bind(this, this.props.user.id)} />
                    </td>
                </tr>
            );
        }

        return (
            <tr className="userRow">
                <td>{this.props.user.name}</td>
                <td>{this.props.user.age}</td>
                <td>{this.props.user.nickname}</td>
                <td>
                    <input type="button" value="Edit" onClick={this.props.onEditToggle.bind(this, this.props.user.id)} />
                    <input type="button" value="Delete" onClick={this.props.onDelete.bind(this, this.props.user.id)} />
                </td>
            </tr>
        );
    }
}

export default User;