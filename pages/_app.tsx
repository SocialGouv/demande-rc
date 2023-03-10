import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Link from "next/link";

import { fr } from "@codegouvfr/react-dsfr";
import { createNextDsfrIntegrationApi } from "@codegouvfr/react-dsfr/next-pagesdir";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import { useStyles } from "tss-react/dsfr";
import {
  Display,
  headerFooterDisplayItem,
} from "@codegouvfr/react-dsfr/Display";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { init } from "@socialgouv/matomo-next";
import Head from "next/head";

// Only in TypeScript projects
declare module "@codegouvfr/react-dsfr" {
  interface RegisterLink {
    Link: typeof Link;
  }
}

//const { MuiDsfrThemeProvider } = createMuiDsfrThemeProvider();

const { withDsfr, dsfrDocumentApi } = createNextDsfrIntegrationApi({
  defaultColorScheme: "system",
  doPersistDarkModePreferenceWithCookie: true,
  //Link,
  preloadFonts: [
    //"Marianne-Light",
    //"Marianne-Light_Italic",
    "Marianne-Regular",
    //"Marianne-Regular_Italic",
    "Marianne-Medium",
    //"Marianne-Medium_Italic",
    "Marianne-Bold",
    //"Marianne-Bold_Italic",
    //"Spectral-Regular",
    //"Spectral-ExtraBold"
  ],
});

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({
    key: "css",
  });

export { dsfrDocumentApi, augmentDocumentWithEmotionCache };

const brandTop = (
  <>
    République
    <br />
    Française
  </>
);

const homeLinkPops = {
  href: "/",
  title:
    "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
};

//const bottomLinks = [];

function App({ Component, pageProps }: AppProps) {
  const { css } = useStyles();

  const router = useRouter();

  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL ?? "",
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "",
    });
  }, []);

  return (
    <>
      <MuiDsfrThemeProvider>
        <Head>
          <title>Simulation d&apos;indemnité de rupture conventionnelle</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Informations sur la rupture conventionnelle"
          />
        </Head>
        <Header
          brandTop={brandTop}
          serviceTitle="Simulation d'indemnité de rupture conventionnelle"
          serviceTagline=""
          homeLinkProps={homeLinkPops}
          navigation={[
            {
              text: "Accueil",
              linkProps: {
                href: "/",
              },
              isActive: router.asPath === "/",
            },
          ]}
          quickAccessItems={[headerFooterDisplayItem]}
        />
        <div
          className={css({
            margin: "auto",
            maxWidth: 1000,
            ...fr.spacing("padding", {
              topBottom: "10v",
            }),
          })}
        >
          <Component {...pageProps} />
        </div>
        <Footer
          brandTop={brandTop}
          accessibility="non compliant"
          contentDescription={`Pour obtenir des informations complémentaires sur vos droits, vous pouvez appeler le 0\u00A0800\u00A0730\u00A0958.`}
          homeLinkProps={homeLinkPops}
          bottomItems={[/*...bottomLinks, */ headerFooterDisplayItem]}
        />
        <Display />
      </MuiDsfrThemeProvider>
    </>
  );
}

export default withAppEmotionCache(withDsfr(App));
