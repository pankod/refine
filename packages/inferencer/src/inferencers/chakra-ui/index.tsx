import React from "react";
import { useParsed } from "@refinedev/core";

import { ShowInferencer } from "./show.js";
import { ListInferencer } from "./list.js";
import { CreateInferencer } from "./create.js";
import { EditInferencer } from "./edit.js";

import type { InferencerComponentProps } from "../../types/index.js";

const ChakraUIInferencer: React.FC<InferencerComponentProps> = ({
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

export { ChakraUIInferencer };
export {
  ListInferencer as ChakraUIListInferencer,
  renderer as ChakraUIListRenderer,
} from "./list.js";
export {
  ShowInferencer as ChakraUIShowInferencer,
  renderer as ChakraUIShowRenderer,
} from "./show.js";
export {
  EditInferencer as ChakraUIEditInferencer,
  renderer as ChakraUIEditRenderer,
} from "./edit.js";
export {
  CreateInferencer as ChakraUICreateInferencer,
  renderer as ChakraUICreateRenderer,
} from "./create.js";
export * from "../../types/index.js";
