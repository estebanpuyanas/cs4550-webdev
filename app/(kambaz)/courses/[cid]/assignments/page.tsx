import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical, IoSearchOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroupText className="bg-white">
            <IoSearchOutline />
          </InputGroupText>
          <Form.Control
            type="text"
            placeholder="Search for Assignment"
            className="border-start-0"
          />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="secondary">
            <BsPlus className="fs-4" /> Group
          </Button>
          <Button variant="danger">
            <BsPlus className="fs-4" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 ps-2 bg-secondary border-secondary">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div>
              <Badge
                bg="secondary"
                className="me-2 text-dark border border-dark"
              >
                40% of Total
              </Badge>
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-5" />
            </div>
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 ps-1 border-start border-success border-5 border-top-0 border-end-0 border-bottom-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="ms-2">
                <a href="#" className="text-dark text-decoration-none fw-bold">
                  A1
                </a>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 6 at 12:00am |
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle className="text-success fs-5" />
              <IoEllipsisVertical className="fs-5" />
            </div>
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 ps-1 border-start border-success border-5 border-top-0 border-end-0 border-bottom-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="ms-2">
                <a href="#" className="text-dark text-decoration-none fw-bold">
                  A2
                </a>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 13 at 12:00am |
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle className="text-success fs-5" />
              <IoEllipsisVertical className="fs-5" />
            </div>
          </div>
        </ListGroupItem>

        <ListGroupItem className="p-3 ps-1 border-start border-success border-5 border-top-0 border-end-0 border-bottom-0">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-secondary" />
              <LuNotebookPen className="me-2 fs-4 text-success" />
              <div className="ms-2">
                <a href="#" className="text-dark text-decoration-none fw-bold">
                  A3
                </a>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 20 at 12:00am |
                </div>
                <div className="text-muted small">
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle className="text-success fs-5" />
              <IoEllipsisVertical className="fs-5" />
            </div>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
