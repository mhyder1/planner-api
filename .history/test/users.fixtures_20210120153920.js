function makeUsersArray() {
    return[
        {
            id: 1,
            email: 'email1@email.com',
            first_name: 'James',
            last_name: 'Harden',
            password: 'password',
            date_created: null,
            profile_image: null,
            phone_number: null,
            user_type: 'admin'
        },
        // {
        //     "id": 2,
        //     "first_name": "jason",
        //     "password": "jason",
        //     "user_type": "admin"
        // },
        // {
        //     "id": 3,
        //     "first_name": "jasmine",
        //     "password": "jasmine",
        //     "user_type": "admin"
        // },
        // {
        //     "id": 4,
        //     "first_name": "sam",
        //     "password": "sam",
        //     "user_type": "admin"
        // },
        // {
        //     "id": 5,
        //     "first_name": "chris",
        //     "password": "chris",
        //     "user_type": "admin"
        // },
        // {
        //     "id": 6,
        //     "first_name": "steve",
        //     "password": "steve",
        //     "user_type": "admin"
        // }
    ]
}
module.exports={
    makeUsersArray,
}