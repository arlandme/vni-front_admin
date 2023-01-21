import React, { useEffect } from "react";

// components

// import CardLineChart from "../../components/Cards/CardLineChart";
// import CardBarChart from "../../components/Cards/CardBarChart";
// import CardPageVisits from "../../components/Cards/CardPageVisits";
// import CardSocialTraffic from "../../components/Cards/CardSocialTraffic";
import HeaderStats from '../../components/Shared/Headers/HeaderStats';

export default function Dashboard({ setTitle }) {
  useEffect(() => { setTitle('VNI - Dashboard'); }, [setTitle]);

  return (
    <div className='w-full mx-auto min-h-screen-75'>
      <HeaderStats/>
      {/* <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
    </div>
  );
}
