import React from "react";
import matter from "gray-matter";
import boxen from "boxen";

import type { Announcement } from "../../definitions/announcement";
import { markedTerminalRenderer } from "@utils/marked-terminal-renderer";

const ANNOUNCEMENT_URL =
  "https://raw.githubusercontent.com/refinedev/refine/main/packages/cli/ANNOUNCEMENTS.md";

const ANNOUNCEMENT_DELIMITER = "---announcement";

const splitAnnouncements = (feed: string) => {
  const sections = feed.split(ANNOUNCEMENT_DELIMITER);

  return sections
    .slice(1)
    .map((section) => `${ANNOUNCEMENT_DELIMITER}${section}`);
};

const parseAnnouncement = (raw: string): Announcement => {
  const fixed = raw.replace(ANNOUNCEMENT_DELIMITER, "---");
  const parsed = matter(fixed);
  const content = (
    parsed.content.length === 0
      ? fixed.replace(/---/g, "")
      : parsed.content.replace(/---/g, "")
  ).trim();

  return {
    ...parsed.data,
    content,
  } as Announcement;
};

export const getAnnouncements = async () => {
  try {
    const response = await fetch(ANNOUNCEMENT_URL)
      .then((res) => res.text())
      .catch(() => "");

    const announcements = splitAnnouncements(response).map((section) =>
      parseAnnouncement(section),
    );

    return announcements;
  } catch (_) {
    return [];
  }
};

export const printAnnouncements = async () => {
  const announcements = await getAnnouncements();

  const visibleAnnouncements = announcements.filter(
    (a) => Boolean(a.hidden) === false,
  );

  if (visibleAnnouncements.length === 0) {
    return;
  }

  const stringAnnouncements = visibleAnnouncements
    .map((a) => {
      const dash = visibleAnnouncements.length > 1 ? "— " : "";
      const content = markedTerminalRenderer(a.content);
      return `${dash}${content}`;
    })
    .join("")
    .trim();

  console.log(
    boxen(stringAnnouncements, {
      padding: 1,
      margin: 0,
      borderStyle: "round",
      borderColor: "blueBright",
      titleAlignment: "left",
    }),
  );
};
