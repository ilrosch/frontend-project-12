import { useState } from 'react';
import ChannelBox from '../ChannelBox';
import MessageBox from '../MessageBox';

const defaultChannel = { name: 'general', id: 1 };

export default function ChatBox() {
  const [activeChannel, setActiveChannel] = useState(defaultChannel);
  const handleSetActiveChannel =
    (channel = defaultChannel) =>
    () =>
      setActiveChannel(channel);

  return (
    <div
      id='chatbox'
      className='d-flex p-0 bg-light shadow-sm rounded flex-wrap'
      style={{ maxHeight: 'calc(100vh - 150px)', minHeight: '250px' }}
    >
      <ChannelBox activeChannel={activeChannel} handleSetActiveChannel={handleSetActiveChannel} />
      <MessageBox activeChannel={activeChannel} />
    </div>
  );
}
