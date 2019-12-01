import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import cx from "classnames";
import { deleteTodo, toggleTodo, updateTodo } from '../../actions/index'
import { getTodosByVisibilityFilter } from "../../actions/selectors";
import { VISIBILITY_FILTERS } from "../../constants";
import { connect } from 'react-redux';
import './single-todo.css';

const todos = [];

class SingleTodo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			todo : this.props.todo,
			isHide: false,
			image:''
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if(nextProps.todo !== nextState.todo){

			
		}
		return true;
	}

	componentDidMount= async()=>{
		const req = await fetch(`http://aws.random.cat/meow`)
        const res = await req.json();
        this.setState({image:res.file})

        /*set item to LocalStorage*/
        const todo = this.state.todo.content;
      	this.setTodoToLocalStorage(todo);
	}
	setTodoToLocalStorage = (todo) =>  {
		todos.push(todo)
        const todos_json = JSON.stringify(todos);
        localStorage.setItem("todos", todos_json)
	}
	deleteItemToLocalStorage = (todoId) => {
		const todos_json = JSON.parse(localStorage.getItem("todos"));
		const indexOfTOdo = todoId - 1;
		todos_json.splice(indexOfTOdo, 1 );
		localStorage.setItem("todos", JSON.stringify(todos_json));
	}


	todoFilterVisible = (event) => {
		event.preventDefault();
		this.props.toggleTodo(this.state.todo.id)
	}

	handleDescription = (event) => {
		event.preventDefault();
		const name = event.target.name;
		const value = event.target.value
		const todo = this.state.todo
		todo.content[name] = value;
		this.setState({todo})

	}

	onSubmit = () => {
		const todo = this.state.todo;
		this.props.updateTodo(todo)
		this.showModal();
	}

	showModal = (event) => {
		this.setState({isHide: !this.state.isHide});
	}
	onDelete = (event) => {
		event.preventDefault();
		this.props.deleteTodo(this.state.todo);
		this.deleteItemToLocalStorage(this.state.todo.id);
	}
	render() {
		const isHide = this.state.isHide;
		return (
			<div>
				<div onClick={this.showModal} className="todo-item" ><span>{this.state.todo.content.name}</span>   </div> <button type="button" onClick={this.onDelete} > Delete</button>
				{isHide &&	
					<Fragment>
					<Modal show={isHide} onHide={this.showModal}>
			        <Modal.Header>
			          <Modal.Title><img src={this.state.image} alt="random-cat" style={{width: '200px', height:'200px'}}/> 
			          <h3> {this.state.todo.content.name}</h3>
			          <p>{this.state.todo.content.description}</p>
			          </Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<input type="textarea" name="description" onChange={this.handleDescription} value={this.state.todo.content.description} />
			        </Modal.Body>
			        <Modal.Footer>

			          <Button variant="secondary" onClick={(e) => this.props.toggleTodo(this.state.todo.id)}>
			        	  { this.props.todo.completed ? 'in progress' : ' Done' }  
			          </Button>
			          <Button variant="primary" onClick={this.onSubmit}>
			            Update
			          </Button>
			        </Modal.Footer>
			      </Modal>
			      </Fragment>
				 }
			</div>
		);
	}
}

const getTodoById =(todos, todoId) =>{
	const todo = Object.assign({}, todos.find( todo => todo.id === todoId));
	return todo;
}

function mapStateToProps(state, ownProps) {
	
	let todo = {
		id:'',
		name:'',
		description:'',
		date:''
	}

	const todoId= ownProps.id;
	const { visibilityFilter } = state;
	const todos = getTodosByVisibilityFilter(state, visibilityFilter);
	if( todos && todos.length > 0) {
		todo = getTodoById(todos, todoId);
	}

	return {todo: todo};
}
export default connect(mapStateToProps, {deleteTodo, toggleTodo, updateTodo})(SingleTodo);