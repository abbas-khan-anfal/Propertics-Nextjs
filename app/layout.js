import { Toaster } from "react-hot-toast";
import GlobalProvider from "./context/globalProvider";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: 'Propertics | Affordable Properties in Pakistan',
  description: 'Browse budget-friendly properties across Pakistan with Propertics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      
      <head>
        {/* fontawesome cdn link */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      {/* bootstrap cdn link */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossOrigin="anonymous" />

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossOrigin="anonymous"></link>

      </head>
      <body>
        <GlobalProvider>
          <Toaster/>
          {children}
        </GlobalProvider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
