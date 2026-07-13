import { useGetIdentity } from "@refinedev/core";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { UserAvatar } from "@/registry/new-york/refine-ui/user/user-avatar";
import { cn } from "@/lib/utils";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export function UserInfo() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading || !user) {
    return (
      <div className={cn("flex", "items-center", "gap-x-2")}>
        <Skeleton className={cn("h-10", "w-10", "rounded-full")} />
        <div className={cn("flex", "flex-col", "justify-between", "h-10")}>
          <Skeleton className={cn("h-4", "w-32")} />
          <Skeleton className={cn("h-4", "w-24")} />
        </div>
      </div>
    );
  }

  const { firstName, lastName, email } = user;

  return (
    <div className={cn("flex", "items-center", "gap-x-2")}>
      <UserAvatar />
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-between",
          "h-10",
          "text-left",
        )}
      >
        <span className={cn("text-sm", "font-medium", "text-muted-foreground")}>
          {firstName} {lastName}
        </span>
        <span className={cn("text-xs", "text-muted-foreground")}>{email}</span>
      </div>
    </div>
  );
}

UserInfo.displayName = "UserInfo";
