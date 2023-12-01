export class Book {

    id: number;
    name: string;
    description: string;
    image: string;
    ratingsQuantity: number;
    sumRatingMarks: number;
    averageRating: string;

    authors: [
        {
            firstName: string,
            lastName: string
        }
    ];

    genres: [
        { name: string }
    ]

    constructor(name: string, authors: [{ firstName: string, lastName: string }], image: string, description: string) {
        this.name = name;
        this.authors = authors;
        this.image = image;
        this.description = description;
    }
}
