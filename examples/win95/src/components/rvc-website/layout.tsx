import type { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link as ReactRouterLink } from "react-router";
import { getImagesUrl } from "@/utils/get-cdn-url";

type Props = {
  withBrowser?: boolean;
};

export const RVCWebsiteLayout = ({
  withBrowser = true,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Page>
      <Container>
        <ContainerLinkList>
          <Link>
            <ReactRouterLink
              to={
                withBrowser ? "/browser/rvc-website" : "/rvc-website/index.html"
              }
            >
              Home
            </ReactRouterLink>
          </Link>
          <Link>
            <ReactRouterLink
              to={
                withBrowser
                  ? "/browser/rvc-website/catalog"
                  : "/rvc-website/catalog/index.html"
              }
            >
              Our Catalog
            </ReactRouterLink>
          </Link>
          <Link>
            <a
              href="https://refine.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Refine Home
            </a>
          </Link>
          <Link>
            <a
              href="https://refine.dev/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </Link>
          <Link>
            <a
              href="https://refine.dev/tutorial/essentials/intro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tutorial
            </a>
          </Link>
        </ContainerLinkList>
        {children}
      </Container>
    </Page>
  );
};

const Page = styled.div`
  background-color: black;
  background-image: url(${getImagesUrl("/stars.gif")});
`;

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerLinkList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  padding: 2px;
  border: 2px solid;
  gap: 2px;
  border-top-color: #b5b5b5;
  border-left-color: #b5b5b5;
  border-bottom-color: #707070;
  border-right-color: #707070;
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 6px 12px;
  color: #00ccff;
  font-weight: bold;
  border: 2px solid;
  border-top-color: #707070;
  border-left-color: #707070;
  border-bottom-color: #b5b5b5;
  border-right-color: #b5b5b5;
`;
