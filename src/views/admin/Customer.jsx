import React, { useEffect, useState } from "react";
import MainCustomer from '../../components/Customers/MainCustomer';
import { create, remove, search, update } from '../../services/customer';

export default function Customer({ setTitle }) {
  useEffect(() => { setTitle('VNI - Customers'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    name: '',
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
      <MainCustomer data={data} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
