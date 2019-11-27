import React from 'react';
import { getTodosByVisibilityFilter } from "../../actions/selectors";
import { VISIBILITY_FILTERS } from "../../constants";
import Todo from '../../containers/single-todo';
import {connect} from 'react-redux';

class ListTodo extends React.Component{
	
    constructor(props) {
        super(props)

        this.state = {
          todos:[]
        }
    }
	/*shouldComponentUpdate = (nextProps) => {
		if(this.props.todos !== nextProps.todos){
			console.log(nextProps.todos)
			const todos = JSON.stringify(this.props.todos);
			console.log(todos)
        	localStorage.setItem("todos", todos);

			return true;
		}
		return false;
	}*/

	componentDidMount =()=>{

		const todos_json = localStorage.getItem("todos");
		if(todos_json !== null){
			const todos = JSON.parse(todos_json);
		
		}
	}
	render(){

		const todos = this.props.todos;
		
		return(
			<div>ListTodo
				{ todos && todos.length ?
					todos.map(todo => {
	
					return <Todo key={todo.id} id={todo.id} />
				})
				: 
				<p>'Pas de Todo'</p>
				}
			</div>
		);
	
	}
}

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	const todos = getTodosByVisibilityFilter(state, visibilityFilter);
	
	return{todos:todos}

}
export default connect(mapStateToProps)(ListTodo);