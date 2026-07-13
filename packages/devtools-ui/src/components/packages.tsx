import React from "react";
import clsx from "clsx";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import type { PackageType } from "@refinedev/devtools-shared";

import { getInstalledPackages, installPackages } from "src/utils/packages";
import { PackageItem } from "src/components/package-item";
import { Button } from "./button";
import { AddPackageDrawer } from "./add-package-drawer";
import { PlusCircleIcon } from "./icons/plus-circle";
import { UpdateIcon } from "./icons/update";

export const Packages = () => {
  const ref = React.useRef<FireworksHandlers>(null);
  const [packages, setPackages] = React.useState<PackageType[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [outdatedPackages, setOutdatedPackages] = React.useState<string[]>([]);

  React.useEffect(() => {
    getInstalledPackages().then((data) => {
      setPackages(data);
    });
  }, []);

  const fireworks = React.useCallback(() => {
    if (ref.current) {
      ref.current.start();
      setTimeout(() => {
        ref.current?.waitStop();
      }, 3000);
    }
  }, []);

  const [installingAll, setInstallingAll] = React.useState(false);
  const [installInProgress, setInstallInProgress] = React.useState(false);

  const onInstall = React.useCallback(async (packagesToInstall: string[]) => {
    setInstallInProgress(true);
    const state = await installPackages(packagesToInstall);

    if (state) {
      fireworks();
      getInstalledPackages({ force: true }).then((data) => {
        setPackages(data);
      });
      setOutdatedPackages((p) =>
        p.filter((item) => !packagesToInstall.includes(item)),
      );
    }

    setInstallInProgress(false);

    return state;
  }, []);

  const onOutdated = React.useCallback((packages: string[]) => {
    setOutdatedPackages((p) => [...p, ...packages]);
  }, []);

  const onUpdateAll = React.useCallback(async () => {
    if (installingAll) {
      return;
    }
    setInstallingAll(true);
    await onInstall(outdatedPackages);
    setInstallingAll(false);
  }, [outdatedPackages, installingAll, onInstall]);

  return (
    <>
      <div
        className={clsx(
          "re-flex-1",
          "re-flex",
          "re-flex-col",
          "re-h-full",
          "re-w-full",
          "re-justify-start",
          "re-mx-auto",
        )}
      >
        <div
          className={clsx(
            "re-flex",
            "re-items-center",
            "re-justify-between",
            "re-flex-shrink-0",
          )}
        >
          <div
            className={clsx(
              "re-text-sm",
              "re-leading-6",
              "re-text-gray-0",
              "re-font-semibold",
            )}
          >
            Package Overview
          </div>
          <div className={clsx("re-flex", "re-items-center", "re-gap-4")}>
            <Button
              onClick={() => setVisible(true)}
              className={clsx(
                "re-text-alt-blue",
                "re-bg-alt-blue",
                "re-bg-opacity-[0.15]",
                "!re-px-2",
              )}
              contentClassName={clsx(
                "re-flex-nowrap",
                "re-flex",
                "re-items-center",
                "re-justify-between",
                "re-gap-2",
              )}
            >
              <PlusCircleIcon className="re-text-alt-blue" />
              <span className="re-text-alt-blue">More packages</span>
            </Button>
            {outdatedPackages.length > 0 && (
              <Button
                onClick={() => onUpdateAll()}
                className={clsx("re-text-gray-0", "re-bg-alt-blue", "!re-px-2")}
                contentClassName={clsx(
                  "re-gap-2",
                  "re-flex-nowrap",
                  "re-flex",
                  "re-items-center",
                  "re-justify-between",
                )}
              >
                <UpdateIcon
                  className={clsx(
                    "re-text-gray-0",
                    installingAll ? "re-animate-spin" : "",
                  )}
                />
                <span className="re-text-gray-0">Update all</span>
              </Button>
            )}
          </div>
        </div>
        <div className={clsx("re-flex-1", "re-overflow-auto")}>
          <div
            className={clsx("re-grid", "re-gap-8", "re-py-8")}
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            }}
          >
            {packages.map((item) => (
              <PackageItem
                key={item.name}
                item={item}
                onUpdate={(v) => onInstall([v])}
                onOutdated={(v) => onOutdated([v])}
                blocked={installInProgress}
              />
            ))}
          </div>
        </div>
      </div>
      <AddPackageDrawer
        installedPackages={packages.map((item) => item.name)}
        onClose={() => {
          setVisible(false);
          getInstalledPackages().then((data) => {
            setPackages(data);
          });
        }}
        onInstall={(pkgs) => onInstall(pkgs)}
        dismissOnOverlayClick
        visible={visible}
      />
      <Fireworks
        ref={ref}
        autostart={false}
        options={{
          intensity: 38,
          explosion: 8,
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 99999,
          pointerEvents: "none",
        }}
      />
    </>
  );
};
