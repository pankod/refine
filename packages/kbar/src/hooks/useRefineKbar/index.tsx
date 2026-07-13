import { useEffect, useState, useContext } from "react";
import {
  useDelete,
  useTranslate,
  type IResourceItem,
  useCanWithoutCache,
  useUserFriendlyName,
  useGo,
  useResourceParams,
} from "@refinedev/core";
import {
  useRegisterActions,
  createAction,
  type Action,
  KBarContext,
  VisualState,
} from "kbar";

import { capitalize } from "@definitions";
import { useGetToPath } from "@refinedev/core";

enum RefineKbarActionType {
  List = "list",
  Create = "create",
  Show = "show",
  Edit = "edit",
  Delete = "delete",
}

export const useRefineKbar = (): void => {
  const t = useTranslate();
  const {
    id: idFromParams,
    action: actionFromParams,
    resource: resourceFromParams,
    resources,
  } = useResourceParams();
  const getToPath = useGetToPath();
  const go = useGo();
  const {
    mutation: { mutate },
  } = useDelete();

  const getUserFriendlyName = useUserFriendlyName();

  const kbarContext = useContext(KBarContext);

  const { can } = useCanWithoutCache();

  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const preaparedActions = async () => {
      return await Promise.all(
        moveActionToFirst().flatMap((resource) => {
          return createActionWithResource(resource);
        }),
      );
    };

    preaparedActions().then((actions) => {
      return setActions(actions.flatMap((action) => action));
    });
  }, [resources, idFromParams, resourceFromParams, actionFromParams]);

  useEffect(() => {
    if (actions.length === 0) {
      kbarContext.query.setVisualState(VisualState.hidden);
    }
  }, [actions]);

  const moveActionToFirst = (): IResourceItem[] => {
    const orderedResources = [...resources];
    const fromIndex = orderedResources?.findIndex(
      (resource) =>
        (resource.identifier ?? resource?.name) ===
        (resourceFromParams?.identifier ?? resourceFromParams?.name),
    );

    if (fromIndex > 0) {
      const element = orderedResources[fromIndex];
      orderedResources.splice(fromIndex, 1);
      orderedResources.splice(0, 0, element);
    }

    return orderedResources;
  };

  const createActionWithResource = async (resource: IResourceItem) => {
    const { name, list, create, show, edit } = resource;

    const label = resource?.meta?.label;

    const icon = resource?.meta?.icon;

    const canDelete = resource?.meta?.canDelete;

    const section =
      label ??
      t(
        `${resource.name}.${resource.name}`,
        getUserFriendlyName(resource.name, "plural"),
      );
    const tempActions: Action[] = [];

    if (
      list &&
      ((resourceFromParams !== undefined &&
        resourceFromParams?.name !== name) ||
        (actionFromParams !== undefined && resourceFromParams?.name === name))
    ) {
      const { can: canList } = (await can?.({
        resource: name,
        action: RefineKbarActionType.List,
        params: { id: idFromParams, resource },
      })) || { can: true };
      if (canList) {
        tempActions.push(
          createAction({
            name: t("actions.list", capitalize(RefineKbarActionType.List)),
            section,
            icon,
            perform: () => {
              const p = getToPath({
                resource,
                action: "list",
              });

              if (p) {
                go({ to: p });
              }
            },
          }),
        );
      }
    }
    if (
      (resource?.meta?.canCreate || !!create) &&
      create &&
      (RefineKbarActionType.Create !== actionFromParams ||
        resourceFromParams?.name !== name)
    ) {
      const { can: canAccessCreate } = (await can?.({
        resource: name,
        action: RefineKbarActionType.Create,
        params: { resource },
      })) || { can: true };

      if (canAccessCreate) {
        tempActions.push(
          createAction({
            name: t("actions.create", capitalize(RefineKbarActionType.Create)),
            section,
            icon,
            keywords: "new",
            perform: () => {
              const p = getToPath({
                resource,
                action: "create",
              });

              if (p) {
                go({ to: p });
              }
            },
          }),
        );
      }
    }

    if (resourceFromParams?.name === name && idFromParams) {
      if (
        (resource?.meta?.canShow || !!show) &&
        show &&
        RefineKbarActionType.Show !== actionFromParams
      ) {
        const { can: canAccessShow } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Show,
          params: { id: idFromParams, resource },
        })) || { can: true };

        if (canAccessShow) {
          tempActions.push(
            createAction({
              name: t("actions.show", capitalize(RefineKbarActionType.Show)),
              section,
              icon,
              perform: () => {
                const p = getToPath({
                  resource,
                  action: "show",
                  meta: {
                    id: idFromParams,
                  },
                });

                if (p) {
                  go({ to: p });
                }
              },
            }),
          );
        }
      }
      if (
        (resource?.meta?.canEdit || !!edit) &&
        edit &&
        RefineKbarActionType.Edit !== actionFromParams
      ) {
        const { can: canAccessEdit } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Edit,
          params: { id: idFromParams, resource },
        })) || { can: true };
        if (canAccessEdit) {
          tempActions.push(
            createAction({
              name: t("actions.edit", capitalize(RefineKbarActionType.Edit)),
              section,
              icon,
              perform: () => {
                const p = getToPath({
                  resource,
                  action: "edit",
                  meta: {
                    id: idFromParams,
                  },
                });

                if (p) {
                  go({ to: p });
                }
              },
            }),
          );
        }
      }
      if (canDelete) {
        const { can: canAccessDelete } = (await can?.({
          resource: name,
          action: RefineKbarActionType.Delete,
          params: { id: idFromParams, resource },
        })) || { can: true };
        if (canAccessDelete) {
          tempActions.push(
            {
              id: "delete",
              name: t(
                "actions.delete",
                capitalize(RefineKbarActionType.Delete),
              ),
              section,
              icon,
            },
            createAction({
              name: t(
                "buttons.delete",
                capitalize(RefineKbarActionType.Delete),
              ),
              section: t("buttons.confirm", "Are you sure?"),
              parent: "delete",
              perform: () => {
                mutate(
                  {
                    resource: resource.name,
                    id: idFromParams,
                  },
                  {
                    onSuccess: () => {
                      const p = getToPath({
                        resource,
                        action: "list",
                      });

                      if (p) {
                        go({ to: p });
                      }
                    },
                  },
                );
              },
            }),
            createAction({
              name: t("buttons.cancel", "Cancel"),
              parent: "delete",
              perform: () => null,
            }),
          );
        }
      }
    }
    return tempActions;
  };
  useRegisterActions(actions, [actions]);
};
