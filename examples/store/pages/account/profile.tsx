import { AccountLayout } from "@components/account";
import { ProfileTemplate } from "@components/profile";

const ProfilePage: React.FC = () => {
  return (
    <AccountLayout>
      <ProfileTemplate />
    </AccountLayout>
  );
};

export default ProfilePage;
