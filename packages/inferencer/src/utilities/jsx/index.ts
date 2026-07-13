const handleExpression = (expression: unknown) => {
  if (!expression) {
    return "";
  }

  if (Array.isArray(expression)) {
    return expression.join("");
  }

  if (typeof expression === "string") {
    return expression;
  }

  if (typeof expression === "object") {
    return expression.toString();
  }

  if (typeof expression === "function") {
    return expression.toString();
  }

  if (typeof expression === "number") {
    return String(expression);
  }

  if (typeof expression === "boolean" && expression) {
    return "true";
  }

  return expression;
};

/**
 * This is a hacky helper to allow syntax highlighting to work in the template literals. (`renderer` function in inferencers)
 * Additionally, it parses expressions like jsx does.
 */
export const jsx = (
  strings: TemplateStringsArray,
  ...expressions: unknown[]
) => {
  const parsed = strings.reduce(
    (result, currentString, i) =>
      `${result}${currentString}${handleExpression(expressions[i])}`,
    "",
  );

  return parsed.trim();
};
