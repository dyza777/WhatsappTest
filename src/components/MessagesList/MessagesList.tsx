import React, {useState} from 'react';
import './MessagesList.css';

function MessagesList(props: {messages: any}) {
  const renderMessage = (message: any) => {

    if (message.type == 'outgoing') {
      return (
        <div key={message.idMessage} className='MessageLine right-align'>
          <div className='MessageBox my-message'>
           <span className='MessageText'>{message.textMessage}</span>
          </div>
        </div>
        )
    }

    return (
      <div key={message.idMessage} className='MessageLine left-align'>
        <div className='MessageBox incoming-message'>
         <span className='MessageText'>{message.textMessage}</span>
        </div>
      </div>
      )

  }

  return (
    <div className="MessagesList">
      {props.messages.map((message:any) => renderMessage(message))}
    </div>
  );
}

export default MessagesList;
