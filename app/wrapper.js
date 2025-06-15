'use client'

import { useEffect, useRef, useState } from 'react'

export default function ClickRedirectWrapper({ children }) {
          const [clickCount, setClickCount] = useState(0);
          const [adsDisabled, setAdsDisabled] = useState(false);
          const adLink = "https://www.profitableratecpm.com/jhgb2mwtp?key=fb6a85938d48a7692435c75a2aea5d42"; // change to your direct link
          // const adLink = 'https://www.kjdjasd'
          const maxClicks = 2; // Allow 1 or 2 click redirects

          const wrapperRef = useRef(null);

          useEffect(() => {
                    const handleClick = (e) => {
                              if (!adsDisabled) {
                                        setClickCount(prev => {
                                                  const newCount = prev + 1;
                                                  if (newCount <= maxClicks) {
                                                            window.open(adLink, "_blank");
                                                  }
                                                  if (newCount >= maxClicks) {
                                                            setAdsDisabled(true);
                                                  }
                                                  return newCount;
                                        });
                              }
                    };

                    const wrapper = wrapperRef.current;
                    if (wrapper) {
                              wrapper.addEventListener('click', handleClick);
                    }

                    return () => {
                              if (wrapper) {
                                        wrapper.removeEventListener('click', handleClick);
                              }
                    };
          }, [adsDisabled]);

          return (
                    <div ref={wrapperRef}>
                              {children}
                    </div>
          );
}
