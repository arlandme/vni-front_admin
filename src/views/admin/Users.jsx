import React, { useEffect, useState } from "react";
import MainUser from '../../components/Users/MainUser';
import { register, remove, search, update } from '../../services/auth';


export default function Users({ setTitle }) {
  const token = window.sessionStorage.getItem('USER_TOKEN');
  useEffect(() => { setTitle('VNI - Users'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });
  const [data, setData] = useState();
  const [error, setError] = useState();

  // Get data
  
  const searchData = (option) => {
    search(option, token).then((res) => setData(res)).catch((err) => console.log(err.message));
  }

  useEffect(() => {
    searchData(optionSearch);
  }, [optionSearch]);

  const handlePost = (option, action) => {
    if (option)
    {
      switch (action) {
        case 0:
          register(option).then(res => searchData(optionSearch)).catch(err => setError(err));
          break;
        case 1:
          update(option, token).then(res => searchData(optionSearch));
          break;
        case 2:
          remove(option, token).then(res => searchData(optionSearch));
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <MainUser data={data} error={error} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
