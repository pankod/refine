import React from "react";
import clsx from "clsx";
import type { AvailablePackageType } from "@refinedev/devtools-shared";

import { CloseIcon } from "./icons/close";
import { SearchIcon } from "./icons/search";
import { AddPackageItem } from "./add-package.item";
import { Modal } from "./modal";
import { Highlight } from "./highlight";
import { PlusCircleIcon } from "./icons/plus-circle";
import { Button } from "./button";
import { getAvailablePackages } from "src/utils/packages";
import { UpdateIcon } from "./icons/update";
import { CheckIcon } from "./icons/check";
import { InfoIcon } from "./icons/info";

type Props = {
  visible: boolean;
  onClose: () => void;
  installedPackages: string[];
  onInstall: (packagesToInstall: string[]) => Promise<boolean>;
  dismissOnOverlayClick?: boolean;
};

export const AddPackageDrawer = ({
  visible,
  onClose,
  installedPackages,
  onInstall,
  dismissOnOverlayClick = true,
}: Props) => {
  const [delayedVisible, setDelayedVisible] = React.useState(visible);
  const [installModal, setInstallModal] = React.useState<string | null>(null);

  const [packages, setPackages] = React.useState<AvailablePackageType[]>([]);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    getAvailablePackages().then((pkgs) => setPackages(pkgs));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setDelayedVisible(visible);
    }, 200);
  }, [visible]);

  const onCloseInternal = React.useCallback(() => {
    setDelayedVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  const [status, setStatus] = React.useState<
    "idle" | "installing" | "error" | "done"
  >("idle");

  const updatePackage = React.useCallback(async () => {
    if (installModal) {
      const installCommand =
        packages.find((el) => el.name === installModal)?.install ?? "";
      const packagesToInstall = installCommand
        .replace("npm install ", "")
        .split(" ");

      setStatus("installing");
      const response = await onInstall(packagesToInstall);
      if (response) {
        setStatus("done");
        setInstallModal(null);
        getAvailablePackages().then((pkgs) => {
          setPackages(pkgs);
        });
      } else {
        setStatus("error");
      }
    }
  }, [installModal]);

  const data = React.useMemo(() => {
    const filtered = packages
      .filter((pkg) => !installedPackages.includes(pkg.name))
      .filter((pkg) => pkg.name.includes(search));

    return filtered;
  }, [packages, installedPackages, search]);

  const icon = React.useMemo(() => {
    switch (status) {
      case "installing":
        return <UpdateIcon className="re-text-gray-0 re-animate-spin" />;
      case "done":
        return <CheckIcon className="re-text-gray-0" />;
      case "error":
        return <InfoIcon className="re-text-gray-0 re-rotate-180" />;
      case "idle":
        return <PlusCircleIcon className="re-text-gray-0" />;
    }
  }, [status]);

  const statusText = React.useMemo(() => {
    switch (status) {
      case "installing":
        return "Installing";
      case "done":
        return "Installed";
      case "error":
        return "Error";
      case "idle":
        return "Install";
    }
  }, [status]);

  return (
    <div
      className={clsx(
        "re-z-10",
        "re-fixed",
        "re-left-0",
        "re-top-0",
        "re-h-full",
        "re-w-full",
        !visible && "re-hidden",
        visible && "re-block",
        !visible && "re-pointer-events-none",
        visible && "re-pointer-events-auto",
      )}
      onClick={dismissOnOverlayClick ? onCloseInternal : undefined}
    >
      <div
        className={clsx(
          "re-absolute",
          "re-w-full",
          "re-h-full",
          "re-backdrop-blur-sm",
          "re-bg-gray-900",
          "re-bg-opacity-50",
          "re-transition-all",
          "re-ease-in-out",
          "re-duration-200",
          !delayedVisible && "re-pointer-events-none",
          delayedVisible && "re-pointer-events-auto",
        )}
        style={{
          transformOrigin: "center right",
          transform: `${
            delayedVisible ? "scale(1)" : "scale(0)"
          } translate3d(0,0,0)`,
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "re-absolute",
          "re-right-0",
          "re-top-0",
          "re-h-auto",
          "re-w-[400px]",
          "re-overflow-auto",
          "re-border-l",
          "re-border-l-gray-700",
          "re-bg-gray-800",
          "re-transition-transform",
          "re-duration-200",
          "re-ease-in-out",
          "re-shadow-2xl",
          delayedVisible && "re-translate-x-0",
          !delayedVisible && "re-translate-x-full",
          "re-flex",
          "re-flex-col",
          "re-h-full",
        )}
        style={{
          transformOrigin: "center right",
          transform: `${
            delayedVisible ? "translateX(0px)" : "translateX(100%)"
          } translateZ(0)`,
        }}
      >
        <div
          className={clsx(
            "re-p-5",
            "re-flex",
            "re-items-center",
            "re-justify-between",
            "re-border-b",
            "re-border-b-gray-700",
            "re-flex-shrink-0",
          )}
        >
          <div
            className={clsx(
              "re-text-gray-300",
              "re-text-sm",
              "re-leading-6",
              "re-font-semibold",
            )}
          >
            Explore Refine packages
          </div>
          <button
            type="button"
            onClick={onCloseInternal}
            className={clsx(
              "re-w-6",
              "re-h-6",
              "re-appearance-none",
              "re-bg-none",
              "re-border-none",
              "re-outline-none",
              "re-text-gray-500",
            )}
          >
            <CloseIcon className="re-w-6 re-h-6" />
          </button>
        </div>
        <div
          className={clsx(
            "re-flex",
            "re-flex-col",
            "re-flex-1",
            "re-overflow-hidden",
          )}
        >
          <div
            className={clsx(
              "re-pt-5",
              "re-px-5",
              "re-flex",
              "re-items-center",
              "re-justify-center",
              "re-w-full",
              "re-rounded-lg",
            )}
          >
            <div className={clsx("re-relative", "re-w-full")}>
              <input
                type="text"
                className={clsx(
                  "re-w-full",
                  "re-py-[7px]",
                  "re-pr-2",
                  "re-rounded-lg",
                  "re-border",
                  "re-border-gray-700",
                  "re-bg-gray-900",
                  "re-outline-none",
                  "re-text-gray-300",
                  "re-placeholder-gray-500",
                  "re-text-sm",
                  "re-leading-6",
                  "re-pl-10",
                )}
                placeholder="Search packages"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className={clsx(
                  "re-pointer-events-none",
                  "re-absolute",
                  "re-h-full",
                  "re-top-0",
                  "re-left-0",
                  "re-pl-3",
                  "re-flex",
                  "re-items-center",
                  "re-justify-center",
                )}
              >
                <SearchIcon
                  className={clsx("re-text-gray-500", "re-w-4", "re-h-4")}
                />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "re-overflow-scroll",
              "re-flex-1",
              "re-px-5",
              "re-pb-5",
              "re-pt-5",
            )}
          >
            <div className={clsx("re-flex", "re-flex-col", "re-gap-6")}>
              {data.map((pkg) => (
                <AddPackageItem
                  key={pkg.name}
                  {...pkg}
                  onInstall={() => setInstallModal(pkg.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={Boolean(installModal)}
        onClose={() => setInstallModal(null)}
        overlay
        header={
          <div className={clsx("re-flex", "re-flex-col", "re-gap-2")}>
            <div
              className={clsx(
                "re-text-gray-300",
                "re-text-sm",
                "re-leading-6",
                "re-font-semibold",
              )}
            >
              {packages.find((el) => el.name === installModal)?.name}
            </div>
            <div
              className={clsx(
                "re-text-gray-400",
                "re-text-sm",
                "re-leading-6",
                "re-font-normal",
              )}
            >
              {packages.find((el) => el.name === installModal)?.description ??
                ""}
            </div>
          </div>
        }
        footer={
          <div
            className={clsx(
              "re-flex",
              "re-flex-row",
              "re-gap-2",
              "re-items-center",
              "re-justify-end",
            )}
          >
            <Button
              onClick={() => updatePackage()}
              className={clsx("re-bg-alt-blue", "!re-pl-2")}
              contentClassName={clsx(
                "re-gap-2",
                "re-flex-nowrap",
                "re-flex",
                "re-items-center",
                "re-justify-between",
              )}
            >
              {icon}
              <span className="re-text-gray-0">{statusText}</span>
            </Button>
          </div>
        }
      >
        <div
          className={clsx(
            "re-p-5",
            "re-flex",
            "re-flex-col",
            "re-gap-2",
            "re-border-b",
            "re-border-b-gray-700",
          )}
        >
          <div
            className={clsx(
              "re-text-sm",
              "re-leading-6",
              "re-text-gray-300",
              "re-font-semibold",
            )}
          >
            How to install?
          </div>
          <div
            className={clsx(
              "re-bg-gray-700",
              "re-rounded-lg",
              "re-p-4",
              "re-text-sm",
              "re-overflow-auto",
            )}
          >
            <Highlight
              code={
                packages.find((el) => el.name === installModal)?.install ?? ""
              }
              language="bash"
            />
          </div>
        </div>
        <div className={clsx("re-p-5", "re-flex", "re-flex-col", "re-gap-2")}>
          <div
            className={clsx(
              "re-text-sm",
              "re-leading-6",
              "re-text-gray-300",
              "re-font-semibold",
            )}
          >
            How to use?
          </div>
          <div
            className={clsx(
              "re-bg-gray-700",
              "re-rounded-lg",
              "re-p-4",
              "re-text-sm",
              "re-overflow-auto",
            )}
          >
            <Highlight
              code={
                packages.find((el) => el.name === installModal)?.usage ?? ""
              }
              language="tsx"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
