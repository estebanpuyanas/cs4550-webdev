import ModulesControls from "./modulesControls";
import ModuleControlButtons from "./moduleControlButtons";
import LessonControlButtons from "./lessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <Row>
        <Col>
          <ListGroup className="rounded-0" id="wd-modules">
            <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> Week 1
                </div>
                <ModuleControlButtons />
              </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> Introduction to the
                    course
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> What is web
                    development?
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> Week 2
                </div>
                <ModuleControlButtons />
              </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> The History of HTML
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> Styling Web Apps
                    with CSS
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" /> Week 3
                </div>
                <ModuleControlButtons />
              </div>
              <ListGroup className="wd-lessons rounded-0">
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> Dynamic Data
                    Handling with TypeScript
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
                <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" /> The ORM
                  </div>
                  <LessonControlButtons />
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}
