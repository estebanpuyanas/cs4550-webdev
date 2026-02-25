'use client';
import { ListGroup } from 'react-bootstrap';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { Provider } from 'react-redux';

function TodoListContent() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id='wd-todo-list-redux'>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

export default function TodoList() {
  <Provider store={store}>
    <TodoListContent />
  </Provider>;
}
