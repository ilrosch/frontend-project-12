import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Dropdown, ListGroup } from 'react-bootstrap';
import { selectAllChannels, selectChannelById } from '../../../../store/slices/channel';
import ConfirmModal from '../../../shared/Modal/Confirm';
import InputModal from '../../../shared/Modal/Input';
import schemas from '../../../../validation';
import handleApi from '../../../../api';
import { useTranslation } from 'react-i18next';
import { createToastPromise } from '../../../../utils/toast';

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
        >
          <span className='visually-hidden'>{t('chat.controlChannel')}</span>
        </Dropdown.Toggle>

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

  const initValueModalRename = useSelector((state) =>
    selectedChannelId ? selectChannelById(state, selectedChannelId)?.name : '',
  );

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

  const handleChannel = {
    add: async (value) => {
      const res = await createToastPromise(handleApi.channel.add(value), {
        pending: t('toast.channel.add.pending'),
        success: t('toast.channel.add.success'),
      });

      handleSetActiveChannel(res)();
    },
    rename: async (value) => {
      const res = await createToastPromise(handleApi.channel.rename(value, selectedChannelId), {
        pending: t('toast.channel.rename.pending'),
        success: t('toast.channel.rename.success'),
      });

      handleSetActiveChannel(res)();
    },
    remove: async () => {
      await createToastPromise(handleApi.channel.remove(selectedChannelId), {
        // pending: t('toast.channel.remove.pending'),
        success: t('toast.channel.remove.success'),
        error: t('toast.channel.remove.error'),
      });

      if (selectedChannelId === activeChannel.id) {
        handleSetActiveChannel()();
      }

      handleCloseModal('confirm')();
    },
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
          title={'modal.channel.add.title'}
          label={'modal.channel.add.field'}
          close={handleCloseModal('add')}
          schema={schemas.channel(t, channels)}
          handleSubmit={handleChannel.add}
        />
      )}

      {isOpenRenameChannelModal && (
        <InputModal
          title={'modal.channel.rename.title'}
          label={'modal.channel.rename.field'}
          initValue={initValueModalRename}
          close={handleCloseModal('rename')}
          schema={schemas.channel(t, channels)}
          handleSubmit={handleChannel.rename}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          title={'modal.channel.remove.title'}
          text={'modal.channel.remove.text'}
          close={handleCloseModal('confirm')}
          handleRemove={handleChannel.remove}
        />
      )}
    </Col>
  );
}
