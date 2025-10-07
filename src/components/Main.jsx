import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Container, Nav, Navbar} from 'react-bootstrap';
import TableUsers from './TableUsers';

export default function Main({ users, handleSignOut, onBlock, onUnblock, onDelete, onDeleteUnverified }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Container className='d-flex flex-column gap-5 vh-100 py-5'>
      <Navbar bg='bg-body-ligth' variant='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>User manager</Navbar.Brand>
          <Navbar.Toggle aria-controls='main-navbar-nav' /> 
          <Navbar.Collapse id='main-navbar-nav' className="justify-content-end">
            <Nav className='justify-content-end'>
              <Navbar.Text className='p-2 align-self-end'>
                Signed in as: <a href="#login">{currentUser?.name}</a>
              </Navbar.Text>
              <Navbar.Text className='p-2 align-self-end'>
                Email: <a href={`mailto:${currentUser?.email}`}>{currentUser?.email}</a>
              </Navbar.Text>
              <Nav.Link href='/sign-in' className='align-self-end' onClick={handleSignOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TableUsers users={users} onBlock={onBlock} onUnblock={onUnblock} onDelete={onDelete} onDeleteUnverified={onDeleteUnverified}/>
    </Container>
  );
}