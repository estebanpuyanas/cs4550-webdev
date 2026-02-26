'use client';
import ModulesControls from './modulesControls';
import ModuleControlButtons from './moduleControlButtons';
import LessonControlButtons from './lessonControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import * as db from '../../../database';
import { v4 as uuidv4 } from 'uuid';
import { FormControl } from 'react-bootstrap';

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState('');

  const addModule = () => {
    setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName('');
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m._id !== moduleId));
  };
  const editModule = (moduleId: string) => {
    setModules(modules.map(m => (m._id === moduleId ? { ...m, editing: true } : m)));
  };
  const updateModule = (module: any) => {
    setModules(modules.map(m => (m._id === module._id ? module : m)));
  };

  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={addModule}
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
                      deleteModule={deleteModule}
                      editModule={editModule}
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
                                onChange={e => updateModule({ ...module, name: e.target.value })}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    updateModule({ ...module, editing: false });
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
