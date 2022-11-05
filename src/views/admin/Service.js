import React, { useEffect, useState } from "react";
import MainService from '../../components/Services/MainService';
import { create, remove, search, update } from '../../services/service';

export default function Services({ setTitle }) {
  useEffect(() => { setTitle('VNI - Services'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    title: '',
  });
  const [data, setData] = useState();
  const [error, setError] = useState();

  // Get data
  useEffect(() => {
    searchData(optionSearch)
  }, [optionSearch]);

  const searchData = (option) => {
    search(option).then((res) => setData(res)).catch((err) => console.log(err.message));
  }

  const handlePost = (option, action) => {
    if (option)
    {
      switch (action) {
        case 0:
          create(option).then(res => searchData(optionSearch)).catch(err => setError(err));
          break;
        case 1:
          update(option).then(res => searchData(optionSearch));
          break;
        case 2:
          remove(option).then(res => searchData(optionSearch));
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <MainService data={data} error={error} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
