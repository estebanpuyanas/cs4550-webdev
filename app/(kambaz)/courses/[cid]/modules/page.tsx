'use client';
import ModulesControls from './modulesControls';
import ModuleControlButtons from './moduleControlButtons';
import LessonControlButtons from './lessonControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormControl } from 'react-bootstrap';
import { addModule, editModule, updateModule, deleteModule, setModules } from './reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import * as client from '../../client';

export default function Modules() {
  const { cid } = useParams();

  const [moduleName, setModuleName] = useState('');
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  const dispatch = useDispatch();

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid, module);
    const newModules = modules.map((m: any) => (m._id === module._id ? module : m));
    dispatch(setModules(newModules));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className='wd-modules'>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <Row>
        <Col>
          <ListGroup className='rounded-0' id='wd-modules'>
            {modules.map((module: any) => (
              <ListGroupItem key={module._id} className='wd-module p-0 mb-4 fs-5 border-gray'>
                <div className='wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center'>
                  <div>
                    <BsGripVertical className='me-2 fs-3' /> {module.name}
                  </div>
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={moduleId => onRemoveModule(moduleId)}
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
                                  onUpdateModule({ ...module, editing: false });
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
