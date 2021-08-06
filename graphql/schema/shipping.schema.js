module.exports = {
    rootSchema: `
    type Shipment {
        id: String!
        label_id: String!
        status: String!
        shipment_id: String!
        ship_date: String!
        created_at: String!
        currency: String!
        amount: Float!
        tracking_number: String!
        is_return_label: Boolean
        carrier_id: String!
        service_code: String!
        package_code: String
        voided: Boolean!
        voided_at: String
        label_format: String
        trackable: Boolean!
        carrier_code: String!
        tracking_status: String!
        label_download: String!
        charge_event: String!
        packages: [Package]
    }
    type Package {
        package_id: String!
        package_code: String!
        weight: Float!
        weightUnit: String!
        tracking_number: String!
        height: Float
        width: Float
        length: Float
        dimenUnit: String
    }
    input LableInput {
        label_id: String!
        status: String!
        shipment_id: String!
        ship_date: String!
        created_at: String!
        currency: String!
        amount: Float!
        tracking_number: String!
        is_return_label: Boolean
        carrier_id: String!
        service_code: String!
        package_code: String
        voided: Boolean!
        voided_at: String
        label_format: String
        trackable: Boolean!
        carrier_code: String!
        tracking_status: String!
        label_download: String!
        charge_event: String!
        packages: [PackageInput]
    }
    input PackageInput {
        package_id: String!
        package_code: String!
        weight: Float!
        weightUnit: String!
        tracking_number: String!
        height: Float
        width: Float
        length: Float
        dimenUnit: String
    }
    `,

    Query: `
    getShipment(shipmentId: String!) : Shipment
    `,
    Mutation: `
    saveLable(input: LableInput) : Shipment
    `

}