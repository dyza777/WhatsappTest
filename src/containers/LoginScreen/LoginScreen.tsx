import Header from '../../components/Header/Header';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './LoginScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import connector from './LoginScreen.connector';
import { useNavigate } from "react-router-dom";

function LoginScreen(props: {idInstance: string, apiTokenInstance: string, getUserInfo: any, isWrongCredentialsError: boolean, isLoading: boolean}) {
  const [currentIdInstance, setIdInstance] = useState(props.idInstance);
  const [currentApiTokenInstance, setApiTokenInstance] = useState(props.apiTokenInstance);
  const [isCurrentWrongCredentialsError, setIsWrongCredentialsError] = useState(props.isWrongCredentialsError);
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsWrongCredentialsError(props.isWrongCredentialsError);
    setIsLoading(props.isLoading);
    
    if (props.apiTokenInstance!= "" && props.idInstance != "") {
      navigate('/chat');
    }
  }, [props.isWrongCredentialsError, props.isLoading, props.apiTokenInstance, props.idInstance])

  const submitCredentials = (event: React.FormEvent) => {
    event.preventDefault();

    if (currentIdInstance.length < 1 || currentIdInstance.length < 1) return;

    props.getUserInfo(currentIdInstance, currentApiTokenInstance);
  }

  const errorMessage : string = isCurrentWrongCredentialsError ? 'Неверные данные! Попробуйте ввести еще раз.' : ' ';

  return (
    <div className="LoginScreen">
      <Header />
      <div className="LoginScreen-content">
          <div className="App-title-block">
            <span className="App-title">WHATSAPP TEST</span>
          </div>
          <div className="Login-block">
            <Form className='Login-form' onSubmit={submitCredentials}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className='Login-block-title'>Введите данные пользователя</Form.Label>
              </Form.Group>
              <InputGroup className="Login-fields">
                <Form.Group className="mb-3 Login-input" controlId="formBasicEmail">
                  <Form.Label>idInstance</Form.Label>
                  <Form.Control onChange={(event) => setIdInstance(event.target.value)} placeholder="idInstance..." />
                </Form.Group>
                <Form.Group className="mb-3 Login-input" controlId="formBasicPassword">
                  <Form.Label>idTokenInstance</Form.Label>
                  <Form.Control onChange={(event) => setApiTokenInstance(event.target.value)} placeholder="idTokenInstance..." />
                  <Form.Label className='Login-error-line'>{errorMessage}</Form.Label>
                </Form.Group>
              </InputGroup>
              
              <Button className='Login-button' variant="primary" type="submit">
                Войти
              </Button>
            </Form>
            {isLoading && <div className='Loading-popup'><Spinner animation="border" /></div>}
          </div>
      </div>
    </div>
  );
}

export default connector(LoginScreen);
