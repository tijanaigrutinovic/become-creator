
const MobileHeader = () => {
  return (
    <div className="mf-header flex items-center justify-between">
      <div className="mfh-user-details flex gap-x-2 items-center justify-start">
        <div className="profile-pic">
          <img
            src="/Images/become-creator/creators-platform/mf-header-profile-pic.svg"
            width={35}
            height={35}
            alt="user-profile"
          />
        </div>
        <div className="user-info text-fullWhite">
          <div className="text-[0.648rem] font-bold capitalize">emma wantson</div>
          <div className="text-[0.556rem] font-medium capitalize leading-[0.674rem]">
            <span>@emmamusic</span>
            <span className="text-midBlack">4:50 PM</span>
          </div>
        </div>
      </div>
      <div className="mfh-user-actions flex items-center justify-end gap-x-2">
        <img
          src="/Images/icons/call.svg"
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
          src="/Images/icons/share.svg"
          width={16}
          height={16}
          alt="share"
        />
      </div>
    </div>
  );
}

export default MobileHeader;
