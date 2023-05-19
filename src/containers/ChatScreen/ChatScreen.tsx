import React, {useState, useRef} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import connector from './ChatScreen.connector';
import Form from 'react-bootstrap/Form';
import {Box} from 'rebass';
import Button from 'react-bootstrap/Button';
import MessagesList from '../../components/MessagesList/MessagesList';
import './ChatScreen.css';

function ChatScreen(props: {idInstance: string, apiTokenInstance: string, chatterNumber: string, sendMessage: any, getChatMessages: any, messagesList: any}) {
  const [messagesList, setMessagesList] = useState(props.messagesList);
  const [inputValue, setInputValue] = useState("");
  const [chatterNumber, setChatterNumber] = useState(props.chatterNumber);
  const [phoneInputValue, setPhoneInputValue] = useState("");

  React.useEffect(() => {
    setMessagesList(props.messagesList);
  }, [props.messagesList]);

  React.useEffect(() => {
    setChatterNumber(props.chatterNumber);
  }, [props.chatterNumber]);

  React.useEffect(() => {
    if (!chatterNumber) return;
    setInterval(() =>  props.getChatMessages(props.idInstance, props.apiTokenInstance, chatterNumber + "@c.us"), 565000);
  }, [chatterNumber]);

  if (props.idInstance == "") {
    return <Navigate to="/" replace />;
  }

  const sendMessage = () => {
    if (inputValue.length < 1) return;

    props.sendMessage(props.idInstance, props.apiTokenInstance, chatterNumber + "@c.us", inputValue);
    setInputValue("");
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (!chatterNumber) {
    const confirmChatterNumber=() => {
      if (phoneInputValue.length != 11) return;
      props.getChatMessages(props.idInstance, props.apiTokenInstance, phoneInputValue + "@c.us");
    }

    return (
      <div className="ChatScreen">
        <Header />
        <div className="Enter-number-block" >
            <Form.Group controlId="formBasicEmail">
              <Form.Label className='Phone-block-title'>Введите номер телефона собеседника
              с кодом города и страны без "+"</Form.Label>
            </Form.Group>
            <Box>
              <Form.Control onKeyDown={handleKeyDown} value={phoneInputValue} onChange={(e) => setPhoneInputValue(e.target.value)} className='Phone-Input-field' as='input' placeholder="79991234567" />
            </Box>
            <Button onClick={confirmChatterNumber} className='Login-button' variant="primary" type="submit">
                Подтвердить
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="ChatScreen">
        <Header />
        <div className="Chat-content" >
          <div className="Chat-block">
            <div className="Chat-Title-block">
              <span className='Chat-Title-number'>{props.chatterNumber}</span>
            </div>
            <div className="Chat-Messages-block">
              <MessagesList messages={messagesList}/>
            </div>
            <div className="Chat-Input-block">
              <Box flex={1}/>
              <Box flex={10}>
                <Form.Control onKeyDown={handleKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='Chat-Input-field' as='input' placeholder="Введите сообщение..." />
              </Box>
              <Box flex={3}>
                <Button onClick={sendMessage} className='Send-button' variant="primary">
                  Отправить
                </Button>
              </Box> 
              </div>
          </div>
        </div>
    </div>
  );
}

export default connector(ChatScreen);
