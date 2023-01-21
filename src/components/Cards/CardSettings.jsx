import React, { useEffect, useRef, useState } from 'react';
import { capitalize } from '../../utils/formatString';
import { modalUserValidator } from '../../utils/validation';
import Toasts from '../Shared/Toasts/Toasts';

// components

export default function CardSettings({ user, updateUser }) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();

  const [avatarURL, setAvatarURL] = useState('');
  const [messages, setMessages] = useState([]);
  const [showToasts, setShowToasts] = useState(false);
  const [toastStatus, setToastStatus] = useState(false);

  useEffect(() => {
    if (user && firstNameRef) {
      firstNameRef.current.value = user.firstName;
      lastNameRef.current.value = user.lastName;
      emailRef.current.value = user.email;
      setAvatarURL(user.avatar);
    } else emptyValues();
  }, [user]);

  const emptyValues = () => {
    if (firstNameRef) {
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      emailRef.current.value = '';
    }
  };

  const handleChangeAvatarURL = (e) => {
    if (e.target.value.trim()) {
      setAvatarURL(e.target.value.trim());
    } else setAvatarURL(user?.avatar);
  };

  const handleSubmit = (e) => {
    const data = {
      ...user,
      firstName: capitalize(firstNameRef.current.value),
      lastName: capitalize(lastNameRef.current.value),
      avatar: avatarURL.trim(),
      email: emailRef.current.value.trim(),
    };

    const validator = modalUserValidator(data);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setMessages(arr);
    } else {
      updateUser(data);
      toggleToast(true);
    }
  };

  const toggleToast = (status = false) => {
    setToastStatus(status);
    setShowToasts(!showToasts);
    setTimeout(() => {
      setShowToasts(false);
    }, 2500);
  };

  return (
    <>
      {showToasts && (
        <Toasts showToasts={showToasts} toastStatus={toastStatus} />
      )}
      <div className='w-full lg:w-8/12 px-4'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-50 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <h6 className='text-slate-500 text-xl font-bold'>My account</h6>
              <button
                className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'
                type='button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
            <form>
              <h6 className='text-slate-400 text-sm mt-3 mb-6 font-bold uppercase'>
                User Information
              </h6>
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Username
                    </label>
                    <input
                      type='text'
                      className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      defaultValue={user?.username}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Email address
                    </label>
                    <input
                      ref={emailRef}
                      type='email'
                      className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      defaultValue='jesse@example.com'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'email' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      First Name
                    </label>
                    <input
                      ref={firstNameRef}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      defaultValue='Lucky'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'firstName' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Last Name
                    </label>
                    <input
                      ref={lastNameRef}
                      type='text'
                      className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      defaultValue='Jesse'
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'lastName' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
                <div className='w-full lg:w-12/12 px-4'>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-slate-500 text-xs font-bold mb-2'
                      htmlFor='grid-password'
                    >
                      Avatar URL
                    </label>
                    <input
                      type='text'
                      className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      onChange={handleChangeAvatarURL}
                      value={avatarURL}
                    />
                    <small className='text-red-500 font-medium'>
                      {messages.map((message) =>
                        message.key === 'avatar' ? message.message : null
                      )}
                    </small>
                  </div>
                </div>
              </div>

              <hr className='mt-6 border-b-1 border-slate-200' />

              {/* <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      City
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="New York"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="United States"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="Postal Code"
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-slate-200" />

              <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-500 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      About me
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-4/12 px-4'>
        <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16'>
          <div className='px-6'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-4 flex justify-center'>
                <div className='relative'>
                  <img
                    alt='...'
                    src={
                      avatarURL ??
                      require('../../assets/img/team-2-800x800.jpg')
                    }
                    className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                  />
                </div>
              </div>
              <div className='w-full px-4 text-center mt-20'>
                <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                  <div className='mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-500'>
                      0
                    </span>
                    <span className='text-sm text-slate-300'>...</span>
                  </div>
                  <div className='mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-500'>
                      0
                    </span>
                    <span className='text-sm text-slate-300'>...</span>
                  </div>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-slate-500'>
                      0
                    </span>
                    <span className='text-sm text-slate-300'>...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center mt-6 pb-6'>
              <h3 className='text-xl font-bold leading-normal mb-2 text-red-600'>
                {user?.firstName} {user?.lastName}
              </h3>
              <div className='text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase'>
                <i className='fa-solid fa-user-gear mr-2 text-lg text-slate-400'></i>{' '}
                Administrator
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
