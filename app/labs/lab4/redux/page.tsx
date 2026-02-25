'use client';
import { Provider } from 'react-redux';
import AddRedux from './AddRedux';
import CounterRedux from './CounterRedux';
import Hello from './hello';
import TodoList from './todos/TodoList';
import store from '../store';

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h2>Redux Examples</h2>
        {/* Not sure if this is the right way? Also, how do I import hello? */}
        <AddRedux />
        <CounterRedux />
        <Hello />
        <TodoList />
      </div>
    </Provider>
  );
}
