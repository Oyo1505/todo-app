import React from 'react';
import { connect } from 'react-redux';
import ListTodo from '../list-todo/'
export class Todos extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			todos:{}
		}
	}

	render() {
		return (
			<div>
			  
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(Todos)
