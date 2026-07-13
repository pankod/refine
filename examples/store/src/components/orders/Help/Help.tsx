import clsx from "clsx";
import Link from "next/link";

export const Help: React.FC = () => {
  return (
    <div className={clsx("border-t", "border-t-gray-normal")}>
      <h2
        className={clsx(
          "py-4",
          "border-b",
          "border-b-gray-normal",
          "text-base",
          "font-semibold",
          "text-gray-darkest",
        )}
      >
        Need help?
      </h2>
      <div className="text-base text-gray-darkest py-4">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="mailto:info@refine.dev">Contact</Link>
          </li>
          <li>
            <Link href="mailto:info@refine.dev">Returns & Exchanges</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
