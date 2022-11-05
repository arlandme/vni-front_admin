import React, { useEffect, useState } from "react";
import MainSlide from '../../components/Slides/MainSlide';
import { create, remove, search, update } from '../../services/slide';

export default function Slides({ setTitle }) {
  useEffect(() => { setTitle('VNI - Slides'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    title: '',
    redirectTo: '',
    contentLink: '',
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
      <MainSlide data={data} error={error} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
