import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

const AgentProfile = () => {
  const { id } = useParams();

  const {
    result,
    isError,
    query: { isLoading },
  } = useOne({
    resource: "users",
    id: id as string,
  });

  console.log(data);

  const myProfile = result ?? {};

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
