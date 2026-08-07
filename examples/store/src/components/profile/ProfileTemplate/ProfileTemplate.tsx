import { useOne } from "@refinedev/core";

import {
  ProfileEmail,
  ProfileName,
  ProfilePassword,
  ProfilePhone,
  ProfileBillingAddress,
} from "@components/profile";

export const ProfileTemplate: React.FC = () => {
  const { result } = useOne({
    resource: "customers",
    id: "me",
  });

  const customer = result?.customer;

  return (
    customer && (
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-y-4">
          <h1 className="text-2xl-semi">Profile</h1>
          <p className="text-base-regular">
            View and update your profile information, including your name,
            email, and phone number. You can also update your billing address,
            or change your password.
          </p>
        </div>
        <div className="flex w-full flex-col gap-y-8">
          <ProfileName customer={customer} />
          <Divider />
          <ProfileEmail customer={customer} />
          <Divider />
          <ProfilePhone customer={customer} />
          <Divider />
          <ProfilePassword customer={customer} />
          <Divider />
          <ProfileBillingAddress customer={customer} />
        </div>
      </div>
    )
  );
};

const Divider = () => {
  return <div className="h-px w-full bg-gray-200" />;
};
