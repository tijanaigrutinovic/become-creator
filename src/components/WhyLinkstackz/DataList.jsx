const DataList = ({
  data
}) => {
  return (
    <div
      className="data-item flex flex-col md:flex-row items-center justify-between h-full w-full bg-white/5 p-[30px]"
    >
      
        <div className="max-w-[270px] d-details flex-1 flex flex-col justify-center text-center md:text-left">
          <div className="d-title text-2xl font-black mb-2 text-white">{data?.title || ""}</div>
          <div className="d-desc text-lg font-normal max-w-[16rem] text-gray-200 mx-auto md:mx-0">{data?.desc || ""}</div>
        </div>
        <div className="d-icon mb-4 md:mb-0 md:ml-8 flex items-center md:pr-8">
        <img
          src={`/images/why-linkstackz/${data?.image}`}
          className="tcs-img-slide"
          width={80}
          height={80}
          alt=""
        />
      </div>
    </div>
  );
}

export default DataList;
