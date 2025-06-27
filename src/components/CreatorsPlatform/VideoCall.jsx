const VideoCall = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.6)] opacity-0 translate-y-full animate-[slideUp_12s_infinite] w-full min-w-[230px] max-h-[166px] p-4 rounded-[1.517rem] absolute bottom-0">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/Images/icons/video.svg"
          width={18}
          height={18}
          alt="video"
        />
        <div className="text-xs leading-[0.91rem] text-fullWhite capitalize">Video call</div>
      </div>
      <button
        type="button"
        className="slide-btn-mid-white mt-3"
      >
        {"pay $6 for for video call"}
      </button>
      <div className="w-full flex items-center justify-center mt-3 gap-2">
        <div className="bg-[rgba(0,0,0,0.4)] p-[0.4rem] rounded-full w-[2.3rem] h-[2.3rem] flex items-center justify-center">
          <img
            src="/Images/icons/call-end.svg"
            width={24}
            height={24}
            alt="call-end"
            className="text-fullWhite"
          />
        </div>
        <div className="bg-[rgba(0,0,0,0.4)] p-[0.4rem] rounded-full w-[2.3rem] h-[2.3rem] flex items-center justify-center bg-midRed">
          <img
            src="/Images/icons/video.svg"
            width={24}
            height={24}
            alt="video"
          />
        </div>
        <div className="bg-[rgba(0,0,0,0.4)] p-[0.4rem] rounded-full w-[2.3rem] h-[2.3rem] flex items-center justify-center">
          <img
            src="/Images/icons/volume-up.svg"
            width={24}
            height={24}
            alt="volume-up"
          />
        </div>
        <div className="bg-[rgba(0,0,0,0.4)] p-[0.4rem] rounded-full w-[2.3rem] h-[2.3rem] flex items-center justify-center">
          <img
            src="/Images/icons/voice.svg"
            width={24}
            height={24}
            alt="voice"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoCall;