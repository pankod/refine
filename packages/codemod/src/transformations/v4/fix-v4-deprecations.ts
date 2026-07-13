import type {
  JSCodeshift,
  Collection,
  ObjectExpression,
  Property,
  Identifier,
  ObjectProperty,
  BooleanLiteral,
  JSXAttribute,
  JSXExpressionContainer,
  ArrayExpression,
} from "jscodeshift";

export const parser = "tsx";

const configToSpreadConfig = (j: JSCodeshift, source: Collection) => {
  const useListHooks = source.find(j.CallExpression, {
    callee: {
      name: "useList",
    },
  });

  useListHooks.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    const firstArg = p.node.arguments[0];
    if (!firstArg || firstArg.type !== "ObjectExpression") {
      return p.node;
    }

    const configProperty = (firstArg as ObjectExpression).properties.find(
      (p: Property) => (p.key as Identifier).name === "config",
    );

    if (!configProperty) {
      return p.node;
    }

    const propertiesWithoutConfig = (
      firstArg as ObjectExpression
    ).properties.filter(
      (p: Property) => (p.key as Identifier).name !== "config",
    );

    const configProperties = (
      (configProperty as ObjectProperty).value as ObjectExpression
    ).properties;

    p.node.arguments = [
      j.objectExpression([...propertiesWithoutConfig, ...configProperties]),
    ];

    return p.node;
  });
};

const sortToSorters = (j: JSCodeshift, source: Collection) => {
  const willCheckHooks = [
    "useCheckboxGroup",
    "useRadioGroup",
    "useSelect",
    "useAutocomplete",
    "useList",
  ];

  willCheckHooks.forEach((hookName) => {
    const useListHooks = source.find(j.CallExpression, {
      callee: {
        name: hookName,
      },
    });

    useListHooks.replaceWith((p) => {
      if (p.node.arguments.length === 0) {
        return p.node;
      }

      const firstArg = p.node.arguments[0];
      if (!firstArg || firstArg.type !== "ObjectExpression") {
        return p.node;
      }

      const sortProperty = (firstArg as ObjectExpression).properties.find(
        (p: Property) => (p.key as Identifier).name === "sort",
      );

      if (!sortProperty) {
        return p.node;
      }

      const propertiesWithoutSort = (
        firstArg as ObjectExpression
      ).properties.filter(
        (p: Property) => (p.key as Identifier).name !== "sort",
      );

      p.node.arguments = [
        j.objectExpression([
          ...propertiesWithoutSort,
          j.objectProperty(
            j.identifier("sorters"),
            (sortProperty as any).value,
          ),
        ]),
      ];

      return p.node;
    });
  });
};

const sorterToSorters = (j: JSCodeshift, source: Collection) => {
  const willCheckHooks = ["useExport"];

  willCheckHooks.forEach((hookName) => {
    const useListHooks = source.find(j.CallExpression, {
      callee: {
        name: hookName,
      },
    });

    useListHooks.replaceWith((p) => {
      if (p.node.arguments.length === 0) {
        return p.node;
      }

      const firstArg = p.node.arguments[0];
      if (!firstArg || firstArg.type !== "ObjectExpression") {
        return p.node;
      }

      const sortProperty = (firstArg as ObjectExpression).properties.find(
        (p: Property) => (p.key as Identifier).name === "sorter",
      );

      if (!sortProperty) {
        return p.node;
      }

      const propertiesWithoutSort = (
        firstArg as ObjectExpression
      ).properties.filter(
        (p: Property) => (p.key as Identifier).name !== "sorter",
      );

      p.node.arguments = [
        j.objectExpression([
          ...propertiesWithoutSort,
          j.objectProperty(
            j.identifier("sorters"),
            (sortProperty as any).value,
          ),
        ]),
      ];

      return p.node;
    });
  });
};

const resourceNametoResource = (j: JSCodeshift, source: Collection) => {
  const willCheckHooks = ["useExport", "useImport"];

  willCheckHooks.forEach((hookName) => {
    const useListHooks = source.find(j.CallExpression, {
      callee: {
        name: hookName,
      },
    });

    useListHooks.replaceWith((p) => {
      if (p.node.arguments.length === 0) {
        return p.node;
      }

      const firstArg = p.node.arguments[0];
      if (!firstArg || firstArg.type !== "ObjectExpression") {
        return p.node;
      }

      const resourceNameProperty = (
        firstArg as ObjectExpression
      ).properties.find(
        (p: Property) => (p.key as Identifier).name === "resourceName",
      );

      if (!resourceNameProperty) {
        return p.node;
      }

      const propertiesWithoutResourceName = (
        firstArg as ObjectExpression
      ).properties.filter(
        (p: Property) => (p.key as Identifier).name !== "resourceName",
      );

      p.node.arguments = [
        j.objectExpression([
          ...propertiesWithoutResourceName,
          j.objectProperty(
            j.identifier("resource"),
            (resourceNameProperty as any).value,
          ),
        ]),
      ];

      return p.node;
    });
  });
};

const deprecatedUseTablePaginationProps = [
  "initialCurrent",
  "initialPageSize",
  "hasPagination",
];

const deprecatedUseTableFiltersProps = [
  "initialFilter",
  "permanentFilter",
  "defaultSetFilterBehavior",
];

const deprecatedUseTableSortersProps = ["initialSorter", "permanentSorter"];

const fixDeprecatedReactTableProps = (j: JSCodeshift, source: Collection) => {
  const refineReactTableImports = source.find(j.ImportDeclaration, {
    source: {
      value: "@pankod/refine-react-table",
    },
    specifiers: [
      {
        imported: {
          name: "useTable",
        },
      },
    ],
  });

  if (refineReactTableImports.length === 0) {
    return;
  }

  const useTableHooks = source.find(j.CallExpression, {
    callee: {
      name: "useTable",
    },
  });

  useTableHooks.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    const firstArg = p.node.arguments[0];
    if (!firstArg || firstArg.type !== "ObjectExpression") {
      return p.node;
    }

    const hasRefineCoreProps = (firstArg as ObjectExpression).properties.find(
      (p: Property) => (p.key as Identifier).name === "refineCoreProps",
    );

    if (!hasRefineCoreProps) {
      return p.node;
    }

    const otherProperties = (firstArg as ObjectExpression).properties.filter(
      (p: Property) => (p.key as Identifier).name !== "refineCoreProps",
    );

    const paginationProperties = deprecatedUseTablePaginationProps.map(
      (prop) => {
        const property = (
          (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
        ).properties.find((p: Property) => (p.key as Identifier).name === prop);

        if (!property) {
          return;
        }

        if (prop === "hasPagination") {
          return j.property(
            "init",
            j.identifier("mode"),
            j.literal(
              ((property as ObjectProperty).value as BooleanLiteral).value
                ? "server"
                : "off",
            ),
          );
        }

        if (prop === "initialCurrent") {
          return j.property(
            "init",
            j.identifier("current"),
            (property as ObjectProperty).value,
          );
        }

        if (prop === "initialPageSize") {
          return j.property(
            "init",
            j.identifier("pageSize"),
            (property as ObjectProperty).value,
          );
        }

        return;
      },
    );

    const paginationProperty = j.property(
      "init",
      j.identifier("pagination"),
      j.objectExpression(paginationProperties.filter(Boolean)),
    );

    const filtersProperties = deprecatedUseTableFiltersProps.map((prop) => {
      const property = (
        (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
      ).properties.find((p: Property) => (p.key as Identifier).name === prop);

      if (!property) {
        return;
      }

      if (prop === "initialFilter") {
        return j.property(
          "init",
          j.identifier("initial"),
          (property as ObjectProperty).value,
        );
      }

      if (prop === "permanentFilter") {
        return j.property(
          "init",
          j.identifier("permanent"),
          (property as ObjectProperty).value,
        );
      }

      if (prop === "defaultSetFilterBehavior") {
        return j.property(
          "init",
          j.identifier("defaultBehavior"),
          (property as ObjectProperty).value,
        );
      }

      return;
    });

    const filtersProperty = j.property(
      "init",
      j.identifier("filters"),
      j.objectExpression(filtersProperties.filter(Boolean)),
    );

    const sortersProperties = deprecatedUseTableSortersProps.map((prop) => {
      const property = (
        (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
      ).properties.find((p: Property) => (p.key as Identifier).name === prop);

      if (!property) {
        return;
      }

      if (prop === "initialSorter") {
        return j.property(
          "init",
          j.identifier("initial"),
          (property as ObjectProperty).value,
        );
      }

      if (prop === "permanentSorter") {
        return j.property(
          "init",
          j.identifier("permanent"),
          (property as ObjectProperty).value,
        );
      }

      return;
    });

    const sortersProperty = j.property(
      "init",
      j.identifier("sorters"),
      j.objectExpression(sortersProperties.filter(Boolean)),
    );

    const otherRefineCoreProps = (
      (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
    ).properties.filter(
      (p: Property) =>
        ![
          ...deprecatedUseTablePaginationProps,
          ...deprecatedUseTableSortersProps,
          ...deprecatedUseTableFiltersProps,
        ].includes((p.key as Identifier).name),
    );

    const refineCorePropsProperty = j.property(
      "init",
      j.identifier("refineCoreProps"),
      j.objectExpression(
        [
          ...otherRefineCoreProps,
          (paginationProperty.value as ObjectExpression).properties.length > 0
            ? paginationProperty
            : null,
          (filtersProperty.value as ObjectExpression).properties.length > 0
            ? filtersProperty
            : null,
          (sortersProperty.value as ObjectExpression).properties.length > 0
            ? sortersProperty
            : null,
        ].filter(Boolean),
      ),
    );

    p.node.arguments = [
      j.objectExpression([...otherProperties, refineCorePropsProperty]),
    ];

    return p.node;
  });
};

const fixDeprecatedUseTableProps = (j: JSCodeshift, source: Collection) => {
  const willCheckImports = ["useTable", "useDataGrid"];

  willCheckImports.forEach((hook) => {
    const useTableHooks = source.find(j.CallExpression, {
      callee: {
        name: hook,
      },
    });

    useTableHooks.replaceWith((p) => {
      if (p.node.arguments.length === 0) {
        return p.node;
      }

      const firstArg = p.node.arguments[0];
      if (!firstArg || firstArg.type !== "ObjectExpression") {
        return p.node;
      }

      const hasRefineCoreProps = (firstArg as ObjectExpression).properties.find(
        (p: Property) => (p.key as Identifier).name === "refineCoreProps",
      );

      if (hasRefineCoreProps) {
        const otherProperties = (
          firstArg as ObjectExpression
        ).properties.filter(
          (p: Property) => (p.key as Identifier).name !== "refineCoreProps",
        );

        const paginationProperties = deprecatedUseTablePaginationProps.map(
          (prop) => {
            const property = (
              (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
            ).properties.find(
              (p: Property) => (p.key as Identifier).name === prop,
            );

            if (!property) {
              return;
            }

            if (prop === "hasPagination") {
              return j.property(
                "init",
                j.identifier("mode"),
                j.literal(
                  ((property as ObjectProperty).value as BooleanLiteral).value
                    ? "server"
                    : "off",
                ),
              );
            }

            if (prop === "initialCurrent") {
              return j.property(
                "init",
                j.identifier("current"),
                (property as ObjectProperty).value,
              );
            }

            if (prop === "initialPageSize") {
              return j.property(
                "init",
                j.identifier("pageSize"),
                (property as ObjectProperty).value,
              );
            }

            return;
          },
        );

        const paginationProperty = j.property(
          "init",
          j.identifier("pagination"),
          j.objectExpression(paginationProperties.filter(Boolean)),
        );

        const filtersProperties = deprecatedUseTableFiltersProps.map((prop) => {
          const property = (
            (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
          ).properties.find(
            (p: Property) => (p.key as Identifier).name === prop,
          );

          if (!property) {
            return;
          }

          if (prop === "initialFilter") {
            return j.property(
              "init",
              j.identifier("initial"),
              (property as ObjectProperty).value,
            );
          }

          if (prop === "permanentFilter") {
            return j.property(
              "init",
              j.identifier("permanent"),
              (property as ObjectProperty).value,
            );
          }

          if (prop === "defaultSetFilterBehavior") {
            return j.property(
              "init",
              j.identifier("defaultBehavior"),
              (property as ObjectProperty).value,
            );
          }

          return;
        });

        const filtersProperty = j.property(
          "init",
          j.identifier("filters"),
          j.objectExpression(filtersProperties.filter(Boolean)),
        );

        const sortersProperties = deprecatedUseTableSortersProps.map((prop) => {
          const property = (
            (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
          ).properties.find(
            (p: Property) => (p.key as Identifier).name === prop,
          );

          if (!property) {
            return;
          }

          if (prop === "initialSorter") {
            return j.property(
              "init",
              j.identifier("initial"),
              (property as ObjectProperty).value,
            );
          }

          if (prop === "permanentSorter") {
            return j.property(
              "init",
              j.identifier("permanent"),
              (property as ObjectProperty).value,
            );
          }

          return;
        });

        const sortersProperty = j.property(
          "init",
          j.identifier("sorters"),
          j.objectExpression(sortersProperties.filter(Boolean)),
        );

        const otherRefineCoreProps = (
          (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
        ).properties.filter(
          (p: Property) =>
            ![
              ...deprecatedUseTablePaginationProps,
              ...deprecatedUseTableSortersProps,
              ...deprecatedUseTableFiltersProps,
            ].includes((p.key as Identifier).name),
        );

        const refineCorePropsProperty = j.property(
          "init",
          j.identifier("refineCoreProps"),
          j.objectExpression(
            [
              ...otherRefineCoreProps,
              (paginationProperty.value as ObjectExpression).properties.length >
              0
                ? paginationProperty
                : null,
              (filtersProperty.value as ObjectExpression).properties.length > 0
                ? filtersProperty
                : null,
              (sortersProperty.value as ObjectExpression).properties.length > 0
                ? sortersProperty
                : null,
            ].filter(Boolean),
          ),
        );

        p.node.arguments = [
          j.objectExpression([...otherProperties, refineCorePropsProperty]),
        ];

        return p.node;
      }

      // Handle top-level props case (existing logic)
      const otherProperties = (firstArg as ObjectExpression).properties.filter(
        (p: Property) =>
          ![
            ...deprecatedUseTablePaginationProps,
            ...deprecatedUseTableSortersProps,
            ...deprecatedUseTableFiltersProps,
          ].includes((p.key as Identifier).name),
      );

      const paginationProperties = deprecatedUseTablePaginationProps.map(
        (prop) => {
          const property = (firstArg as ObjectExpression).properties.find(
            (p: Property) => (p.key as Identifier).name === prop,
          );

          if (!property) {
            return;
          }

          if (prop === "hasPagination") {
            return j.property(
              "init",
              j.identifier("mode"),
              j.literal(
                ((property as ObjectProperty).value as BooleanLiteral).value
                  ? "server"
                  : "off",
              ),
            );
          }

          if (prop === "initialCurrent") {
            return j.property(
              "init",
              j.identifier("current"),
              (property as ObjectProperty).value,
            );
          }

          if (prop === "initialPageSize") {
            return j.property(
              "init",
              j.identifier("pageSize"),
              (property as ObjectProperty).value,
            );
          }

          return;
        },
      );

      const paginationProperty = j.property(
        "init",
        j.identifier("pagination"),
        j.objectExpression(paginationProperties.filter(Boolean)),
      );

      const filtersProperties = deprecatedUseTableFiltersProps.map((prop) => {
        const property = (firstArg as ObjectExpression).properties.find(
          (p: Property) => (p.key as Identifier).name === prop,
        );

        if (!property) {
          return;
        }

        if (prop === "initialFilter") {
          return j.property(
            "init",
            j.identifier("initial"),
            (property as ObjectProperty).value,
          );
        }

        if (prop === "permanentFilter") {
          return j.property(
            "init",
            j.identifier("permanent"),
            (property as ObjectProperty).value,
          );
        }

        if (prop === "defaultSetFilterBehavior") {
          return j.property(
            "init",
            j.identifier("defaultBehavior"),
            (property as ObjectProperty).value,
          );
        }

        return;
      });

      const filtersProperty = j.property(
        "init",
        j.identifier("filters"),
        j.objectExpression(filtersProperties.filter(Boolean)),
      );

      const sortersProperties = deprecatedUseTableSortersProps.map((prop) => {
        const property = (firstArg as ObjectExpression).properties.find(
          (p: Property) => (p.key as Identifier).name === prop,
        );

        if (!property) {
          return;
        }

        if (prop === "initialSorter") {
          return j.property(
            "init",
            j.identifier("initial"),
            (property as ObjectProperty).value,
          );
        }

        if (prop === "permanentSorter") {
          return j.property(
            "init",
            j.identifier("permanent"),
            (property as ObjectProperty).value,
          );
        }

        return;
      });

      const sortersProperty = j.property(
        "init",
        j.identifier("sorters"),
        j.objectExpression(sortersProperties.filter(Boolean)),
      );

      p.node.arguments = [
        j.objectExpression(
          [
            ...otherProperties,
            (paginationProperty.value as ObjectExpression).properties.length > 0
              ? paginationProperty
              : null,
            (filtersProperty.value as ObjectExpression).properties.length > 0
              ? filtersProperty
              : null,
            (sortersProperty.value as ObjectExpression).properties.length > 0
              ? sortersProperty
              : null,
          ].filter(Boolean),
        ),
      ];

      return p.node;
    });
  });
};

const fixUseListHasPaginationToPaginationMode = (
  j: JSCodeshift,
  source: Collection,
) => {
  const useListHooks = source.find(j.CallExpression, {
    callee: {
      name: "useList",
    },
  });

  useListHooks.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    const firstArg = p.node.arguments[0];
    if (!firstArg || firstArg.type !== "ObjectExpression") {
      return p.node;
    }

    const hasPaginationProperty = (
      firstArg as ObjectExpression
    ).properties.find(
      (p: Property) => (p.key as Identifier).name === "hasPagination",
    );

    if (!hasPaginationProperty) {
      return p.node;
    }

    const paginationProperty = (firstArg as ObjectExpression).properties.find(
      (p: Property) => (p.key as Identifier).name === "pagination",
    );

    if (paginationProperty) {
      (paginationProperty as any).value.properties.push(
        j.property(
          "init",
          j.identifier("mode"),
          j.literal(
            ((hasPaginationProperty as ObjectProperty).value as BooleanLiteral)
              .value
              ? "server"
              : "off",
          ),
        ),
      );
    } else {
      (firstArg as ObjectExpression).properties.push(
        j.property(
          "init",
          j.identifier("pagination"),
          j.objectExpression([
            j.property(
              "init",
              j.identifier("mode"),
              j.literal(
                (
                  (hasPaginationProperty as ObjectProperty)
                    .value as BooleanLiteral
                ).value
                  ? "server"
                  : "off",
              ),
            ),
          ]),
        ),
      );
    }

    (firstArg as ObjectExpression).properties = (
      firstArg as ObjectExpression
    ).properties.filter(
      (p: Property) => (p.key as Identifier).name !== "hasPagination",
    );

    return p.node;
  });
};

const fixUseSelectHasPaginationToPaginationMode = (
  j: JSCodeshift,
  source: Collection,
) => {
  const useSelectHooks = source.find(j.CallExpression, {
    callee: {
      name: "useSelect",
    },
  });

  useSelectHooks.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    // Check if the first argument is an ObjectExpression
    const firstArg = p.node.arguments[0];
    if (!firstArg || firstArg.type !== "ObjectExpression") {
      return p.node;
    }

    const hasPaginationProperty = (
      firstArg as ObjectExpression
    ).properties.find(
      (p: Property) => (p.key as Identifier).name === "hasPagination",
    );

    const paginationProperty = (firstArg as ObjectExpression).properties.find(
      (p: Property) => (p.key as Identifier).name === "pagination",
    );

    const hasMode = (
      paginationProperty as unknown as any
    )?.value?.properties?.find(
      (p) => p.key?.name === "mode" || p["name"] === "mode",
    );

    if (hasPaginationProperty && !hasMode) {
      if (paginationProperty) {
        (paginationProperty as any).value.properties.push(
          j.property(
            "init",
            j.identifier("mode"),
            j.literal(
              (
                (hasPaginationProperty as ObjectProperty)
                  .value as BooleanLiteral
              ).value
                ? "server"
                : "off",
            ),
          ),
        );
      } else {
        (firstArg as ObjectExpression).properties.push(
          j.property(
            "init",
            j.identifier("pagination"),
            j.objectExpression([
              j.property(
                "init",
                j.identifier("mode"),
                j.literal(
                  (
                    (hasPaginationProperty as ObjectProperty)
                      .value as BooleanLiteral
                  ).value
                    ? "server"
                    : "off",
                ),
              ),
            ]),
          ),
        );
      }
    }

    if (!hasPaginationProperty && !hasMode) {
      if (paginationProperty) {
        (paginationProperty as any).value.properties.push(
          j.property("init", j.identifier("mode"), j.stringLiteral("server")),
        );
      } else {
        (firstArg as ObjectExpression).properties.push(
          j.property(
            "init",
            j.identifier("pagination"),
            j.objectExpression([
              j.property(
                "init",
                j.identifier("mode"),
                j.stringLiteral("server"),
              ),
            ]),
          ),
        );
      }
    }

    (firstArg as ObjectExpression).properties = (
      firstArg as ObjectExpression
    ).properties.filter(
      (p: Property) => (p.key as Identifier).name !== "hasPagination",
    );

    return p.node;
  });
};

const useCustomConfigSortToSorters = (j: JSCodeshift, source: Collection) => {
  const useCustomHooks = source.find(j.CallExpression, {
    callee: {
      name: "useCustom",
    },
  });

  useCustomHooks.replaceWith((p) => {
    if (p.node.arguments.length === 0) {
      return p.node;
    }

    const firstArg = p.node.arguments[0];
    if (!firstArg || firstArg.type !== "ObjectExpression") {
      return p.node;
    }

    const configProperty = (firstArg as ObjectExpression).properties.find(
      (p: Property) => (p.key as Identifier).name === "config",
    );

    if (!configProperty) {
      return p.node;
    }

    const sortProperty = (
      (configProperty as ObjectProperty).value as any
    ).properties.find((p: Property) => (p.key as Identifier).name === "sort");

    if (!sortProperty) {
      return p.node;
    }

    ((configProperty as ObjectProperty).value as any).properties.push(
      j.property(
        "init",
        j.identifier("sorters"),
        (sortProperty as ObjectProperty).value,
      ),
    );

    ((configProperty as ObjectProperty).value as any).properties = (
      (configProperty as ObjectProperty).value as any
    ).properties.filter((p: Property) => (p.key as Identifier).name !== "sort");

    return p.node;
  });
};

const setSortertoSetSorters = (j: JSCodeshift, source: Collection) => {
  const willCheckHooks = ["useTable", "useDataGrid"];

  willCheckHooks.forEach((hook) => {
    const updatedHooks = source.find(j.CallExpression, {
      callee: {
        name: hook,
      },
    });

    if (updatedHooks.length === 0) {
      return;
    }

    updatedHooks.forEach((path) => {
      if (!path.parentPath?.node?.id?.properties) {
        return;
      }

      const setSorterProperty = path.parentPath.node.id.properties.find(
        (p) => p.value?.name === "setSorter",
      );

      if (setSorterProperty) {
        setSorterProperty.value.name = "setSorters: setSorter";
      }

      const sorterPropery = path.parentPath.node.id.properties.find(
        (p) => p.value?.name === "sorter",
      );

      const sortersProperty = path.parentPath.node.id.properties.find(
        (p) => p.key?.name === "sorters" || p.value?.name === "sorter",
      );

      if (sorterPropery && !sortersProperty) {
        sorterPropery.value.name = "sorters: sorter";
      }
    });
  });
};

const addCommentToUseSimpleList = (j: JSCodeshift, source: Collection) => {
  const useSimpleListHooks = source.find(j.CallExpression, {
    callee: {
      name: "useSimpleList",
    },
  });

  useSimpleListHooks.forEach((path) => {
    const comment = j.commentLine(
      "`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.",
      false,
      true,
    );

    path.parentPath.insertBefore(comment);
  });
};

const resourceOptionstoMeta = (j: JSCodeshift, source: Collection) => {
  const refineElement = source.find(j.JSXElement, {
    openingElement: {
      name: {
        name: "Refine",
      },
    },
  });

  if (refineElement.length === 0) {
    return;
  }

  refineElement.forEach((path) => {
    const resources = path.node.openingElement.attributes.find(
      (p) => (p as JSXAttribute).name?.name === "resources",
    );

    if (!resources) {
      return;
    }

    const options = (
      ((resources as JSXAttribute).value as JSXExpressionContainer)
        .expression as ArrayExpression
    ).elements.filter((p) => {
      const properties = (p as ObjectExpression).properties;

      return (
        properties.find(
          (p) => ((p as ObjectProperty).key as Identifier).name === "options",
        ) !== undefined
      );
    });

    if (options.length === 0) {
      return;
    }

    options.forEach((p) => {
      const properties = (p as ObjectExpression).properties;

      const optionsProperty = properties.find(
        (p) => ((p as ObjectProperty).key as Identifier).name === "options",
      );

      if (!optionsProperty) {
        return;
      }

      (optionsProperty as ObjectProperty).key = j.identifier("meta");
    });
  });
};

export const fixV4Deprecations = async (j: JSCodeshift, source: Collection) => {
  configToSpreadConfig(j, source);
  sortToSorters(j, source);
  sorterToSorters(j, source);
  resourceNametoResource(j, source);
  fixDeprecatedReactTableProps(j, source);
  fixDeprecatedUseTableProps(j, source);
  fixUseListHasPaginationToPaginationMode(j, source);
  fixUseSelectHasPaginationToPaginationMode(j, source);
  useCustomConfigSortToSorters(j, source);
  setSortertoSetSorters(j, source);
  addCommentToUseSimpleList(j, source);
  resourceOptionstoMeta(j, source);
};
