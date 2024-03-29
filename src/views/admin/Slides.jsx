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
      <MainSlide data={data} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
