import {
  ActionIcon,
  Flex,
  Header as MantineHeader,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { HamburgerMenu } from "@refinedev/mantine";

export const Header: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <MantineHeader
      height={50}
      p="xs"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Flex justify="space-between" align="center">
        <HamburgerMenu />
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "primary"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Flex>
    </MantineHeader>
  );
};
