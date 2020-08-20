import React, { Component } from 'react'
import { fetchTodos, createTodo } from './todos-api.js';

export default class TodoListPage extends Component {
    state = {
        name: '',
        completed: false,
        owner_id: 1
    }

    componentDidMount = async () => {
        if (!this.props.token) {
            this.props.history.push('/signin');
        } else {
            const todosData = await fetchTodos();

            this.setState({
                todos: todosData.body
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTodo({
                name: this.state.name,
                completed: this.state.completed,
                owner_id: this.state.owner_id
            });
            this.setState({
                name: '',
                completed: false,
                owner_id: 1
            });
        } catch (e) {
            console.log(e.message)
        }
    }

    handleTodoChange = async (e) => {
        this.setState({ name: e.target.value });
    }


    render() {
        return (
            <div className='content'>
                <h2>Todo:</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input onChange={this.handleTodoChange} value={this.state.name} />
                    </label>
                    <button>Create Todo</button>
                </form>
            </div>
        )
    }
}