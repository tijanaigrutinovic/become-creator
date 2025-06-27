const SendMessage = () => {
  return (
    <div className="bg-[rgba(0,0,0,0.6)] opacity-0 translate-y-full animate-[slideUp_12s_infinite] w-full min-w-[230px] max-h-[166px] p-4 rounded-[1.517rem] absolute bottom-0">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/Images/icons/share.svg"
          width={18}
          height={18}
          alt="share"
        />
        <div className="text-xs leading-[0.91rem] text-fullWhite capitalize">Send message</div>
      </div>
      <button
        type="button"
        className="slide-btn-mid-white mt-3"
      >
        {"pay $6 for send message"}
      </button>
      <div className="bg-[rgba(0,0,0,0.2)] w-full flex items-center justify-between mt-3 p-[0.73rem] rounded-lg text-fullWhite text-[0.643rem] leading-[0.797rem]">
        <div className="flex items-center justify-center gap-1">
          <img
            src="/Images/icons/emoji-smile.svg"
            width={14}
            height={14}
            alt="emoji-smile"
            className="text-fullWhite"
          />
          <div>Hi Dear, I love your vieos...</div>
        </div>
        <div>
          <img
            src="/Images/icons/share.svg"
            width={24}
            height={24}
            alt="share"
          />
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
