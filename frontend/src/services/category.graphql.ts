import { gql } from "@apollo/client";

export const getCategories = (terms: string) => {
    return gql`
        query Categories($terms: String!) {
        categories(terms: ${terms}) {
            id
          name
        }
      }
    `
}