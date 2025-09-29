import React from 'react';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col, ListGroup } from 'react-bootstrap';
import { selectCurrentUser } from '../../../../store/slices/auth';
import { selectAllmessages } from '../../../../store/slices/message';
import FormMessage from '../FormMessage';
import { useTranslation } from 'react-i18next';

function ItemMessage({ msg, username }) {
  const isOwnMessage = username === msg.username;

  return (
    <ListGroup.Item className={`border-0 mb-2 d-flex ${isOwnMessage ? 'justify-content-end' : ''}`}>
      <div
        style={{ minWidth: '80px', maxWidth: '800px', width: 'fit-content', textWrap: 'balance' }}
      >
        <div className={`p-2 mb-1 rounded ${isOwnMessage ? 'bg-primary text-white' : 'bg-light'}`}>
          {msg.body}
        </div>
        <div className={`px-2 text-secondary ${isOwnMessage ? 'text-end' : 'text-start'}`}>
          {msg.username}
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default function MessageBox({ activeChannel }) {
  const { t } = useTranslation();

  const messageBox = useRef(null);
  const currentUser = useSelector(selectCurrentUser);
  const messagesChannel = useSelector(selectAllmessages).filter(
    ({ channelId }) => channelId == activeChannel.id,
  );

  useEffect(() => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }, [messagesChannel]);

  return (
    <Col className='d-flex flex-column h-100 flex-grow-1' style={{ minWidth: '300px' }}>
      <div className='px-3 py-2 border-bottom'>
        <div className='fw-bold'>{t('chat.channel', { name: activeChannel.name })}</div>
        <div>
          <div>{t('chat.countMessage', { count: messagesChannel.length })}</div>
        </div>
      </div>

      <ListGroup ref={messageBox} className='p-3 bg-white overflow-auto flex-grow-1'>
        {messagesChannel.map((msg) => (
          <ItemMessage key={`message-${msg.id}`} msg={msg} username={currentUser} />
        ))}
      </ListGroup>

      <FormMessage activeChannel={activeChannel} username={currentUser} />
    </Col>
  );
}
