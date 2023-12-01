export class User {

    id: string
    username: string;
    password: string;
    email: string;
    roles: string[];

    ratedBooks: [
        {
            id: number,
            name: string,
            description: string,
            authors: [
                {
                    firstName: string,
                    lastName: string
                }
            ],
            sumRatingMarks: number,
            ratingsQuantity: number,
            averageRating: string,
            genres: [
                { name: string }
            ],
            image: string,
        }
    ]

    purchasedBooks: [
        {
            id: number,
            name: string,
            description: string,
            authors: [
                {
                    firstName: string,
                    lastName: string
                }
            ],
            sumRatingMarks: number,
            ratingsQuantity: number,
            averageRating: string,
            genres: [
                { name: string }
            ],
            image: string
        }
    ]

    constructor(username: string, password: string, email: string, roles: string[]) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
}
