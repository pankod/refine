import ast1Before from "./markdown-ast-1-before.json";
import ast1After from "./markdown-ast-1-after.json";
import ast2Before from "./markdown-ast-2-before.json";
import ast2After from "./markdown-ast-2-after.json";

import { transform } from "../../plugins/thumbs-up-down-feedback-widget";

it("should add thumbs up down feedback widget to the below of each heading", () => {
  expect(1).toEqual(1);

  const ast1 = ast1Before;
  const ast2 = ast2Before;

  transform(ast1Before);
  transform(ast2Before);

  expect(ast1).toEqual(ast1After);
  expect(ast2).toEqual(ast2After);
});
