import type { HttpError } from "@refinedev/core";

import { useSimpleList, List, useModalForm } from "@refinedev/antd";

import { List as AntdList } from "antd";

import type { ICompany } from "interfaces";
import { CompanyItem, CreateCompany, EditCompany } from "@/components/company";

export const CompanyList = () => {
  const //`useSimpleList` does not accept all of Ant Design's `List` component props anymore. You can directly use `List` component instead.,
    { listProps } = useSimpleList<ICompany>({
      meta: { populate: ["logo"] },
    });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "create",
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "edit",
    meta: { populate: ["logo"] },
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <AntdList
          grid={{ gutter: 16 }}
          {...listProps}
          renderItem={(item) => (
            <AntdList.Item>
              <CompanyItem item={item} editShow={editShow} />
            </AntdList.Item>
          )}
        />
      </List>
      <CreateCompany
        modalProps={createModalProps}
        formProps={createFormProps}
      />
      <EditCompany modalProps={editModalProps} formProps={editFormProps} />
    </>
  );
};
