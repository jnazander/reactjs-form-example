import React, {
    Component
} from 'react';
import uuid from 'uuid';

class AddUser extends Component {

    constructor() {
        super();
        this.state = {
            newUser: {}
        }
    }

    handleAddUser(e) {
        if (this.refs.name.value === '') {
            alert('Name is required');
            return;
        }
        if (this.refs.nickname.value === '') {
            alert('Nickname is required');
            return;
        }
        this.setState({
            newUser: {
                id: uuid.v4(),
                name: this.refs.name.value,
                age: this.refs.age.value,
                nickname: this.refs.nickname.value
            }
        }, function() {
            this.props.addUser(this.state.newUser);
        });
    }

    render() {
        if (!this.props.visible) {
            return (<div />);
        }

        let ageOptions = this.props.ageOptions.map(age => {
            return <option key={age} value={age}>{age}</option>
        });
        return (
            <div className="add-user">
                <form onSubmit={this.handleAddUser.bind(this)}>
                    <input className="input-name" type="text" ref="name" />
                    <select className="inputAge" ref="age" >{ageOptions}</select>
                    <input className="input-nickname" type="text" ref="nickname" />
                    <input type="button" value="Save" onClick={this.handleAddUser.bind(this)} />
                    <input type="button" value="Cancel" onClick={this.props.cancelAddingUser.bind(this)} />
                </form>
            </div>
        );
    }
}

export default AddUser;