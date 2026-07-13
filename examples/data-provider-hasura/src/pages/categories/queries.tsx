import gql from "graphql-tag";

export const CATEGORIES_QUERY = gql`
    query GetCategories(
        $offset: Int!
        $limit: Int!
        $order_by: [categories_order_by!]
        $where: categories_bool_exp
    ) {
        categories(
            offset: $offset
            limit: $limit
            order_by: $order_by
            where: $where
        ) {
            id
            title
            created_at
        }
        categories_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const CATEGORY_CREATE_MUTATION = gql`
    mutation CreateCategory($object: categories_insert_input!) {
        insert_categories_one(object: $object) {
            id
        }
    }
`;

export const CATEGORY_UPDATE_MUTATION = gql`
    mutation UpdateCategory($id: uuid!, $object: categories_set_input!) {
        update_categories_by_pk(pk_columns: { id: $id }, _set: $object) {
            id
            title
        }
    }
`;
