import { useCallback, useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { useList, useNavigation } from "@refinedev/core";
import { Link, useNavigate } from "react-router";
import { Counter } from "react95";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as ISwiper } from "swiper/types";
import "swiper/css";
import { Browser } from "@/components/browser";
import { ImagePixelated } from "@/components/image-pixelated";
import { RVCWebsiteLayout } from "@/components/rvc-website";
import { RefineBanner } from "@/components/refine-banner";
import { getTMDBImgLink } from "@/utils/get-tmdb-img-link";
import type { VideoTitle } from "@/types";
import { getImagesUrl } from "@/utils/get-cdn-url";
import { CatalogsList } from "./catalog";

type Props = {
  withBrowser?: boolean;
};

export const RVCWebsitePageHome = ({ withBrowser = true }: Props) => {
  const navigate = useNavigate();

  const Wrapper = withBrowser ? Browser : Fragment;

  return (
    <Wrapper
      title="RVC Website"
      onClose={() => navigate("/")}
      address="http://www.refinevideoclub.geocities.com/index.html"
    >
      <RVCWebsiteLayout withBrowser={withBrowser}>
        <Hero>
          <HeroVideoTape
            src={`${getImagesUrl("/video-tape-1.gif")}`}
            alt="video tape"
          />
          <HeroImage
            src={`${getImagesUrl("/video-club-hero.png")}`}
            alt="rvc logo"
          />
          <HeroVideoTape
            src={`${getImagesUrl("/video-tape-2.gif")}`}
            style={{
              willChange: "transform",
              transform: "scaleX(-1)",
            }}
            alt="video tape"
          />
        </Hero>
        <HeroTitle>“The best way to rent movies”</HeroTitle>
        <HeroDescription>
          We provide our members with more than 5.000 movie titles. If you want
          to watch the newest titles or the cinema classics at the comfort of
          your home, join our 1.500 happy members!
        </HeroDescription>

        <NewGif src={`${getImagesUrl("/new.gif")}`} alt="new" />
        <NewTitles withBrowser={withBrowser} />

        <Top10Gif src={`${getImagesUrl("/top10.gif")}`} alt="top10" />
        <TopTitles withBrowser={withBrowser} />

        <SeparatorGif
          src={`${getImagesUrl("/separator.gif")}`}
          alt="separator"
          dir="left"
        />

        <CatalogsList withBrowser={withBrowser} />

        <SeparatorGif
          src={`${getImagesUrl("/separator.gif")}`}
          alt="separator"
          dir="right"
        />

        <RefineBanner banner="crm" />
        <AdvertisementBanners />
      </RVCWebsiteLayout>
    </Wrapper>
  );
};

const NewTitles = (props: {
  withBrowser?: boolean;
}) => {
  const [controlledSwiper, setControlledSwiper] = useState<ISwiper | null>(
    null,
  );

  const { result: data } = useList<VideoTitle>({
    resource: "titles",
    sorters: [{ field: "created_at", order: "desc" }],
    pagination: { currentPage: 1, pageSize: 10 },
  });
  const titles = data?.data;

  return (
    <SwiperContainer>
      <SwiperButton
        src={`${getImagesUrl("/arrow1.gif")}`}
        alt="left-arrow"
        dir="left"
        onClick={() => controlledSwiper?.slidePrev()}
      />
      <Swiper
        modules={[Controller]}
        controller={{ control: controlledSwiper }}
        onSwiper={(swiper) => setControlledSwiper(swiper)}
        slidesPerView={5}
        loop={!!titles?.length}
      >
        {titles?.map((title) => (
          <SwiperSlide key={title.id}>
            <TitleContainer
              to={
                props.withBrowser
                  ? `/browser/rvc-website/titles/${title.id}`
                  : `/rvc-website/titles/${title.id}/index.html`
              }
            >
              <TitleImage
                src={getTMDBImgLink({
                  path: title.poster_path,
                })}
              />
              <TitleLabel>{title.title}</TitleLabel>
            </TitleContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperButton
        src={`${getImagesUrl("/arrow1.gif")}`}
        alt="right-arrow"
        dir="right"
        onClick={() => controlledSwiper?.slideNext()}
      />
    </SwiperContainer>
  );
};

const TopTitles = (props: {
  withBrowser?: boolean;
}) => {
  return (
    <TopTitlesContainer>
      {TOP_TITLES.map((title) => (
        <TitleContainer
          key={title.id}
          to={
            props.withBrowser
              ? `/browser/rvc-website/titles/${title.id}`
              : `/rvc-website/titles/${title.id}/index.html`
          }
        >
          <TitleImage
            src={getTMDBImgLink({
              path: title.poster_path,
            })}
          />
          <TitleLabel>{title.title}</TitleLabel>
        </TitleContainer>
      ))}
    </TopTitlesContainer>
  );
};

const AdvertisementBanners = () => {
  const [githubStarCount, setGithubStarCount] = useState(0);

  const fetchGithubCount = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetch(
        "https://stargate.refine.dev/community-numbers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        },
      );

      const json = await response.json();
      setGithubStarCount(json.githubStarCount);
    } catch (error) {}
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    fetchGithubCount(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchGithubCount]);

  return (
    <div
      style={{
        marginTop: "56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <img src={`${getImagesUrl("/Video.gif")}`} alt="tape" />
        <img
          src={`${getImagesUrl("/vcr_md_wht.gif")}`}
          alt="vcr"
          style={{
            width: "208px",
            height: "96px",
          }}
        />
        <img
          src={`${getImagesUrl("/Video.gif")}`}
          alt="tape"
          style={{
            transform: "scaleX(-1)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            color: "white",
          }}
        >
          You are the visitor number:
        </div>
        <Counter value={githubStarCount} minLength={6} />
        <div
          style={{
            color: "white",
          }}
        >
          High quality service, happy members!
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "40px",
        }}
      >
        <img
          src={`${getImagesUrl("/gc_icon.gif")}`}
          alt="geocities"
          style={{
            width: "176px",
          }}
        />
        <img
          src={`${getImagesUrl("/FPCreated.gif")}`}
          alt="microsoft"
          style={{
            width: "228px",
          }}
        />
        <img
          src={`${getImagesUrl("/explorer.gif")}`}
          alt="internet explorer"
          style={{
            width: "176px",
          }}
        />
      </div>
    </div>
  );
};

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  margin-top: 32px;
`;

const HeroImage = styled.img`
  width: 376px;
  height: 144px;
`;

const HeroVideoTape = styled.img`
  width: 200px;
  height: 182px;
`;

const HeroTitle = styled.h1`
  font-family: "pixelated-times-new-roman", "ms_sans_serif";
  color: #ffff00;
  font-size: 64px;
  line-height: 40px;
  margin-top: 40px;
`;

const HeroDescription = styled.p`
  max-width: 440px;
  color: #ffffff;
  margin-top: 16px;
  text-align: center;
  line-height: 20px;
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: 224px;
  margin-top: 32px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 40px;

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SwiperButton = styled.img<{ dir: "left" | "right" }>`
  display: block;
  width: 62px;
  height: 62px;
  transform: rotate(${({ dir }) => (dir === "left" ? "0deg" : "180deg")});
  cursor: pointer;
`;

const TitleContainer = styled(Link)`
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  gap: 8px;
`;

const TitleImage = styled(ImagePixelated)`
  display: block;
  width: 120px;
  height: 180px;
  aspect-ratio: 120 / 180;
`;

const TitleLabel = styled.h2`
  color: #00ccff;
  text-align: center;
`;

const TopTitlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  margin-top: 24px;
`;

const NewGif = styled.img`
  width: 120px;
  height: 30px;
  margin-top: 64px;
`;

const Top10Gif = styled.img`
  width: 232px;
  height: 80px;
  margin-top: 80px;
`;

const SeparatorGif = styled.img<{ dir: "left" | "right" }>`
  transform: rotate(${({ dir }) => (dir === "left" ? "0deg" : "180deg")});
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const TOP_TITLES = [
  {
    id: 162,
    poster_path: "/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    title: "Jurassic Park",
  },
  {
    id: 17,
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    title: "Pulp Fiction",
  },
  {
    id: 106,
    poster_path: "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
    title: "Die Hard",
  },
  {
    id: 19,
    poster_path: "/5M0j0B18abtBI5gi2RhfjjurTqb.jpg",
    title: "Terminator 2: Judgment Day",
  },
  {
    id: 12,
    poster_path: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    title: "The Lion King",
  },
  {
    id: 769,
    poster_path: "/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    title: "Home Alone",
  },
  {
    id: 21,
    poster_path: "/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    title: "Back to the Future",
  },
  {
    id: 48,
    poster_path: "/2162lAT2MP36MyJd2sttmj5du5T.jpg",
    title: "Interview with the Vampire",
  },
  {
    id: 226,
    poster_path: "/yaHnZqJvsSddOKYxf4zCj2Ww2hA.jpg",
    title: "Ace Ventura",
  },
  {
    id: 9,
    poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    title: "Toy Story",
  },
];
