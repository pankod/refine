import { Button, Stack } from "@mantine/core";
import {
  ListButton,
  ShowButton,
  CreateButton,
  EditButton,
  CloneButton,
  DeleteButton,
  SaveButton,
  RefreshButton,
  ExportButton,
  UrlField,
  TagField,
} from "@refinedev/mantine";

const DashboardPage = () => {
  return (
    <Stack>
      <Button>Default Mantine Button</Button>
      <Button variant="outline">Default Outline Mantine Button</Button>
      <Button variant="subtle">Default Subtle Mantine Button</Button>
      <CreateButton />
      <ShowButton />
      <EditButton />
      <CloneButton />
      <DeleteButton />
      <SaveButton />
      <RefreshButton />
      <ListButton />
      <ExportButton />
      <UrlField value="https://refine.dev/" />
      <TagField value="refine" />
    </Stack>
  );
};

export default DashboardPage;
