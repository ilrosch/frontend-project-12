import { Button, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectAllChannels } from '../../services/slices/channelSlice';
import { useState } from 'react';
import Messages from './Messages';

const ListItem = ({ item, activeChannel, setActiveChannel }) => (
  <ListGroup.Item className='border-0 p-0'>
    <Button
      variant={activeChannel.id == item.id ? 'secondary' : 'light'}
      className='w-100 text-start'
      onClick={() => setActiveChannel({ name: item.name, id: item.id })}
    >
      # {item.name}
    </Button>
  </ListGroup.Item>
);

export default function Channels() {
  const channels = useSelector(selectAllChannels);
  const [activeChannel, setActiveChannel] = useState({ name: 'general', id: 1 });

  return (
    <div className='d-flex p-0 bg-light shadow-sm rounded'>
      <Col className='col-3 p-3 border-end h-100'>
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <div className='fs-5 fw-bold'>Каналы</div>
          <Button variant='outline-primary'>+</Button>
        </div>

        <ListGroup>
          {channels.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              activeChannel={activeChannel}
              setActiveChannel={setActiveChannel}
            />
          ))}
        </ListGroup>
      </Col>

      <Messages activeChannel={activeChannel} />
    </div>
  );
}
