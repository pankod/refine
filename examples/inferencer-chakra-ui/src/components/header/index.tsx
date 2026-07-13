import {
  Avatar,
  Box,
  type BoxProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HamburgerMenu,
  type RefineThemedLayoutHeaderProps,
} from "@refinedev/chakra-ui";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { IconLanguage, IconMoon, IconSun } from "@tabler/icons-react";
import i18n from "i18next";
import React from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({ sticky }) => {
  const { data: user } = useGetIdentity<IUser>();

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark",
  );

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  let stickyProps: BoxProps = {};
  if (sticky) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <HamburgerMenu />

      <HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            data-test-id="language-button"
            aria-label={currentLocale}
            icon={<IconLanguage />}
            variant="ghost"
          />
          <MenuList>
            {[...(i18n.languages ?? [])].sort().map((lang: string) => (
              <MenuItem
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                }}
                value={lang}
                color={lang === currentLocale ? "green" : undefined}
                icon={
                  <Avatar src={`/images/flags/${lang}.svg`} h={18} w={18} />
                }
              >
                {lang === "en" ? "English" : "German"}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <IconButton
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "light" ? IconMoon : IconSun}
            w="24px"
            h="24px"
          />
        </IconButton>

        {(user?.avatar || user?.name) && (
          <HStack>
            {user?.name && (
              <Text size="sm" fontWeight="bold">
                {user.name}
              </Text>
            )}
            <Avatar size="sm" name={user?.name} src={user?.avatar} />
          </HStack>
        )}
      </HStack>
    </Box>
  );
};
