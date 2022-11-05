import { useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';
import Toasts from '../Shared/Toasts/Toasts';
import ModalRegister from './ModalRegister';
import Modal from './ModalUser';
import UserCardTable from './UserCardTable';

const breadcrumbs = [
  {
    title: 'Users management',
  },
];

export default function MainUser({ data, error, optionSearch, searchData, handlePost }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [titleModal, setTitleModal] = useState();
  const [showToasts, setShowToasts] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

  const toggleToast = (status = false) => {
    setToastStatus(status);
    setShowToasts(!showToasts);
    setTimeout(() => { setShowToasts(false) }, 2500);
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div>
        <UserCardTable color={'light'} titleTable={breadcrumbs[breadcrumbs.length - 1].title} data={data} optionSearch={optionSearch} searchData={searchData} setShowModal={setShowModal} setShowModalRegister={setShowModalRegister} itemSelected={itemSelected} setItemSelected={setItemSelected} setTitleModal={setTitleModal} toggleToast={toggleToast} handlePost={handlePost} />
        
        {showModal && <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} itemSelected={itemSelected} handlePost={handlePost} toggleToast={toggleToast} />}

        {showModalRegister && <ModalRegister titleModal={titleModal} showModalRegister={showModalRegister} setShowModalRegister={setShowModalRegister} handlePost={handlePost} toggleToast={toggleToast} error={error} />}
        
        {showToasts && <Toasts showToasts={showToasts} toastStatus={toastStatus} />}
      </div>
    </>
  )
}