import React from "react";
import { useParsed } from "@refinedev/core";

import { ShowInferencer } from "./show.js";
import { ListInferencer } from "./list.js";
import { CreateInferencer } from "./create.js";
import { EditInferencer } from "./edit.js";

import type { InferencerComponentProps } from "../../types/index.js";

const MantineInferencer: React.FC<InferencerComponentProps> = ({
  action: actionFromProps,
  id: idFromProps,
  ...props
}) => {
  const { action, id } = useParsed();

  switch (actionFromProps ?? action) {
    case "show":
      return <ShowInferencer {...props} id={idFromProps ?? id} />;
    case "create":
      return <CreateInferencer {...props} id={idFromProps ?? id} />;
    case "edit":
      return <EditInferencer {...props} id={idFromProps ?? id} />;
    default:
      return <ListInferencer {...props} id={idFromProps ?? id} />;
  }
};

export { MantineInferencer };
export {
  ShowInferencer as MantineShowInferencer,
  renderer as MantineShowRenderer,
} from "./show.js";
export {
  EditInferencer as MantineEditInferencer,
  renderer as MantineEditRenderer,
} from "./edit.js";
export {
  ListInferencer as MantineListInferencer,
  renderer as MantineListRenderer,
} from "./list.js";
export {
  CreateInferencer as MantineCreateInferencer,
  renderer as MantineCreateRenderer,
} from "./create.js";
export * from "../../types/index.js";
