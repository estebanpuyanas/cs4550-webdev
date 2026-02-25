import AddRedux from './AddRedux';
import CounterRedux from './CounterRedux';
import Hello from './hello';
import TodoList from './todos/TodoList';
export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      {/* Not sure if this is the right way? Also, how do I import hello? */}
      <AddRedux />
      <CounterRedux />
      <Hello />
      <TodoList />
    </div>
  );
}
