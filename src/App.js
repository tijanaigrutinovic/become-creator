import React, { useState, useEffect } from 'react';
import './App.css';
import CreatorsPlatform from './components/CreatorsPlatform/CreatorsPlatform';
import TrustedCreators from './components/TrustedCreators/TrustedCreators';
import MoreWaysToEarn from './components/MoreWaysToEarn/MoreWaysToEarn';
import MobileFrame from './components/Common/MobileFrame';
import WhyLinkstackz from './components/WhyLinkstackz/index';
import AnalyzeFans from './components/AnalyzeFans/index';
import BioLink from './components/BioLink/index';
import Faq from './components/Faq/index';
import SnapScrollContainer from './components/Common/SnapScrollContainer';

function BecomeCreator() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div style={{ height: '100vh', background: '#111' }}></div>;
  }

  // SVE sekcije idu u SnapScrollContainer
  const snapSections = [
    { id: 'section2', content: <TrustedCreators />, skipSnapScroll: true },
    { id: 'more-ways-section', content: <MoreWaysToEarn />, skipSnapScroll: true },
    { id: 'why-linkstackz-section', content: <WhyLinkstackz /> },
    { id: 'section5', content: <AnalyzeFans /> },
    { id: 'section6', content: <BioLink /> },
    { id: 'section7', content: <Faq /> },
  ];

  return (
    <>
      <CreatorsPlatform />
      <SnapScrollContainer sections={snapSections} />
    </>
  );
}

export default BecomeCreator;
