import { useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image, Navbar, FloatingLabel} from 'react-bootstrap';
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function ChangePassword ({onChangePass, onValidate, validState}) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = onValidate(e);
    if (!isValid) return;
    onChangePass(password, token);
    setPassword('');
  }

  return (
    <Container className="container-background">
      <Row className=''>
        <Col xs={6} className='py-1 min-w-320px d-flex flex-column vh-100 column-background'>
          <Form
            noValidate
            validated={validState}
            className='flex-grow-1 py-5 d-flex flex-column justify-content-center align-self-center w-296px'
            name='changePass'
            onSubmit={handleSubmit}>
              <h2 className='text-start mb-5'>Enter a new password</h2>
              <Form.Group className="mb-3" controlId="formGroupPassword" style={{ position: 'relative' }} >
                <FloatingLabel controlId="floatingPassword" label="Password">
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
            <Button type='submit' variant='primary'>Change password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}