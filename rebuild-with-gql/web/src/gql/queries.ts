import { gql } from "@apollo/client";

export const FIND_PAINTS_BY_NAME = gql`
    query FindByName($name: String!) {
        findByName(name: $name) {
            name
            company
            color {
                hexadecimal
            }
        withSameColor {
            name
            company
        }
    }
}`;