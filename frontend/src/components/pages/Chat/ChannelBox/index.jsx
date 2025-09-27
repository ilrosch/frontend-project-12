import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Dropdown, ListGroup } from 'react-bootstrap';
import { selectAllChannels } from '../../../../store/slices/channel';
import ConfirmModal from '../../../shared/Modal/Confirm';
import InputModal from '../../../shared/Modal/Input';
import schemas from '../../../../validation';
import handleApi from '../../../../api';
import { useTranslation } from 'react-i18next';

function ItemChannel({ channel, activeChannel, handleSetActiveChannel, handleSetIdChannel }) {
  const { t } = useTranslation();
  const variantColor = activeChannel.id == channel.id ? 'secondary' : 'light';

  function ButtonChannel() {
    return (
      <Button
        className='w-100 text-start text-wrap'
        variant={variantColor}
        onClick={handleSetActiveChannel(channel)}
      >
        {t('chat.channel', { name: channel.name })}
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
            {t('element.button.rename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleSetIdChannel(channel.id, { name: 'remove' })}>
            {t('element.button.remove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return <ButtonChannel />;
}

export default function ChannelBox({ activeChannel, handleSetActiveChannel }) {
  const { t } = useTranslation();

  const channels = useSelector(selectAllChannels);
  const [isOpenAddChannelModal, setOpenAddChannelModal] = useState(false);
  const [isOpenRenameChannelModal, setOpenRenameChannelModal] = useState(false);
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const channelBox = useRef(null);

  useEffect(() => {
    channelBox.current.scrollTop = channelBox.current.scrollHeight;
  }, [channels]);

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
    handleApi.channel.remove(selectedChannelId).then(() => {
      if (selectedChannelId === activeChannel.id) {
        handleSetActiveChannel()();
      }

      handleCloseModal('confirm')();
    });
  };

  return (
    <Col className='col-3 p-3 border-end h-100 d-flex flex-column' style={{ minWidth: '250px' }}>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div className='fs-5 fw-bold'>{t('chat.channels')}</div>
        <Button variant='outline-primary' onClick={() => setOpenAddChannelModal(true)}>
          +
        </Button>
      </div>

      <ListGroup ref={channelBox} className='overflow-auto flex-grow-1'>
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
          title={t('modal.channel.add.title')}
          label={t('modal.channel.add.field')}
          close={handleCloseModal('add')}
          handleSubmit={handleApi.channel.add}
          schema={schemas.channel(t, channels)}
          handleSetActiveChannel={handleSetActiveChannel}
        />
      )}

      {isOpenRenameChannelModal && (
        <InputModal
          title={t('modal.channel.rename.title')}
          label={t('modal.channel.rename.field')}
          channelId={selectedChannelId}
          close={handleCloseModal('rename')}
          handleSubmit={handleApi.channel.rename}
          schema={schemas.channel(t, channels)}
          handleSetActiveChannel={handleSetActiveChannel}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          title={t('modal.channel.remove.title')}
          label={t('modal.channel.remove.text')}
          close={handleCloseModal('confirm')}
          handleRemove={handleRemoveChannel}
        />
      )}
    </Col>
  );
}
