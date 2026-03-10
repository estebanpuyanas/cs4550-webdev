'use client';
import ModulesControls from './modulesControls';
import ModuleControlButtons from './moduleControlButtons';
import LessonControlButtons from './lessonControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FormControl } from 'react-bootstrap';
import { addModule, editModule, updateModule, deleteModule } from './reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState('');
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className='wd-modules'>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName('');
        }}
      />
      <br />
      <br />
      <br />
      <Row>
        <Col>
          <ListGroup className='rounded-0' id='wd-modules'>
            {modules
              .filter((module: any) => module.course === cid)
              .map((module: any) => (
                <ListGroupItem key={module._id} className='wd-module p-0 mb-4 fs-5 border-gray'>
                  <div className='wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center'>
                    <div>
                      <BsGripVertical className='me-2 fs-3' /> {module.name}
                    </div>
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={moduleId => {
                        dispatch(deleteModule(moduleId));
                      }}
                      editModule={moduleId => dispatch(editModule(moduleId))}
                    />
                  </div>

                  {module.lessons && (
                    <ListGroup className='wd-lessons rounded-0'>
                      {module.lessons.map((lesson: any) => (
                        <ListGroupItem
                          key={lesson._id ?? lesson.name}
                          className='wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center'>
                          <div className='flex-grow-1'>
                            <BsGripVertical className='me-2 fs-3' />
                            {!module.editing && module.name}
                            {module.editing && (
                              <FormControl
                                className='w-50 d-inline-block'
                                onChange={e =>
                                  dispatch(updateModule({ ...module, name: e.target.value }))
                                }
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    dispatch(updateModule({ ...module, editing: false }));
                                  }
                                }}
                                defaultValue={module.name}
                              />
                            )}
                          </div>
                          <LessonControlButtons />
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
