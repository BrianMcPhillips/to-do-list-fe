import React, { Component } from 'react'
import { createListItem } from './toDoList-api.js';
import './App.css';

export default class CreatePage extends Component {
    state = {
        name: '',
        completed: false,
        importance: 1,
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/login');
        }

    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createListItem({
              name: this.state.name,
              completed: this.state.completed,
              importance: this.state.importance,
            });
    
            this.setState({
                name: '',
                completed: false,
                importance: 1,
            });
            this.props.history.push('/');
        } catch(e) {
            console.log(e.message)
        }
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    }

    handleCompletedChange = e => {
        this.setState({ completed: e.target.value });
    }

    handleImportanceChange = e => {
        this.setState({ importance: e.target.value });
    }

    render() {
        return (
            <div className="content">
                <h2>Create new "To do" list item!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input onChange={this.handleNameChange} value={this.state.name} />
                    </label>
                    <label>
                        Completed: 
                        <input type="checkbox" value="true" onChange={this.handleCompletedChange} />
                    </label>
                    <label>
                        Importance:
                        <input onChange={this.handleImportanceChange} type="number" value={this.state.importance} />
                    </label>
                    <button>Make New List Item</button>
                </form>
            </div>
        )
    }
}