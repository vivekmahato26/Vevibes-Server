module.exports = {
    rootSchema: `
        union BooleanResult = Sucess | Error
        union ProductResult = Product | Error
        union SigninResult = Auth | Error
        union AddressesResult = Addresses | Error
        union ProductsResult = Products | Error
        union CardsResult = Cards | Error
        union UserResult = User | Error
        union CardResult = Card | Error
        union AddressResult = Address | Error
        union UsersResult = Users | Error
        union SignupResult = UserId | Error
    `
}