import { useState } from "react";
import { Container, Row, Col, Form, Button, Image, Navbar, FloatingLabel} from 'react-bootstrap';
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Register ({onReg,  onValidate, validState}) {
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const {name, email, password} = regData;

  const handleChange = (e) => {
      const {name, value} = e.target;
      setRegData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = onValidate(e);
    if (!isValid) return;
    onReg({name, email, password});
    setRegData({name: '', email: '', password: ''});
  }

  return (
    <Container className="container-background">
      <Row className=''>
        <Col xs={6} className='py-1 min-w-320px d-flex flex-column vh-100 column-background'>
          <Form
            noValidate
            validated={validState}
            className='flex-grow-1 py-5 d-flex flex-column justify-content-center align-self-center w-296px'
            name='register'
            onSubmit={handleSubmit}>
              <p className='text-start mb-0'>Start your journey</p>
              <h2 className='text-start mb-5'>Sign Up to The App</h2>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <FloatingLabel
                  controlId="floatingInputName"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" 
                    name="name"
                    required
                    minLength={1}
                    placeholder="Name" 
                    value={name ? name : ''} 
                    onChange={handleChange}/>
                  <Form.Control.Feedback type='invalid'>
                    Please enter your name (at least 1 characters)
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInputEmail"
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
                <Form.Group className="mb-3" controlId="formGroupPassword" style={{ position: 'relative' }} >
                  <FloatingLabel controlId="floatingLabelPassword" label="Password">
                    <Form.Control 
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      minLength={1}
                      required placeholder="Password" 
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
              </Form.Group>
              <Button type='submit' variant='primary'>Sign Up</Button>
            </Form>
            <Navbar className="py-3 bg-body-ligth">
              <Container>
                <Navbar.Collapse className="justify-content-start">
                  <Navbar.Text>
                    Account already exist? <a className='fw-normal text-decoration-underline text-primary' href="/sign-in">Sign in</a>
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