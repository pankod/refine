import MDXComponents from "@theme-original/MDXComponents";

import { BannerBlog } from "@site/src/components/banner/banner-blog";
import Checklist from "@site/src/components/checklist";
import ChecklistItem from "@site/src/components/checklist-item";
import CodeSandboxExample from "@site/src/components/codesandbox-example";
import ExampleLocalPrompt from "@site/src/components/example-local-prompt";
import ExampleSourcePrompt from "@site/src/components/example-source-prompt";
import GeneralConceptsLink from "@site/src/components/general-concepts-link";
import { GlobalConfigBadge } from "@site/src/components/global-config-badge";
import { GuideBadge } from "@site/src/components/guide-badge";
import PropTag from "@site/src/components/prop-tag";
import PropsTable from "@site/src/components/props-table";
import { RouterBadge } from "@site/src/components/router-badge";
import UIConditional from "@site/src/components/ui-conditional";
import { Blockquote } from "@site/src/refine-theme/common-blockquote";
import { DocThumbsUpDownFeedbackWidget } from "@site/src/refine-theme/doc-thumbs-up-down-feedback-widget";
import { Image } from "@site/src/components/image";
import { Table, FullTable } from "@site/src/refine-theme/common-table";
import { CreateRefineAppCommand } from "@site/src/partials/npm-scripts/create-refine-app-command.tsx";
import { InstallPackagesCommand } from "@site/src/partials/npm-scripts/install-packages-commands";
import { TutorialConditional } from "@site/src/refine-theme/tutorial-conditional";
import { VideoInView } from "@site/src/components/video-in-view";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Details from "./details";
import Summary from "./summary";

export default {
  ...MDXComponents,
  Checklist: Checklist,
  ChecklistItem: ChecklistItem,
  UIConditional: UIConditional,
  PropsTable: PropsTable,
  PropTag: PropTag,
  details: Details,
  summary: Summary,
  Tabs,
  TabItem,
  blockquote: Blockquote,
  GeneralConceptsLink,
  CodeSandboxExample,
  ExampleLocalPrompt,
  ExampleSourcePrompt,
  BannerBlog,
  GuideBadge,
  RouterBadge,
  GlobalConfigBadge,
  Image,
  img: Image,
  table: Table,
  CreateRefineAppCommand: CreateRefineAppCommand,
  InstallPackagesCommand: InstallPackagesCommand,
  FullTable: FullTable,
  TutorialConditional,
  VideoInView: VideoInView,
  DocThumbsUpDownFeedbackWidget,
};
