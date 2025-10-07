import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Image, Navbar, FloatingLabel, InputGroup} from 'react-bootstrap';

export default function ResetPassword({onResPass, onValidate, validState}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = onValidate(e);
    if (!isValid) return;
    onResPass(email);
    setEmail('');
    navigate('/');
  }

  return (
    <Container className='container-background'>
      <Row className=''>
        <Col xs={6} className='py-1 min-w-320px d-flex flex-column vh-100 column-background'>
          <Form 
            noValidate
            validated={validState}
            className='flex-grow-1 py-5 d-flex flex-column justify-content-center align-self-center w-296px'
            name='resetPass'
            onSubmit={handleSubmit}>
              <h2 className='text-start mb-5'>Enter your email</h2>
              <Form.Group className="mb-3" controlId="formGroupEmail" >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control 
                    type="email" 
                    name="email"
                    required
                    placeholder="" 
                    value={email ? email : ''} 
                    onChange={handleChange}/>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a valid email address
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Button type='submit' variant='primary'>Reset password</Button>
            </Form>
            <Navbar className="py-3 bg-body-ligth">
              <Container>
                <Navbar.Collapse className="justify-content-start">
                  <Navbar.Text>
                    Account already exist? <a className='fw-normal text-decoration-underline text-primary' href="/sign-in">Sign in</a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </Col>
      </Row>
    </Container>
  );
}