import React, { Component } from 'react';
import './App.css';
import Users from './components/Users';
import AddUser from './components/AddUser';

class App extends Component {

    constructor(){
        super();
        this.state = {
            users: [],
            addFormVisible: false
        }
    }
    
    componentWillMount(){
        this.setState({
            users: JSON.parse(localStorage.getItem('users') || '[]')
        })
    }

    updateUsersInStateAndStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
        this.setState({users:users});
    }
    
    handleAddUser(user){
        let users = this.state.users;
        users.push(user);
        this.updateUsersInStateAndStorage(users);
    }

    handleEditUser(updatedUser){
        let users = this.state.users;
        let user = users.find(x => x.id === updatedUser.id);
        user.name = updatedUser.name;
        user.age = updatedUser.age;
        user.nickname = updatedUser.nickname;
        user.editMode = false;
        this.updateUsersInStateAndStorage(users);
    }
    
    handleDeleteUser(id){
        let users = this.state.users;
        let index = users.findIndex(x => x.id === id);
        users.splice(index, 1);
        this.updateUsersInStateAndStorage(users);
    }

    toggleEditMode(id) {
        let users = this.state.users;
        let userToEdit = users.find(x => x.id === id);
        userToEdit.editMode = !userToEdit.editMode;
        this.setState({users:users});
    }

    toggleAddVisibility(visible){
        this.setState({addFormVisible:visible});
    }

    getAgeOptions() {
        var ageOptions = [];
        for (var age = 1; age <= 100; age++) {
            ageOptions.push(age);
        }
        return ageOptions;
    }

    render() {
        return (
            <div className="App">
                <Users users={this.state.users}
                    onEditToggle={this.toggleEditMode.bind(this)}
                    onEditSave={this.handleEditUser.bind(this)}
                    onDelete={this.handleDeleteUser.bind(this)}
                    ageOptions={this.getAgeOptions()} />
                <AddUser addUser={this.handleAddUser.bind(this)}
                    cancelAddingUser={this.toggleAddVisibility.bind(this, false)}
                    visible={this.state.addFormVisible}
                    ageOptions={this.getAgeOptions()} />
                <input type="button" value="Add" onClick={this.toggleAddVisibility.bind(this, true)} />
            </div>
        );
    }
}

export default App;