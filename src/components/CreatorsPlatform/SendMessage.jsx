
const SendMessage = () => {
  return (
    <div className="mfc-send-message item-slide">
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
      <div className="send-message-action">
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
