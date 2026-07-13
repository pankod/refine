import gql from "graphql-tag";

export const POSTS_QUERY = gql`
    query GetPosts(
        $offset: Int!
        $limit: Int!
        $order_by: [posts_order_by!]
        $where: posts_bool_exp
    ) {
        posts(
            offset: $offset
            limit: $limit
            order_by: $order_by
            where: $where
        ) {
            id
            title
            content
            category_id
            created_at
            category {
                id
                title
            }
        }
        posts_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const POST_QUERY = gql`
    query GetPost($id: uuid!) {
        posts_by_pk(id: $id) {
            id
            title
            content
            category {
                id
                title
            }
        }
    }
`;

export const POST_CREATE_MUTATION = gql`
    mutation CreatePost($object: posts_insert_input!) {
        insert_posts_one(object: $object) {
            id
        }
    }
`;

export const POST_UPDATE_MUTATION = gql`
    mutation UpdatePost($id: uuid!, $object: posts_set_input!) {
        update_posts_by_pk(pk_columns: { id: $id }, _set: $object) {
            id
            title
            content
            category_id
            category {
                id
                title
            }
        }
    }
`;

export const POST_DELETE_MUTATION = gql`
    mutation DeletePost($id: uuid!) {
        delete_posts_by_pk(id: $id) {
            id
            content
            category {
                id
            }
        }
    }
`;

export const POST_CATEGORIES_SELECT_QUERY = gql`
    query GetPostCategoriesSelect($where: categories_bool_exp) {
        categories(where: $where) {
            id
            title
        }
        categories_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;
