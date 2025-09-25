import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Dropdown, ListGroup } from 'react-bootstrap';
import { selectAllChannels } from '../../../services/slices/channelSlice';
import { handleSubmitForm, removeChannel } from '../../../api/channel';
import { formAddChannelSchema } from '../../../services/schemas';
import ConfirmModal from '../../Modal/ConfirmModal';
import InputModal from '../../Modal/InputModal';

function ItemChannel({ channel, activeChannel, handleSetActiveChannel, handleSetIdChannel }) {
  const variantColor = activeChannel.id == channel.id ? 'secondary' : 'light';

  function ButtonChannel() {
    return (
      <Button
        className='w-100 text-start'
        variant={variantColor}
        onClick={handleSetActiveChannel(channel)}
      >
        # {channel.name}
      </Button>
    );
  }

  if (channel.removable) {
    return (
      <Dropdown className='d-flex'>
        <ButtonChannel />

        <Dropdown.Toggle
          id={`dropdown-channel-${channel.id}`}
          variant={variantColor}
          style={{ marginLeft: '-10px' }}
        />

        <Dropdown.Menu className='dropdown-menu-custom'>
          <Dropdown.Item
            onClick={handleSetIdChannel(channel.id, { name: 'rename', value: channel.name })}
          >
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item onClick={handleSetIdChannel(channel.id, { name: 'remove' })}>
            Удалить
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return <ButtonChannel />;
}

export default function ChannelBox({ activeChannel, handleSetActiveChannel }) {
  const channels = useSelector(selectAllChannels);
  const [isOpenAddChannelModal, setOpenAddChannelModal] = useState(false);
  const [isOpenRenameChannelModal, setOpenRenameChannelModal] = useState(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const handleCloseModal = (name) => () => {
    switch (name) {
      case 'add':
        return setOpenAddChannelModal(false);
      case 'rename':
        return setOpenRenameChannelModal(false);
      case 'confirm':
        return setOpenConfirmModal(false);
      default:
        return;
    }
  };

  const handleSetIdChannel = (channelId, options) => () => {
    switch (options.name) {
      case 'rename':
        setSelectedChannelId(channelId);
        setOpenRenameChannelModal(true);
        break;
      case 'remove':
        setSelectedChannelId(channelId);
        setOpenConfirmModal(true);
        break;
      default:
        return;
    }
  };

  const handleRemoveChannel = () => {
    removeChannel(selectedChannelId).then(() => {
      if (selectedChannelId === activeChannel.id) {
        handleSetActiveChannel()();
      }

      handleCloseModal('confirm')();
    });
  };

  return (
    <Col className='col-3 p-3 border-end h-100 d-flex flex-column'>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div className='fs-5 fw-bold'>Каналы</div>
        <Button variant='outline-primary' onClick={() => setOpenAddChannelModal(true)}>
          +
        </Button>
      </div>

      <ListGroup className='overflow-auto flex-grow-1'>
        {channels.map((channel) => (
          <ListGroup.Item key={`channel-${channel.id}`} className='border-0 p-0'>
            <ItemChannel
              channel={channel}
              activeChannel={activeChannel}
              handleSetActiveChannel={handleSetActiveChannel}
              handleSetIdChannel={handleSetIdChannel}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>

      {isOpenAddChannelModal && (
        <InputModal
          title='Добавить канал'
          label='Название канала'
          close={handleCloseModal('add')}
          handleSubmit={handleSubmitForm('add-channel')}
          schema={formAddChannelSchema(channels)}
          handleSetActiveChannel={handleSetActiveChannel}
        />
      )}

      {isOpenRenameChannelModal && (
        <InputModal
          title='Переименовать канал'
          label='Название канала'
          channelId={selectedChannelId}
          close={handleCloseModal('rename')}
          handleSubmit={handleSubmitForm('rename-channel')}
          schema={formAddChannelSchema(channels)}
          handleSetActiveChannel={handleSetActiveChannel}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          title='Удалить канал'
          text='Уверены?'
          close={handleCloseModal('confirm')}
          handleRemove={handleRemoveChannel}
        />
      )}
    </Col>
  );
}
