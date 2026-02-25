'use client';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { Provider } from 'react-redux';

function HelloReduxContent() {
  const { message } = useSelector((state: RootState) => state.helloReducer);
  return (
    <div id='wd-hello-redux'>
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
    </div>
  );
}

export default function HelloRedux() {
  return (
    <Provider store={store}>
      <HelloReduxContent />
    </Provider>
  );
}
