import type { API, FileInfo } from "jscodeshift";
import { renameUseFormQueryResultAndMutationResult } from "./rename-query-and-mutation-result/use-form-query-and-mutation-result";
import { renameUseSelectQueryResult } from "./rename-query-and-mutation-result/use-select-query-result";
import { renameUseShowQueryResult } from "./rename-query-and-mutation-result/use-show-query-result";
import { renameUseSimpleListQueryResult } from "./rename-query-and-mutation-result/use-simple-list-query-result";
import { renameUseTableQueryResult } from "./rename-query-and-mutation-result/use-table-query-result";

export const parser = "tsx";

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const source = j(file.source);

  renameUseFormQueryResultAndMutationResult(j, source);
  renameUseSelectQueryResult(j, source);
  renameUseShowQueryResult(j, source);
  renameUseSimpleListQueryResult(j, source);
  renameUseTableQueryResult(j, source);

  return source.toSource();
}
