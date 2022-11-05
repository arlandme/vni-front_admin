import { useState } from 'react';
import Breadcrumb from '../Shared/Breadcrumbs/Breadcrumb';
import Toasts from '../Shared/Toasts/Toasts';
import Modal from './ModalSlide';
import CardTable from './SlideCardTable';

const breadcrumbs = [
  {
    title: 'Slides management',
  },
];

export default function MainSlide({ data, error, optionSearch, searchData, handlePost }) {
  const [showModal, setShowModal] = useState(false);
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
        <CardTable color={'light'} titleTable={breadcrumbs[breadcrumbs.length - 1].title} data={data} optionSearch={optionSearch} searchData={searchData} setShowModal={setShowModal} itemSelected={itemSelected} setItemSelected={setItemSelected} setTitleModal={setTitleModal} toggleToast={toggleToast} handlePost={handlePost} />
        
        {showModal && <Modal titleModal={titleModal} showModal={showModal} setShowModal={setShowModal} itemSelected={itemSelected} handlePost={handlePost} toggleToast={toggleToast} />}
        
        {showToasts && <Toasts showToasts={showToasts} toastStatus={toastStatus} />}
      </div>
    </>
  )
}