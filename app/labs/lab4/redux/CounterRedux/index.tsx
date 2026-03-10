'use client';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterReducer';
import { RootState } from '../../store';
import { Provider } from 'react-redux';
import store from '../../store';

function CounterReduxContent() {
  const { count } = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <div id='wd-counter-redux'>
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button onClick={() => dispatch(increment())} id='wd-counter-redux-increment-click'>
        {' '}
        Increment{' '}
      </button>
      <button onClick={() => dispatch(decrement())} id='wd-counter-redux-decrement-click'>
        {' '}
        Decrement{' '}
      </button>
      <hr />
    </div>
  );
}

export default function counterRedux() {
  return (
    <Provider store={store}>
      <CounterReduxContent />
    </Provider>
  );
}
