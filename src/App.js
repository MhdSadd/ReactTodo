import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import uuid from "uuid";
import Axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  // Make request
  componentDidMount() {
    Axios.get("http://jsonplaceholder.typicode.com/todos?_limit=10").then(res =>
      this.setState({ todos: res.data })
    );
  }

  // Toggle Todo Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  // Delete Todo
  delTodo = id => {
    Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };

  // AddTodo
  addTodo = title => {
    Axios.post("http://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header></Header>
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}></AddTodo>
                  <Todos
                    dodos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}></Todos>
                </React.Fragment>
              )}></Route>
            <Route path="/About" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
