import { memo } from 'react';

const DashboardFooter = () => {
  const onClickRedirect = (url) => {
    window.location.href = url;
  }

  return (
    <div className="dashboard-footer flex flex-wrap justify-center p-5">
      <ul className="flex items-center gap-4 text-blackGrey flex-wrap">
        <li className='cursor-pointer hover:underline'><span rel="nofollow" onClick={() => onClickRedirect('/contact-us')}>Contact Us</span></li>
        <li className='cursor-pointer hover:underline'><a href="/terms-of-service">Terms of service</a></li>
        <li className='cursor-pointer hover:underline'><a href="/privacy-policy">Privacy Policy</a></li>
        <li className='cursor-pointer hover:underline'><span rel="nofollow" onClick={() => onClickRedirect('/usc-2257')}>USC 2257</span></li>
        <li className='cursor-pointer hover:underline'><span rel="nofollow" onClick={() => onClickRedirect('/complaints')}>Complaints</span></li>
        <li className='cursor-pointer'>
          <a
            href="//www.dmca.com/Protection/Status.aspx?ID=911cc469-4a66-4159-b587-92392a832b9c"
            title="DMCA.com Protection Status"
            className="dmca-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://images.dmca.com/Badges/dmca_protected_6_120.png?ID=911cc469-4a66-4159-b587-92392a832b9c"
              alt="DMCA.com Protection Status"
              width={120}
              height={46}
            />
          </a>
        </li>
        <li className='cursor-pointer hover:underline'><a href="/" className='text-midRed'>&#169;{new Date().getFullYear()} Linkstackz beta</a></li>
      </ul>
    </div>
  )
}

export default memo(DashboardFooter);