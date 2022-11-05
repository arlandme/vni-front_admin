import React, { useEffect, useState } from "react";
import MainProduct from '../../components/Products/MainProduct';
import { create, remove, search, update } from '../../services/product';

export default function Products({ setTitle }) {
  useEffect(() => { setTitle('VNI - Products'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    name: '',
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
      <MainProduct data={data} error={error} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
