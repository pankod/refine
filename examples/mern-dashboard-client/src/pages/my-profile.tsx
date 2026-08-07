import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const {
    result,
    isError,
    query: { isLoading },
  } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = result ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
