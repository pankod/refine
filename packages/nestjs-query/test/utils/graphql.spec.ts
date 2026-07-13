import gql from "graphql-tag";

import { getOperationFields, isMutation } from "../../src/utils/graphql";

describe("getOperationFields", () => {
  it("UsersSelect", () => {
    const query = gql`
            query UsersSelect {
                users {
                    nodes {
                        id
                        name
                        avatarUrl
                    }
                }
            }
        `;
    expect(getOperationFields(query)).toMatchSnapshot();
  });

  it("ContactShow", () => {
    const query = gql`
            query ContactShow($id: ID!) {
                contact(id: $id) {
                    id
                    name
                    email
                    company {
                        id
                        name
                        avatarUrl
                    }
                    status
                    jobTitle
                    phone
                    timezone
                    avatarUrl
                    salesOwner {
                        id
                        name
                        avatarUrl
                    }
                    createdAt
                }
            }
        `;

    expect(getOperationFields(query)).toMatchSnapshot();
  });

  it("Upcoming Events", () => {
    const query = gql`
            query UpcomingEvents(
                $filter: EventFilter!
                $sorting: [EventSort!]
                $paging: OffsetPaging!
            ) {
                events(filter: $filter, sorting: $sorting, paging: $paging) {
                    totalCount
                    nodes {
                        id
                        title
                        color
                        startDate
                        endDate
                    }
                }
            }
        `;

    expect(getOperationFields(query)).toMatchSnapshot();
  });

  it("CompaniesTable", () => {
    const query = gql`
            query CompaniesTable(
                $filter: CompanyFilter!
                $sorting: [CompanySort!]!
                $paging: OffsetPaging!
            ) {
                companies(filter: $filter, sorting: $sorting, paging: $paging) {
                    nodes {
                        id
                        name
                        avatarUrl
                        dealsAggregate {
                            sum {
                                value
                            }
                        }
                        salesOwner {
                            id
                            name
                            avatarUrl
                        }
                        contacts {
                            nodes {
                                id
                                name
                                avatarUrl
                            }
                        }
                    }
                    totalCount
                }
            }
        `;

    expect(getOperationFields(query)).toMatchSnapshot();
  });

  it("CompanyTitleForm", () => {
    const query = gql`
            mutation CompanyTitleForm($input: UpdateOneCompanyInput!) {
                updateOneCompany(input: $input) {
                    id
                    name
                    avatarUrl
                    salesOwner {
                        id
                        name
                        avatarUrl
                    }
                }
            }
        `;

    expect(getOperationFields(query)).toMatchSnapshot();
  });

  it("CategoryEdit", () => {
    const query = gql`
            mutation CategoryEdit($input: UpdateOneCategoryInput!) {
                updateOneCategory(input: $input) {
                    id
                    title
                }
            }
        `;

    expect(getOperationFields(query)).toMatchSnapshot();
  });
});

describe("isMutation", () => {
  it("should return true for a mutation", () => {
    const mutation = gql`
            mutation {
                addUser {
                    id
                }
            }
        `;
    expect(isMutation(mutation)).toBeTruthy();
  });

  it("should return false for a query", () => {
    const query = gql`
            {
                users {
                    id
                }
            }
        `;
    expect(isMutation(query)).toBeFalsy();
  });
});
