const LockToView = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.6)] opacity-0 translate-y-full animate-[slideUp_12s_infinite] w-full min-w-[230px] max-h-[166px] p-4 rounded-[1.517rem] absolute bottom-0">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/Images/icons/lock.svg"
          width={18}
          height={18}
          alt="share"
        />
        <div className="text-xs leading-[0.91rem] text-fullWhite capitalize">lock to view</div>
      </div>
      <div className="text-[0.598rem] leading-[0.725rem] text-fullWhite capitalize text-center my-3">To watch the full video, you must pay $6</div>
      <button
        type="button"
        className="slide-btn-mid-white"
      >
        {"pay $6 for this post"}
      </button>
      <button
        type="button"
        className="slide-btn-mid-black mt-2"
      >
        {"subscribe $9.99 per/month"}
      </button>
    </div>
  );
}

export default LockToView;