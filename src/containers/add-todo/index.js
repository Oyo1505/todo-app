import React from 'react';
import { addTodo } from '../../actions/'
import { connect } from 'react-redux';

const arrayNames = ['Bob', 'Martin', 'Pierre'];
const arrayDescriptions = ['etre ou ne pas etre', 'Viva la revolution', 'Partir c est mourrir un peur'];

class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo: {
                name: '',
                description: '',
                date: ''
            }
        }
    }

    handleValue = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const todo = this.state.todo;
        todo[name] = event.target.value;
        const date = new Date();
        date.getDate();
        todo['date'] = date;
        this.setState({ todo: todo })
    }


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    getRandomName = (arrayNames) => {
        const number = this.getRandomInt(arrayNames.length);
        const name = arrayNames[number];
        return name;
    }

    getRandomDescription = () => {
        const number = this.getRandomInt(arrayDescriptions.length);
        const description = arrayDescriptions[number];
        return description;

    }
    setRandomTodo = () => {
        const randomName = this.getRandomName(arrayNames);
        const randomDesc = this.getRandomDescription(arrayDescriptions);
        const date = new Date();
        const todo = this.state.todo;
        todo['name'] = randomName;
        todo['description'] = randomDesc;
        todo['date'] = date.getDate();
        this.setState({ todo: todo });
        this.props.addTodo(todo)

    }
    componentDidMount = () => {

        const todo = this.setRandomTodo();
    
        this.setState({ todo: { name: '', description: '', date: '' } })


    }
    onSubmit = (event) => {
        event.preventDefault();
        const todo = this.state.todo;
        this.props.addTodo(todo);
        this.setState({ todo: { name: '', description: '', date: '' } })

    }

    render() {
        return (
            <div>
				<div>
					<label>
					<p>	Name</p>
						<input type="text" onChange={this.handleValue} name="name" value={this.state.todo.name} />
					</label>
					</div>
				<div>
					<label>
						<p>Description</p>
						<input type="text" onChange={this.handleValue} name="description" value={this.state.todo.description} />
					</label>
				</div>
				<button type="button" onClick={this.onSubmit}>Add Todo </button>
			</div>
        );
    }
}

export default connect(null, { addTodo })(AddTodo);