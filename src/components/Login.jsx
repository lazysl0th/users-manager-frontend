import { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Navbar, FloatingLabel, InputGroup} from 'react-bootstrap';
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Login({onAuth, onValidate, validState}) {
  const [authData, setAuthData] = useState({
    password: '',
    email: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const {email, password, remember} = authData;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAuthData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleChangeCheckbox = (e) =>
    setAuthData(prev => ({
      ...prev,
      remember: e.target.checked
    }))

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = onValidate(e);
    if (!isValid) return;
    onAuth(authData);
    setAuthData({password: '', email: '', remember: false});
  }

  return (
    <Container className='container-background'>
      <Row>
        <Col xs={6} className='py-1 min-w-320px d-flex flex-column vh-100 column-background' >
          <Form 
            noValidate
            validated={validState}
            className='flex-grow-1 py-5 d-flex flex-column justify-content-center align-self-center w-296px'
            name='login'
            onSubmit={handleSubmit}>
              <p className='text-start mb-0'>Start your journey</p>
              <h2 className='text-start mb-5'>Sign In to The App</h2>
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
                    placeholder="name@example.com" 
                    value={email ? email : ''} 
                    onChange={handleChange}/>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a valid email address
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword" style={{ position: 'relative' }} >
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control 
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    minLength={1}
                    required
                    placeholder="Password" 
                    value={password ? password : ''}
                    onChange={handleChange}/>
                  <Form.Control.Feedback type='invalid'>
                    Password must be at least 1 characters long
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="secondary"
                  onClick={() => setShowPassword(prev => !prev)}
                  style={{
                    position: 'absolute',
                    top: '1.15rem',
                    right: '0.7rem',
                    padding: 0,
                    fontSize: '0.85rem',
                    userSelect: 'none',
                    background: 'white',
                    border: 'none',
                    boxShadow: 'none',
                    color: '#6c757d',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </Button>
              </Form.Group>
                <Form.Check 
                  className='align-self-start mb-3'
                  type='checkbox'
                  checked={remember}
                  name='remember'
                  id='remember-input'
                  label='Remember me'
                  onChange={handleChangeCheckbox}/>
              <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Navbar className="py-3 bg-body-ligth">
              <Container>
                <Navbar.Collapse className="justify-content-start">
                  <Navbar.Text>
                    Don't have an account? <a className='fw-normal text-decoration-underline text-primary' href="/sign-up">Sign up</a>
                  </Navbar.Text>
                </Navbar.Collapse> 
                <Navbar.Toggle />
                <a className='fw-normal text-decoration-underline text-primary' href="/reset-password">Forgot password?</a>
              </Container>
            </Navbar>
        </Col>
      </Row>
    </Container>
  );
}