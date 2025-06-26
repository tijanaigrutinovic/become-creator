
const VideoCall = () => {
  return (
    <div className="mfc-video-call item-slide">
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
      <div className="video-call-actions w-full flex items-center justify-center mt-3 gap-2">
        <div className="vc-action">
          <img
            src="/Images/icons/call-end.svg"
            width={24}
            height={24}
            alt="call-end"
            className="text-fullWhite"
          />
        </div>
        <div className="vc-action">
          <img
            src="/Images/icons/video.svg"
            width={24}
            height={24}
            alt="video"
          />
        </div>
        <div className="vc-action">
          <img
            src="/Images/icons/volume-up.svg"
            width={24}
            height={24}
            alt="volume-up"
          />
        </div>
        <div className="vc-action">
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