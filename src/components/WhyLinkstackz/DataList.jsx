import React from 'react';

const DataList = ({ data }) => {
  return (
<div className="flex flex-col-reverse lg:flex-row items-center bg-white/5 lg:p-6 p-2 w-full h-full text-white transition duration-300 data-list-item">      
<div className="flex-1 text-center md:text-left">
        <div className="lg:text-xl text-base font-extrabold mb-2">{data.title}</div>
        <p className="text-xs lg:text-base text-gray-300">{data.desc}</p>
      </div>
      <div className="md:mt-0 2xl:ml-6 3xl:h-32 h-11 mb-5">
        <img
          src={`/images/why-linkstackz/${data.image}`}
          alt={data.title}
          className="2xl:h-32 xl:h-20 h-11 object-contain"
        />
      </div>
    </div>
  );
};

export default DataList;
