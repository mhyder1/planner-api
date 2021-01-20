function makeUsersArray() {
    return[
        {
            id: 1,
            email: 'email1@email.com',
            first_name: 'James',
            last_name: 'Harden',
            password: 'P@ssword1',
            date_created: '2021-01-20T00:00:00.000Z',
            profile_image: null,
            phone_number: '800-234-3212',
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