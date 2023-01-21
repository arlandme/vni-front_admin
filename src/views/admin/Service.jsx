import React, { useEffect, useState } from "react";
import MainService from '../../components/Services/MainService';
import { create, remove, search, update } from '../../services/service';

export default function Services({ setTitle }) {
  useEffect(() => { setTitle('VNI - Services'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    title: '',
  });
  const [data, setData] = useState();


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
          return create(option).then(res => searchData(optionSearch));
        case 1:
          return update(option).then(res => searchData(optionSearch));
        case 2:
          return remove(option).then(res => searchData(optionSearch));
        default:
          break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <MainService data={data} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
