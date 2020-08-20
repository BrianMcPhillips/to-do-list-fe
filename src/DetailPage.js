import React, { Component } from 'react'
import { fetchListItem, deleteListItem, updateListItem } from './toDoList-api.js';


export default class DetailPage extends Component {
    state = {
        listItem:{},
        name: 'Take out garbage',
        completed: false,
        importance: 10
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/login');
          } else {  
            const data = await fetchListItem(this.props.match.params.id)
            
    
            
    
            this.setState({
                name: data.body.name,
                completed: data.body.completed,
                importance: data.body.importance,
                listItem: data.body,
            })
          }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
             await updateListItem(
                this.props.match.params.id, 
                {
                    name: this.state.name,
                    completed: this.state.completed,
                    importance: this.state.importance
                });

            
            const updatedListItem = await fetchListItem(this.props.match.params.id)
    
            
            this.setState({
                name: 'Take out garbage',
                completed: false,
                importance: 10,
                listItem:updatedListItem.body
            });


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

    handleDelete = async () => {
        await deleteListItem(this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div>
               Here is your to do list item {this.state.listItem.name}: Is it complete?: {this.state.listItem.completed ? 'Yes' : 'No'} and it's importance is {this.state.listItem.importance} out of 10.

                </div>

        <h3>Update this "To do" list item?</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input onChange={this.handleNameChange} value={this.state.name} />
                    </label>
                    <label>
                        Completed: 
                        <input type="checkbox" value="true" checked={this.state.completed && 'checked'}onChange={this.handleCompletedChange} />
                    </label>
                    <label>
                        Importance:
                        <input onChange={this.handleImportanceChange} type="number" value={this.state.importance} />
                    </label>
                    <button>Update "To do" list item</button>
                </form>
               <button style={{ background: 'crimson'}} onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}