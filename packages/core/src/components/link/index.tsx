import React, { type Ref, forwardRef, useContext } from "react";
import { useGo } from "@hooks/router";
import { RouterContext } from "@contexts/router";
import type { GoConfigWithResource } from "../../hooks/router/use-go";
import warnOnce from "warn-once";

type LinkPropsWithGo = {
  go: Omit<GoConfigWithResource, "type">;
};

type LinkPropsWithTo = {
  to: string;
};

export type LinkProps<TProps = {}> = React.PropsWithChildren<
  (LinkPropsWithGo | LinkPropsWithTo) & TProps
>;

/**
 * @param to The path to navigate to.
 * @param go The useGo.go params to navigate to. If `to` provided, this will be ignored.
 * @returns routerProvider.Link if it is provided, otherwise an anchor tag.
 */
const LinkComponent = <TProps = {}>(
  props: LinkProps<TProps>,
  ref: Ref<Element>,
) => {
  const routerContext = useContext(RouterContext);
  const LinkFromContext = routerContext?.Link;

  const goFunction = useGo();

  let resolvedTo = "";
  if ("go" in props) {
    if (!routerContext?.go) {
      warnOnce(
        true,
        "[Link]: `routerProvider` is not found. To use `go`, Please make sure that you have provided the `routerProvider` for `<Refine />` https://refine.dev/docs/routing/router-provider/ \n",
      );
    }
    resolvedTo = goFunction({ ...props.go, type: "path" }) as string;
  }
  if ("to" in props) {
    resolvedTo = props.to;
  }

  if (LinkFromContext) {
    return (
      <LinkFromContext
        ref={ref}
        {...props}
        to={resolvedTo}
        // This is a workaround to avoid passing `go` to the Link component.
        go={undefined}
      />
    );
  }
  return (
    <a
      ref={ref}
      href={resolvedTo}
      {...props}
      // This is a workaround to avoid passing `go` and `to` to the anchor tag.
      to={undefined}
      go={undefined}
    />
  );
};

export const Link = forwardRef(LinkComponent) as <T = {}>(
  props: LinkProps<T> & { ref?: Ref<Element> },
) => ReturnType<typeof LinkComponent>;
