const main = `
    enum GENDER {
        MALE
        FEMALE
    }

    type Query {
        getCount: Int!
        getAll: [Person]
        getById(id: ID!): Person
    }

    type Mutation {
        create(person: PersonCreate!): Person
        remove(id: ID!): Person
        update(id: ID!, person: PersonUpdate): Person
    }

    type Person {
        id: ID!
        name: String!
        age: Int!
        gender: GENDER!
        phone: String
        email: String
        address: Address!
        cretedAt: String!
    }

    type Address {
        street: String!
        city: String!
        country: String!
        online: String
    }

    input InputAddress {
        street: String!
        city: String!
        country: String!
    }

    input PersonCreate {
        name: String!
        age: Int!
        gender: GENDER!
        phone: String
        email: String!
        address: InputAddress!
    }

    input PersonUpdate {
        name: String
        age: Int
        gender: GENDER
        phone: String
        email: String
        address: InputAddress
    }
`

export default main;