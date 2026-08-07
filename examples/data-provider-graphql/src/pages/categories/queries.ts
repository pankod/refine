import gql from "graphql-tag";

export const CATEGORY_CREATE_MUTATION = gql`
    mutation CategoryCreate($input: CreateOneCategoryInput!) {
        createOneCategory(input: $input) {
            id
            title
        }
    }
`;

export const CATEGORY_EDIT_MUTATION = gql`
    mutation CategoryEdit($input: UpdateOneCategoryInput!) {
        updateOneCategory(input: $input) {
            id
            title
        }
    }
`;

export const CATEGORIES_LIST_QUERY = gql`
    query CategoriesList(
        $paging: OffsetPaging!
        $filter: CategoryFilter
        $sorting: [CategorySort!]!
    ) {
        categories(paging: $paging, filter: $filter, sorting: $sorting) {
            nodes {
                id
                title
                createdAt
            }
            totalCount
        }
    }
`;
