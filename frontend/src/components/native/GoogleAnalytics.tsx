import Script from 'next/script'

export default function GoogleAnalytics() {
   const isProduction = process.env.NODE_ENV === 'production'
   const googleID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

   if (!isProduction || !googleID) {
      return null
   }

   return (
      <>
         <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleID}`}
            strategy="afterInteractive"
         />
         <Script id="google-analytics" strategy="afterInteractive">
            {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${googleID}');
            `}
         </Script>
      </>
   )
}
