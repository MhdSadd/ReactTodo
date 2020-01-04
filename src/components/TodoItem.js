import React, { Component } from "react";
import PropTypes from "prop-types";

export class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "2px #ccc solid",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };
    
    markComplete = (e) => {
        console.log(this.props)
    }

    render() {
      
        const{id, title}=this.props.todo
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {''}
                {title}
                <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
        </p>
      </div>
    );
  }
}


const btnStyle = {
    background: 'red',
    color:'white',
    borderRadius: '50%',
    border: 'none',
    padding: '3px 7px',
    cursor: 'pointer',
    float:'right'
}

// PropTypes
TodoItem.propType = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo:PropTypes.func.isRequired
};

export default TodoItem;
