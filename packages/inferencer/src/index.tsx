export { createInferencer } from "./create-inferencer/index.js";

export { SharedCodeViewer } from "./components/shared-code-viewer/index.js";

export {
  jsx,
  accessor,
  componentName,
  dataProviderFromResource,
  shouldDotAccess,
  getAccessorKey,
  dotAccessor,
  getFieldableKeys,
  getOptionLabel,
  getVariableName,
  isIDKey,
  noOp,
  prettyString,
  toPlural,
  toSingular,
  printImports,
  removeRelationSuffix,
  idQuoteWrapper,
} from "./utilities/index.js";

export type {
  AdditionalScopeType,
  CodeViewerProps,
  CreateInferencer,
  CreateInferencerConfig,
  FieldInferencer,
  FieldTransformer,
  ImportElement,
  InferField,
  InferType,
  InferencerComponentProps,
  InferencerResultComponent,
  RecordField,
  RendererContext,
} from "./types/index.js";
