import { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  
  // Separate state for each section
  const [retrieveId, setRetrieveId] = useState('1');
  const [removeId, setRemoveId] = useState('1');
  const [updateTodo, setUpdateTodo] = useState({
    id: '1',
    title: 'NodeJS Assignment',
  });
  const [descriptionTodo, setDescriptionTodo] = useState({
    id: '1',
    description: 'Create a NodeJS server with ExpressJS',
  });
  const [completionTodo, setCompletionTodo] = useState({
    id: '1',
    completed: false,
  });

  return (
    <div id='wd-working-with-arrays'>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id='wd-retrieve-todos' className='btn btn-primary' href={API}>
        Get Todos{' '}
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className='mb-3'>
        <a
          id='wd-retrieve-todo-by-id'
          className='btn btn-primary float-end'
          href={`${API}/${retrieveId}`}>
          Get Todo by ID
        </a>
        <FormControl
          id='wd-todo-id'
          value={retrieveId}
          className='w-50'
          onChange={e => setRetrieveId(e.target.value)}
        />
        <div className='clearfix'></div>
      </div>
      <hr />
      <h3>Filtering Array Items</h3>
      <a
        id='wd-retrieve-completed-todos'
        className='btn btn-primary'
        href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />
      <h3>Creating new Items in an Array</h3>
      <a id='wd-create-new-todo' className='btn btn-primary' href={`${API}/create`}>
        Create Todo
      </a>
      <hr />
      <h3>Removing from an Array</h3>
      <div className='mb-3'>
        <a
          id='wd-remove-todo'
          className='btn btn-primary float-end'
          href={`${API}/${removeId}/delete`}>
          Remove Todo with ID = {removeId}{' '}
        </a>
        <FormControl
          value={removeId}
          className='w-50'
          onChange={e => setRemoveId(e.target.value)}
        />
        <div className='clearfix'></div>
      </div>
      <hr />
      <h3>Updating an Item in an Array</h3>
      <div className='mb-3'>
        <a href={`${API}/${updateTodo.id}/title/${updateTodo.title}`} className='btn btn-primary float-end'>
          Update Todo
        </a>
        <FormControl
          value={updateTodo.id}
          className='w-25 float-start me-2'
          onChange={e => setUpdateTodo({ ...updateTodo, id: e.target.value })}
        />
        <FormControl
          value={updateTodo.title}
          className='w-50 float-start'
          onChange={e => setUpdateTodo({ ...updateTodo, title: e.target.value })}
        />
        <div className='clearfix'></div>
      </div>
      <hr />
      <h3>Updating a TODO Item Description</h3>
      <div className='mb-3'>
        <a
          href={`${API}/${descriptionTodo.id}/description/${descriptionTodo.description}`}
          className='btn btn-primary float-end'>
          Update a TODO Description
        </a>
        <FormControl
          value={descriptionTodo.id}
          className='w-25 float-start me-2'
          onChange={e => setDescriptionTodo({ ...descriptionTodo, id: e.target.value })}
        />
        <FormControl
          value={descriptionTodo.description}
          className='w-25 float-start me-2'
          onChange={e => setDescriptionTodo({ ...descriptionTodo, description: e.target.value })}
        />
        <div className='clearfix'></div>
      </div>
      <hr />
      <h3>Updating a TODO Item Completion Status</h3>
      <div className='mb-3'>
        <a
          href={`${API}/${completionTodo.id}/completed/${completionTodo.completed}`}
          className='btn btn-primary float-end'>
          Update a TODO Completion Status
        </a>
        <FormControl
          value={completionTodo.id}
          className='w-25 float-start me-2'
          onChange={e => setCompletionTodo({ ...completionTodo, id: e.target.value })}
        />
        <Form.Check
          id='wd-assignment-completed'
          type='checkbox'
          label='Completed'
          className='float-start'
          checked={completionTodo.completed}
          onChange={e => setCompletionTodo({ ...completionTodo, completed: e.target.checked })}
        />
        <div className='clearfix'></div>
      </div>
      <hr />
    </div>
  );
}
