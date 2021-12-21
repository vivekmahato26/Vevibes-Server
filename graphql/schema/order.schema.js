module.exports = {
    rootScheme: `
        type Order {
            id: ID!
            address: Address!
            user: User!
            createdAt: String!
            status: [Status]!
            payment: String
            paymentStatus: String!
            shipment: [Shipment]
            lable: [Lable]
            cart: UserCart
            delivery: Float!
        }
        type Shipment {
            shipment_id: String!
            carrier_id: String!
            service_code: String!
            ship_date: String!
            created_at: String!
            modified_at: String!
            shipment_status: String!
        }
        type Lable {
            label_id: String!
            status: String!
            ship_date: String!
            created_at: String!
            shipment_cost: ShipmentCost!
            tracking_number: String!
            is_return_label: Boolean!
            voided: Boolean!
            trackable: Boolean!
            carrier_code: String!
            tracking_status: String!
            pdf: String!
            png: String!
            charge_event: String!
        }

        type ShipmentCost {
            currency: String!
            amount: Float!
        }

        input ShipmentCostInput {
            currency: String!
            amount: Float!
        }

        input LableInput {
            label_id: String!
            status: String!
            ship_date: String!
            created_at: String!
            shipment_cost: ShipmentCostInput!
            tracking_number: String!
            is_return_label: Boolean!
            voided: Boolean!
            trackable: Boolean!
            carrier_code: String!
            tracking_status: String!
            pdf: String!
            png: String!
            charge_event: String!
        }

        input ShipmentInput {
            shipment_id: String!
            carrier_id: String!
            service_code: String!
            ship_date: String!
            created_at: String!
            modified_at: String!
            shipment_status: String!
        }

        input OrderInput {
            address: String!
            status: [StatusInput]!
            payment: String
            paymentStatus: String!
            shipment: [ShipmentInput]
            lable: [LableInput]
            cart: String!
            delivery: Float!
        }
        type Status {
            updatedAt: String!
            status: String!
            statusCode: String!
        }

        input StatusInput {
            updatedAt: String!
            status: String!
            statusCode: String!
        }
    `,
    Query: `
        getOrder(id: String!): Order!
        getUserOrders: [Order]
    `,
    Mutation: `
    createOrder(input:OrderInput): Order
    `
}