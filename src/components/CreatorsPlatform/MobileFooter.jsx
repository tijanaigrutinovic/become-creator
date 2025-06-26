
const MobileFooter = () => {
  return (
    <div className="mf-footer flex items-center justify-between mt-6">
      <div className="mff-info text-[0.554rem] leading-[.900rem] font-semibold capitalize w-[11.4rem]">I love music and singing, start together. Sing aloud with me. come along</div>
      <div className="mfff-user-actions flex items-center justify-end gap-x-2">
        <img
          src="/Images/icons/hart.svg"
          width={16}
          height={16}
          alt="call"
        />
        <img
          src="/Images/icons/separator.svg"
          width={6}
          height={8.49}
          alt="separator"
        />
        <img
          src="/Images/icons/chat.svg"
          width={16}
          height={16}
          alt="share"
        />
      </div>
    </div>
  );
}

export default MobileFooter;
