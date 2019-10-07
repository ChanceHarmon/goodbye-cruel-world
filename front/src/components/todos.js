import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import superagent from 'superagent';
import todoActions from '../store/actions/todos';
const API = 'http://localhost:8080';
const Todos = (props) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoContent, setTodoContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.addTodos({ title: todoTitle, content: todoContent });
  }

  function handleDelete(event) {
    event.preventDefault();
    superagent.delete(`${API}/todo/${this.props.todo._id}`)
      .then(results => {

      })
  }


  useEffect(() => {
    props.fetchTodos();
  }, []);

  return (
    <>
      <ul>
        {props.todos.map((todo, idx) => (
          <li key={idx}>
            <p>Name:{todo.title}</p>
            <p>Score:{todo.content}</p>

          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        Name:
        <input
          type="text"
          placeholder="Name"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        Score:
        <input
          type="text"
          placeholder="Score"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTodos: () => dispatch(todoActions.fetchTodos()),
  addTodos: (data) => dispatch(todoActions.addTodos(data)),
});

Todos.propTypes = {
  fetchTodos: PropTypes.func,
  addTodos: PropTypes.func,
  todos: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todos);