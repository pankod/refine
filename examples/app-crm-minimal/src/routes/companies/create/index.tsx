import { CompanyListPage } from "../list";
import { CompanyCreateModal } from "../list/create-modal";

export const CompanyCreatePage = () => {
  return (
    <CompanyListPage>
      <CompanyCreateModal />
    </CompanyListPage>
  );
};
