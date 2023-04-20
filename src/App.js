import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!value) return;
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      addTodo(value);
      setValue("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async text => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      setTodos([...todos, data.todo]);
    }
  };

  const markTodo = async index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);

    const response = await fetch(`/api/todos/${todos[index].id}`, {
      method: 'PUT',
      body: JSON.stringify({ isDone: true }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      newTodos[index].isDone = false;
      setTodos(newTodos);
    }
  };

  const removeTodo = async index => {
    const response = await fetch(`/api/todos/${todos[index].id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Todo todo={todo} index={index} markTodo={markTodo} removeTodo={removeTodo} />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
