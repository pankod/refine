import Head from "@docusaurus/Head";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { LandingAlreadyInvented } from "@site/src/refine-theme/landing-already-invented";
import { LandingCommunity } from "@site/src/refine-theme/landing-community";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";
import { LandingHeroSection } from "@site/src/refine-theme/landing-hero-section";
import { LandingPackages } from "@site/src/refine-theme/landing-packages";
import { LandingPureReactCode } from "@site/src/refine-theme/landing-pure-react-code";
import { LandingSolidFoundation } from "@site/src/refine-theme/landing-solid-foundation";
import { LandingSweetSpot } from "@site/src/refine-theme/landing-sweet-spot";
import { LandingTestimonial } from "@site/src/refine-theme/landing-testimonial";
import { LandingTrustedByDevelopers } from "@site/src/refine-theme/landing-trusted-by-developers";
import clsx from "clsx";
import React from "react";

function Home() {
  const title = "Refine Core: Open-Source Retool For Enterprise";
  return (
    <>
      <Head>
        <html data-active-page="index" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <link
          rel="preload"
          href="https://refine.new/embed-form"
          as="document"
        />
      </Head>
      <CommonLayout
        description="Open-source React framework for building enterprise-grade admin panels, internal tools, and B2B apps. Headless, flexible, and production-ready."
        className={clsx("bg-zinc-900")}
      >
        <div className={clsx()}>
          <CommonHeader showThemeToggle={false} />
          <div
            className={clsx(
              "flex flex-col",
              "gap-16 landing-sm:gap-20 landing-md:gap-28 landing-lg:gap-32",
              "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
              "px-2 landing-sm:px-0",
              "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
              "mx-auto",
            )}
          >
            <div
              className={clsx("mt-0", "landing-sm:mt-8", "landing-lg:mt-20")}
            >
              <LandingHeroSection className={clsx("mt-0")} />
              <LandingTrustedByDevelopers
                className={clsx(
                  "mt-12",
                  "landing-sm:mt-20",
                  "landing-md:mt-28",
                  "landing-lg:mt-10",
                )}
              />
            </div>
            <LandingSweetSpot />
            <div className={clsx("flex flex-col", "gap-4 landing-md:gap-1")}>
              <LandingPackages />
              <div
                className={clsx(
                  "flex flex-col landing-md:flex-row",
                  "gap-4 landing-md:gap-1",
                )}
              >
                <LandingAlreadyInvented
                  className={clsx(
                    "w-full landing-md:w-[50%] landing-lg:w-auto landing-lg:min-w-[538px]",
                  )}
                />
                <LandingPureReactCode
                  className={clsx(
                    "w-full landing-md:w-[50%] landing-lg:w-auto landing-lg:min-w-[640px]",
                  )}
                />
              </div>
            </div>
            <LandingCommunity />
            <LandingTestimonial />
            <LandingSolidFoundation />
          </div>
          <LandingFooter />
        </div>
      </CommonLayout>
    </>
  );
}

export default Home;
