import { useState } from "react";
import styled from "styled-components";
import { LinkDoubleClick } from "@/components/link-double-click";
import { getImagesUrl } from "@/utils/get-cdn-url";

export const HomePage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Container>
      {links.map((link) => (
        <AppLink
          to={link.link}
          key={link.label}
          onClick={() => setSelected(link.label)}
          selected={selected === link.label}
        >
          <AppIcon src={link.iconURL} alt={link.label} />
          <AppLabel>{link.label}</AppLabel>
        </AppLink>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 12px;
  gap: 40px;
`;

const AppLink = styled(LinkDoubleClick)<{ selected: boolean }>`
  width: 120px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: ${({ selected }) =>
    selected ? "0 0 0 1px black" : "0 0 0 1px transparent"};
`;

const AppIcon = styled.img`
  width: 64px;
  height: 64px;
  aspect-ratio: 1 / 1;
`;

const AppLabel = styled.div`
  color: white;
  text-align: center;
`;

const links = [
  {
    label: "Refine Video Club",
    link: "/video-club",
    iconURL: `${getImagesUrl("/refine-video-club-app-icon.png")}`,
  },
  {
    label: "RVC Website",
    link: "/browser/rvc-website",
    iconURL: `${getImagesUrl("/rvc-website-app-icon.png")}`,
  },
];
