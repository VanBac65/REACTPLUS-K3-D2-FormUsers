import moment from "moment"

export const isObjectEqual = (obj1, obj2) => {
    if (obj1.firstName === obj2.firstName
        && obj1.lastName === obj2.lastName
        && obj1.email === obj2.email
        && obj1.gender === obj2.gender
        && obj1.phone === obj2.phone
        && obj1.address === obj2.address
        && moment(obj1.dateOfBirth?._d).format('DD/MM/YYYY') === moment(obj2.dateOfBirth).format('DD/MM/YYYY')
        && JSON.stringify(obj1.isGraduate) === JSON.stringify(obj2.isGraduate)
        && JSON.stringify(obj1.favourites) === JSON.stringify(obj2.favourites)
        && obj1.school === obj2.school
    ) {
        return true
    }
    return false
}