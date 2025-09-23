import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../services/slices/authSlice';
import { selectAllmessages } from '../../services/slices/messageSlice';
import FormMessage from './FormMessage';

function MessageItem({ msg, username }) {
  if (msg.username === username) {
    return (
      <div className='mb-2 ms-auto' style={{ maxWidth: '800px', width: 'fit-content' }}>
        <div className='p-2 mb-1 rounded bg-primary text-white'>{msg.body}</div>
        <div className='px-2 text-end text-secondary'>{msg.username}</div>
      </div>
    );
  }

  return (
    <div className='mb-2' style={{ maxWidth: '800px', width: 'fit-content' }}>
      <div className='p-2 mb-1 rounded bg-light'>{msg.body}</div>
      <div className='px-2 text-start text-secondary'>{msg.username}</div>
    </div>
  );
}

export default function Messages({ activeChannel }) {
  const currentUser = useSelector(selectCurrentUser);
  const messagesActiveChannel = useSelector(selectAllmessages).filter(
    ({ channelId }) => channelId == activeChannel.id,
  );

  return (
    <Col className='col-9 d-flex flex-column'>
      <div className='px-3 py-2 border-bottom'>
        <div className='fw-bold'># {activeChannel.name}</div>
        <div>{messagesActiveChannel.length} сообщений</div>
      </div>

      <div className='p-3 bg-white' style={{ flex: '1 1' }}>
        {messagesActiveChannel.map((msg) => (
          <MessageItem key={msg.id} msg={msg} username={currentUser} />
        ))}
      </div>

      <FormMessage />
    </Col>
  );
}
