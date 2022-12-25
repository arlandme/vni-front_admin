import { useEffect, useRef, useState } from 'react';
import { convertToPath } from '../../utils/formatString';
import { modalServiceValidator } from '../../utils/validation';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { remove, uploadSingle } from '../../services/file';

let selectedFile, selectedFileThumbnail;
export default function Modal({
  titleModal,
  itemSelected,
  showModal,
  setShowModal,
  handlePost,
  toggleToast,
}) {
  const titleRef = useRef();
  const pathRef = useRef();
  const summaryRef = useRef();

  const [thumbnailURL, setThumbnailURL] = useState('');
  const [messages, setMessages] = useState([]);
  const [listImages, setListImages] = useState([]);
  const [indexImage, setIndexImage] = useState();
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const [content, setContent] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (itemSelected && titleRef) {
      // titleRef.current.value = itemSelected.title;
      setTitle(itemSelected.title);
      pathRef.current.value = itemSelected.path ?? '';
      summaryRef.current.value = itemSelected.summary ?? '';
      setContent(itemSelected.content);
      setThumbnailURL(itemSelected.thumbnail);
      setListImages(itemSelected.listNameImages);
    } else emptyValues();
  }, [itemSelected]);

  const emptyValues = () => {
    if (titleRef) {
      // titleRef.current.value = '';
      setTitle('');
      pathRef.current.value = '';
      summaryRef.current.value = '';
      setContent('');
      // contentRef.current.value = '';
    }
  };

  const handleChangeThumbnailURL = (e) => {
    setThumbnailURL(URL.createObjectURL(e.target.files[0]));
    selectedFileThumbnail = e.target.files[0];
  };

  const handleUploadImage = async (file) => {
    let path = '';
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      await uploadSingle(formData)
        .then((res) => (path = res.data.path))
        .catch((err) => alert('Upload error!!!'));
    }

    return path;
  };

  const handleSubmit = async (e) => {
    const uuid = window.sessionStorage.getItem('uuid');
    const data = {
      ...itemSelected,
      title: title,
      path: pathRef.current.value.trim(),
      summary: summaryRef.current.value.trim(),
      content: content,
      thumbnail: thumbnailURL.trim(),
      updatedId: uuid,
    };

    if (!itemSelected) data.createId = uuid;
    else data.createdId = itemSelected.createdId[0]._id;
    if (selectedFileThumbnail)
      await handleUploadImage(selectedFileThumbnail).then(
        (res) => (data.thumbnail = res)
      );

    const validator = modalServiceValidator(data);

    const arr = [];
    setMessages(arr);
    if (validator.error) {
      validator.error.details.forEach((item) =>
        arr.push({ key: item.context.key, message: item.message })
      );

      setMessages(arr);
    } else {
      setShowModal(false);
      handlePost(data, itemSelected ? 1 : 0);
      toggleToast(true);
      selectedFileThumbnail = null;
    }
  };

  const onImageUploadBefore = async (files, info, core, uploadHandler) => {
    selectedFile = files[0];

    return files[0] && true;
  };

  const onImageUpload = (
    targetElement,
    index,
    state,
    info,
    remainingFilesCount,
    core
  ) => {
    setIsDeleteImage(false);
    setIndexImage(index);
    if (state === 'delete') setIsDeleteImage(true);
    if (selectedFile && state === 'create') {
      setIsDeleteImage(false);
      const formData = new FormData();
      formData.append('file', selectedFile);

      uploadSingle(formData)
        .then((res) => res.data.filename)
        .then((data) => {
          const arr = [...listImages, data];
          setListImages(arr);
          targetElement.setAttribute(
            'src',
            process.env.REACT_APP_API_URL + 'images/' + data
          );
        })
        .catch((err) => alert('Upload error!!!'));
    }
  };

  useEffect(() => {
    if (isDeleteImage && indexImage) {
      setIsDeleteImage(false);
      remove({
        name: listImages[indexImage],
      })
        .then((res) => {
          const arr = listImages.splice(indexImage, 1);
          setListImages(arr);
        })
        .catch((err) => alert('Deleted error!!!'));
    }
  }, [isDeleteImage, indexImage, listImages]);

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none focus:outline-none w-5/6 h-full'>
            <div className='relative w-auto my-6 mx-auto max-w-10/12 overflow-y-auto'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-2xl font-semibold'>{titleModal}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-red-500'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      <i className='fa-regular fa-times'></i>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='flex flex-wrap p-4 h-[500px] overflow-y-auto'>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Title
                      </label>
                      <input
                        ref={titleRef}
                        type='text'
                        placeholder='Title'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'title' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-1/2 px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Path
                      </label>
                      <input
                        ref={pathRef}
                        type='text'
                        placeholder='Example: name-service'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        value={convertToPath(title)}
                        disabled
                      />
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'path' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Summary
                      </label>
                      <textarea
                        ref={summaryRef}
                        placeholder='Summary'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      ></textarea>
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'summary' ? message.message : null
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
                        Thumbnail URL
                      </label>
                      <label className='block'>
                        <span className='sr-only'>Choose profile photo</span>
                        <input
                          type='file'
                          className='block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-emerald-50 file:text-emerald-700
                            hover:file:bg-emerald-100
                          '
                          accept='image/png, image/jpeg'
                          onChange={handleChangeThumbnailURL}
                        />
                      </label>

                      {/* <input
                        type='text'
                        className='border-0 px-3 py-3 placeholder-slate-200 text-slate-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                        onChange={handleChangeThumbnailURL}
                        value={thumbnailURL}
                      /> */}
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'thumbnail' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                  <div className='w-full lg:w-6/12 px-4'>
                    <div className='w-full px-4 flex'>
                      <div className='relative'>
                        <img
                          alt='...'
                          src={thumbnailURL}
                          className='shadow-xl rounded-md h-auto align-middle max-w-150-px border-2 border-red-500'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='w-full lg:w-full px-4'>
                    <div className='relative w-full mb-3'>
                      <label
                        className='block uppercase text-slate-500 text-xs font-bold mb-2'
                        htmlFor='grid-password'
                      >
                        Content
                      </label>
                      {(content !== undefined || content) && (
                        <SunEditor
                          autoFocus={false}
                          onImageUploadBefore={onImageUploadBefore}
                          onImageUpload={onImageUpload}
                          onChange={(content) => setContent(content)}
                          defaultValue={content}
                          setDefaultStyle={'height: 250px; font-size: 16px'}
                          setOptions={{
                            buttonList: [
                              [
                                'bold',
                                'underline',
                                'italic',
                                'strike',
                                'list',
                                'align',
                                'font',
                                'fontSize',
                                'formatBlock',
                                'fontColor',
                                'hiliteColor',
                                'textStyle',
                                'table',
                                'link',
                                'fullScreen',
                                'codeView',
                              ],
                            ],
                          }}
                        />
                      )}
                      <small className='text-red-500 font-medium'>
                        {messages.map((message) =>
                          message.key === 'content' ? message.message : null
                        )}
                      </small>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
