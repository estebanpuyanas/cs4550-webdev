'use client';
import ArrayStateVariable from './ArrayStateVariable';
import BooleanStateVariables from './BooleanStateVariables';
import ClickEvent from './ClickEvent';
import Counter from './Counter';
import DateStateVariable from './DateStateVariable';
import ObjectStateVariable from './ObjectStateVariable';
import ParentStateComponent from './ParentStateComponent';
import PassingDataOnEvent from './PassingDataOnEvent';
import PassingFunctions from './PassingFunctions';
import StringStateVariables from './StringStateVariables';
import store from './store';
import { Provider } from 'react-redux';

import Link from 'next/link';

export default function Lab4() {
  function sayHello() {
    alert('Hello');
  }
  return (
    <Provider store={store}>
      <div id='wd-lab4' className='container'>
        <h2>Lab 4</h2>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables></BooleanStateVariables>
        <StringStateVariables></StringStateVariables>
        <DateStateVariable>This needs to be fixed so make sure to check piazza</DateStateVariable>
        <ObjectStateVariable></ObjectStateVariable>
        <ArrayStateVariable></ArrayStateVariable>
        <ParentStateComponent></ParentStateComponent>
        <Link href='/labs/lab4/redux'>Redux Examples</Link>
        <hr />
        <Link href='/labs/lab4/react-context'>React context examples</Link>
      </div>
    </Provider>
  );
}
