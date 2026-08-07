import React from "react";
import clsx from "clsx";
import { RefineCoreLogoIcon } from "./refine-logo";

export const RefineLogoXmas = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className={clsx("relative")}>
      <RefineCoreLogoIcon {...props} />
      <XmasEffectLight
        className={clsx(
          "block dark:hidden",
          "absolute",
          "-top-2",
          "-left-2",
          "opacity-[0.75]",
        )}
      />
      <XmasEffectDark
        className={clsx("hidden dark:block", "absolute", "-top-2", "-left-2")}
      />
    </div>
  );
};

const XmasEffectLight = (props: { className?: string }) => {
  return (
    <div className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={96}
        height={40}
        fill="none"
        className="xmas"
      >
        <style>
          {
            "@keyframes combination{0%{opacity:1;filter:drop-shadow(0 0 2px currentColor)}20%{opacity:1;animation-timing-function:steps(1);filter:drop-shadow(0 0 2px currentColor)}40%{animation-timing-function:steps(1);animation-timing-function:ease-in-out;opacity:1;filter:drop-shadow(0 0 4px currentColor)}21%,23%,25%,27%,29%,31%,33%,35%,37%,39%,70%{opacity:.3;filter:drop-shadow(0 0 0 currentColor)}50%,85%,95%{opacity:.2;filter:drop-shadow(0 0 0 currentColor)}60%{animation-timing-function:ease;opacity:1;filter:drop-shadow(0 0 2px currentColor)}80%{animation-timing-function:ease;animation-timing-function:steps(1);opacity:1;filter:drop-shadow(0 0 4px currentColor)}to{animation-timing-function:steps(1);opacity:1;filter:drop-shadow(0 0 4px currentColor)}}.blue,.green,.red,.yellow{filter:drop-shadow(0 0 2px #24a866);animation:combination 8s infinite}.blue,.red,.yellow{filter:drop-shadow(0 0 2px #ff4c4d);animation-delay:.2s}.blue,.yellow{filter:drop-shadow(0 0 2px #0080ff);animation-delay:.4s}.yellow{filter:drop-shadow(0 0 2px #f93);animation-delay:.6s}"
          }
        </style>
        <circle cx={32} cy={19} r={2} fill="#24A866" className="green" />
        <circle cx={76} cy={22} r={2} fill="#24A866" className="green" />
        <circle cx={10} cy={24} r={2} fill="#FF4C4D" className="red" />
        <circle cx={69} cy={13} r={2} fill="#FF4C4D" className="red" />
        <circle cx={40} cy={26} r={2} fill="#0080FF" className="blue" />
        <circle cx={86} cy={17} r={2} fill="#0080FF" className="blue" />
        <circle cx={54} cy={16} r={2} fill="#F93" className="yellow" />
        <circle cx={15} cy={10} r={2} fill="#F93" className="yellow" />
        <circle
          cx={62}
          cy={25}
          r={2}
          fill="#8000FF"
          style={{
            filter: "drop-shadow(0 0 2px #8000ff)",
            animation: "combination 8s infinite",
            animationDelay: ".8s",
          }}
        />
      </svg>
    </div>
  );
};

const XmasEffectDark = (props: { className?: string }) => {
  return (
    <div className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={96}
        height={40}
        fill="none"
        className="xmas"
      >
        <style>
          {
            "@keyframes combination{0%{opacity:1;filter:drop-shadow(0 0 2px currentColor)}20%{opacity:1;animation-timing-function:steps(1);filter:drop-shadow(0 0 2px currentColor)}40%{animation-timing-function:steps(1);animation-timing-function:ease-in-out;opacity:1;filter:drop-shadow(0 0 4px currentColor)}21%,23%,25%,27%,29%,31%,33%,35%,37%,39%,70%{opacity:.3;filter:drop-shadow(0 0 0 currentColor)}50%,85%,95%{opacity:.2;filter:drop-shadow(0 0 0 currentColor)}60%{animation-timing-function:ease;opacity:1;filter:drop-shadow(0 0 2px currentColor)}80%{animation-timing-function:ease;animation-timing-function:steps(1);opacity:1;filter:drop-shadow(0 0 4px currentColor)}to{animation-timing-function:steps(1);opacity:1;filter:drop-shadow(0 0 4px currentColor)}}.blue,.green,.red,.yellow{filter:drop-shadow(0 0 2px #26d97f);animation:combination 8s infinite}.blue,.red,.yellow{filter:drop-shadow(0 0 2px #ff4c4d);animation-delay:.2s}.blue,.yellow{filter:drop-shadow(0 0 2px #6eb3f7);animation-delay:.4s}.yellow{filter:drop-shadow(0 0 2px #ffbf00);animation-delay:.6s}"
          }
        </style>
        <circle cx={32} cy={19} r={2} fill="#26D97F" className="green" />
        <circle cx={76} cy={22} r={2} fill="#26D97F" className="green" />
        <circle cx={10} cy={24} r={2} fill="#FF4C4D" className="red" />
        <circle cx={69} cy={13} r={2} fill="#FF4C4D" className="red" />
        <circle cx={40} cy={26} r={2} fill="#6EB3F7" className="blue" />
        <circle cx={86} cy={17} r={2} fill="#6EB3F7" className="blue" />
        <circle cx={54} cy={16} r={2} fill="#FFBF00" className="yellow" />
        <circle cx={15} cy={10} r={2} fill="#FFBF00" className="yellow" />
        <circle
          cx={62}
          cy={25}
          r={2}
          fill="#ED5EC9"
          style={{
            filter: "drop-shadow(0 0 2px #ed5ec9)",
            animation: "combination 8s infinite",
            animationDelay: ".8s",
          }}
        />
      </svg>
    </div>
  );
};
