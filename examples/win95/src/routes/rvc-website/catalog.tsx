import { Fragment } from "react";
import { useList } from "@refinedev/core";
import { Link, useNavigate, useParams } from "react-router";
import { Hourglass } from "react95";
import styled from "styled-components";
import { Browser } from "@/components/browser";
import { RVCWebsiteLayout } from "@/components/rvc-website";
import { RefineBanner } from "@/components/refine-banner";
import type { VideoTitle } from "@/types";

type Props = {
  withBrowser?: boolean;
};

export const RVCWebsiteCatalogPage = ({ withBrowser = true }: Props) => {
  const navigate = useNavigate();
  const { catalogLetter } = useParams();

  const {
    result: data,
    query: { isFetching },
  } = useList<VideoTitle>({
    resource: "titles",
    pagination: { mode: "off" },
    filters: [{ field: "title", operator: "startswith", value: catalogLetter }],
    queryOptions: { enabled: !!catalogLetter },
  });
  const titles = data?.data || [];
  const address = catalogLetter
    ? `http://www.refinevideoclub.geocities.com/catalog/${catalogLetter}.html`
    : "http://www.refinevideoclub.geocities.com/catalog";

  const Wrapper = withBrowser ? Browser : Fragment;

  return (
    <Wrapper
      title="RVC Website"
      onClose={() => navigate("/")}
      address={address}
    >
      <RVCWebsiteLayout withBrowser={withBrowser}>
        <Container>
          <div
            style={{
              marginTop: "64px",
            }}
          />
          <CatalogsList
            selectedLetter={catalogLetter}
            withBrowser={withBrowser}
          />
          {titles.length === 0 && !isFetching && (
            <div
              style={{
                color: "white",
                marginTop: "64px",
                height: "32px",
              }}
            >
              {catalogLetter
                ? `No titles found for letter ${catalogLetter}`
                : "Select a letter to see titles"}
            </div>
          )}
          {isFetching && (
            <Hourglass
              size={32}
              style={{
                marginTop: "64px",
              }}
            />
          )}
          {catalogLetter && !isFetching && !!titles.length && (
            <CatalogList>
              {titles.map((title) => (
                <CatalogListItem
                  key={title.id}
                  to={
                    withBrowser
                      ? `/browser/rvc-website/titles/${title.id}`
                      : `/rvc-website/titles/${title.id}/index.html`
                  }
                >
                  <CatalogListMarkerContainer>
                    <CatalogListMarker1 />
                    <CatalogListMarker2 />
                  </CatalogListMarkerContainer>
                  {title.title}
                </CatalogListItem>
              ))}
            </CatalogList>
          )}
          <RefineBanner
            banner="finefoods"
            style={{
              marginTop: "80px",
            }}
          />
        </Container>
      </RVCWebsiteLayout>
    </Wrapper>
  );
};

export const CatalogsList = ({
  selectedLetter,
  withBrowser = true,
}: { selectedLetter?: string; withBrowser?: boolean }) => {
  return (
    <>
      <CatalogTitle>Our Catalog</CatalogTitle>
      <CatalogButtonContainer>
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <CatalogButton key={letter} $selected={selectedLetter === letter}>
            <Link
              style={{
                width: "100%",
                height: "100%",
              }}
              to={
                withBrowser
                  ? `/browser/rvc-website/catalog/${letter}`
                  : `/rvc-website/catalog/${letter}/index.html`
              }
            >
              {letter}
            </Link>
          </CatalogButton>
        ))}
      </CatalogButtonContainer>
    </>
  );
};

const Container = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CatalogTitle = styled.h2`
  color: #ff00ff;
  font-size: 64px;
  margin-bottom: 24px;
  font-family: "pixelated-times-new-roman", "ms_sans_serif";
`;

export const CatalogButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex-wrap: wrap;
  width: 480px;
`;

export const CatalogButton = styled.button<{ $selected: boolean }>`
  appearance: none;
  padding: 0;
  font-family: "ms_sans_serif";
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ $selected }) => ($selected ? "red" : "white")};
  border: 2px solid;
  border-top-color: #707070;
  border-left-color: #707070;
  border-bottom-color: #b5b5b5;
  border-right-color: #b5b5b5;
  cursor: pointer;
`;

export const CatalogList = styled.div<{ $height?: number }>`
  margin-top: 64px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 64px;
`;

export const CatalogListItem = styled(Link)`
  width: 224px;
  color: #00ccff;
  display: flex;
  align-items: flex-start;
  line-height: 20px;
  gap: 12px;
`;

export const CatalogListMarkerContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

export const CatalogListMarker1 = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #00ccff;
  border: 1px solid #000080;
`;

export const CatalogListMarker2 = styled.div`
  z-index: 1;
  position: absolute;
  top: 6px;
  left: 6px;
  width: 12px;
  height: 12px;
  background-color: #0000ff;
`;
