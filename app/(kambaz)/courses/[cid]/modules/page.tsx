'use client';
import ModulesControls from './modulesControls';
import ModuleControlButtons from './moduleControlButtons';
import LessonControlButtons from './lessonControlButtons';
import { BsGripVertical } from 'react-icons/bs';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import * as db from '../../../database';

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;

  return (
    <div>
      <ModulesControls />
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
                    <ModuleControlButtons />
                  </div>

                  {module.lessons && (
                    <ListGroup className='wd-lessons rounded-0'>
                      {module.lessons.map((lesson: any) => (
                        <ListGroupItem
                          key={lesson._id ?? lesson.name}
                          className='wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center'>
                          <div className='flex-grow-1'>
                            <BsGripVertical className='me-2 fs-3' /> {lesson.name}
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
