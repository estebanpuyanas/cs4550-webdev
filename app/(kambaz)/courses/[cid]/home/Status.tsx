import { MdDoNotDisturbAlt } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { BiImport } from 'react-icons/bi';
import { LiaFileImportSolid } from 'react-icons/lia';
import { FaHouseChimney } from 'react-icons/fa6';
import { IoBarChart } from 'react-icons/io5';
import { IoIosMegaphone } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export default function CourseStatus() {
  return (
    <div id='wd-course-status' style={{ width: '350px' }}>
      <h2>Course Status</h2>
      <div className='d-flex'>
        <div className='w-50 pe-1'>
          <Button
            variant='secondary'
            size='lg'
            className='w-100 d-flex align-items-center justify-content-center'>
            <MdDoNotDisturbAlt className='me-2' /> Unpublish
          </Button>
        </div>
        <div className='w-50'>
          <Button
            variant='success'
            size='lg'
            className='w-100 d-flex align-items-center justify-content-center'>
            <FaCheckCircle className='me-2' /> Publish
          </Button>
        </div>
      </div>
      <br />
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <BiImport className='me-2 flex-shrink-0' /> Import Existing Content
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <LiaFileImportSolid className='me-2 flex-shrink-0' /> Import from Commons
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <FaHouseChimney className='me-2 flex-shrink-0' /> Choose Home Page
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <IoBarChart className='me-2 flex-shrink-0' /> View Course Screen
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <IoIosMegaphone className='me-2 flex-shrink-0' /> New Announcement
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <IoBarChart className='me-2 flex-shrink-0' /> New Analytics
      </Button>
      <Button variant='secondary' size='lg' className='w-100 mt-1 text-start d-flex align-items-center'>
        <FaBell className='me-2 flex-shrink-0' /> View Course Notifications
      </Button>
    </div>
  );
}
