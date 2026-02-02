import React, { useEffect, useRef } from "react";

export default function AdsBanner() {
          const iframeRef = useRef(null);

          useEffect(() => {
                    const iframe = iframeRef.current;
                    if (!iframe) return;

                    // Iframe ka document access karte hain
                    const doc = iframe.contentWindow.document;

                    // Ad ka content HTML format mein
                    const adContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>body { margin: 0; padding: 0; overflow: hidden; }</style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '02f5b922143e38a672a8ff2ccddceb7f',
              'format' : 'iframe',
              'height' : 300,
              'width' : 160,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/02f5b922143e38a672a8ff2ccddceb7f/invoke.js"></script>
        </body>
      </html>
    `;

                    // Iframe ke andar content write karte hain
                    doc.open();
                    doc.write(adContent);
                    doc.close();
          }, []);

          return (
                    <div style={{ margin: "10px" }}>
                              <iframe
                                        ref={iframeRef}
                                        title="Ad Banner"
                                        width="160"
                                        height="300"
                                        style={{
                                                  border: "none",
                                                  overflow: "hidden",
                                                  display: "block",
                                        }}
                                        scrolling="no"
                              />
                    </div>
          );
}