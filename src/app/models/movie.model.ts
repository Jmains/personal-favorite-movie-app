export interface Movie {
    movieid: string,
    title: string;
    year: string;
    director?: string;
    imageURL?: string;
    rating: number;
    description?: string;
}