import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../Shared/ConfirmDialog/Confirm';
import Pagination from '../Shared/Pagination/Pagination';

// components

export default function CardTable({
  color,
  titleTable,
  data,
  optionSearch,
  searchData,
  itemSelected,
  setItemSelected,
  setShowModal,
  setTitleModal,
  toggleToast,
  handlePost,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentItems, setCurrentItems] = useState();

  const titleRef = useRef();
  const redirectRef = useRef();
  const contentLinkRef = useRef();

  const handleSearch = (event) => {
    searchData({
      ...optionSearch,
      title: titleRef.current.value,
      redirectTo: redirectRef.current.value,
      contentLink: contentLinkRef.current.value,
    });
  };

  const handleShowConfirm = (item) => {
    setShowConfirm(true);
    setItemSelected(item);
  };

  const handleDelete = () => {
    setShowConfirm(false);
    handlePost(itemSelected, 2);
    toggleToast(true);
  };

  return (
    <>
      <Confirm
        showConfirm={showConfirm}
        setShowConfirm={setShowConfirm}
        handleDelete={handleDelete}
        toggleToast={toggleToast}
      />
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-sky-900 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-2 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-slate-500' : 'text-white')
                }
              >
                {titleTable}
              </h3>
            </div>
            <button
              className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => {
                setTitleModal('Creating');
                setItemSelected();
                setShowModal(true);
              }}
            >
              <i className='fas fa-plus'></i> Add new
            </button>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  <input
                    ref={titleRef}
                    type='text'
                    className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Title'
                    onChange={handleSearch}
                  />
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  <input
                    ref={contentLinkRef}
                    type='text'
                    className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Content of the link'
                    onChange={handleSearch}
                  />
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  <input
                    ref={redirectRef}
                    type='text'
                    className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Redirect to'
                    onChange={handleSearch}
                  />
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                ></th>
              </tr>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  #
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Title
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Content of the link
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Order
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Redirect to
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  background image
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ' +
                    (color === 'light'
                      ? 'bg-slate-50 text-slate-400 border-slate-100'
                      : 'bg-sky-800 text-sky-300 border-sky-700')
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                      <span
                        className={
                          'font-bold ' +
                          +(color === 'light' ? 'text-slate-500' : 'text-white')
                        }
                      >
                        {index + 1}
                      </span>
                    </th>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-medium'>
                      {item.title}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      {item.contentLink}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      {item.order}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      {item.redirectTo}
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4'>
                      <div className='flex'>
                        <img
                          src={
                            item.backgroundImage
                          }
                          alt='...'
                          className='w-30 h-20 rounded-md border-2 border-slate-50 shadow'
                        ></img>
                      </div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          className='bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => {
                            setTitleModal('Updating');
                            setItemSelected(item);
                            setShowModal(true);
                          }}
                        >
                          <i className='fa-regular fa-pencil'></i>
                        </button>
                        <button
                          className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs py-2 px-3 rounded shadow hover:shadow-md outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                          type='button'
                          onClick={() => handleShowConfirm(item)}
                        >
                          <i className='fa-regular fa-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={1000} className='text-center p-2 font-medium'>
                  <Pagination data={data} setCurrentItems={setCurrentItems} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
