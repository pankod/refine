import { CloneButton } from "@/registry/new-york/refine-ui/buttons/clone";
import { CreateButton } from "@/registry/new-york/refine-ui/buttons/create";
import { DeleteButton } from "@/registry/new-york/refine-ui/buttons/delete";
import { EditButton } from "@/registry/new-york/refine-ui/buttons/edit";
import { ListButton } from "@/registry/new-york/refine-ui/buttons/list";
import { RefreshButton } from "@/registry/new-york/refine-ui/buttons/refresh";
import { ShowButton } from "@/registry/new-york/refine-ui/buttons/show";
import { Separator } from "@/registry/new-york/ui/separator";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-6">
      <div className="flex flex-col items-start justify-start gap-2">
        <h2>Navigation Buttons</h2>
        <div className="flex flex-col items-start justify-start gap-6">
          <ListButton resource="posts" />

          <CreateButton resource="posts" />

          <EditButton resource="posts" recordItemId="123" />

          <ShowButton resource="posts" recordItemId="123" />

          <CloneButton resource="posts" recordItemId="123" />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-start justify-start gap-2">
        <h2>Action Buttons</h2>
        <div className="flex flex-col items-start justify-start gap-6">
          <DeleteButton resource="posts" recordItemId="123" />
          <RefreshButton resource="posts" recordItemId="123" />
        </div>
      </div>
    </div>
  );
};
