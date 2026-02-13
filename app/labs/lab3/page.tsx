import VariableTypes from './VariablesAndConstants';
import IfElse from './IfElse';
import TernaryOperator from './TernaryOperator';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import ConditionalOutputInline from './ConditionalOutputInline';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ImpliedReturn from './ImpliedReturn';
import TemplateLiterals from './TemplateLiterals';
import SimpleArrays from './SimpleArrays';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ForLoops from './ForLoops';
import MapFunction from './MapFunction';
import FindFunction from './FindFunction';
import FindIndex from './FindIndex';
import FilterFunction from './FilterFunction';
import JsonStringify from './JsonStringify';
import House from './House';
import Spreader from './Spreader';
import Destructing from './Destructing';
import FunctionDestructing from './FunctionDestructing';
import DestructingImports from './DestructingImports';
import Classes from './Classes';
import Styles from './Styles';
import ClientComponentDemo from './ClientComponentDemo';
import ServerComponentDemo from './ServerComponentDemo';
import Add from './Add';
import Square from './Square';

export default function Lab3() {
  return (
    <div id='wd-lab3' className='container'>
      <h2>Lab 3</h2>
      <VariableTypes />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <SimpleArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingToFromArrays />
      <ForLoops />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
      <JsonStringify />
      <House />
      <Spreader />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <ClientComponentDemo />
      <ServerComponentDemo />
      <Add a={3} b={4} />

      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
    </div>
  );
}
