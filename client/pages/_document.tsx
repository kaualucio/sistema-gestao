import { Html, Head, Main, NextScript } from 'next/document'
import { getThemeStylesString, getAllCssVarsString, cssUtilities } from '@loomhq/lens'

export default function Document() {
  return ( 
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={
          {__html: getThemeStylesString('body') + getAllCssVarsString('body') + cssUtilities()}
          }></style>
      </Head>
      <body className="overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}