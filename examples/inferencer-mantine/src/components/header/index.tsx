import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Header as MantineHeader,
  Menu,
  type Sx,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  HamburgerMenu,
  type RefineThemedLayoutHeaderProps,
} from "@refinedev/mantine";
import { IconLanguage, IconMoonStars, IconSun } from "@tabler/icons-react";
import i18n from "i18next";
import React from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({ sticky }) => {
  const { data: user } = useGetIdentity<IUser>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (sticky) {
    stickyStyles = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <Group>
          <Menu
            shadow="md"
            data-test-id="language-button"
            aria-label={currentLocale}
          >
            <Menu.Target>
              <ActionIcon variant="outline">
                <IconLanguage size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                <Menu.Item
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang);
                  }}
                  value={lang}
                  color={lang === currentLocale ? "primary" : undefined}
                  icon={
                    <Avatar
                      src={`/images/flags/${lang}.svg`}
                      size={18}
                      radius="lg"
                    />
                  }
                >
                  {lang === "en" ? "English" : "German"}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "primary"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>

          {(user?.name || user?.avatar) && (
            <Group spacing="xs">
              {user?.name && <Title order={6}>{user?.name}</Title>}
              <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
            </Group>
          )}
        </Group>
      </Flex>
    </MantineHeader>
  );
};
