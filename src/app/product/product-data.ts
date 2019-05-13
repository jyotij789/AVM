export interface Product {
    id: any;
    productName: string;
    productCode: string;
    tags?: any[];
    releaseDate: string;
    price: any;
    description: string;
    starRating: any;
    imageUrl: string;
}
export const products: Product[] = [
    {
        id: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2018',
        description: 'Leaf rake with 48-inch wooden handle',
        price: 19.95,
        starRating: 3.2,
        imageUrl: '../assets/img/rake.jpeg',
        tags: ['rake', 'leaf', 'yard', 'home']
    },
    {
        id: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2018',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        starRating: 4.2,
        imageUrl: '../assets/img/garden_cart.png',
        tags: ['rake', 'leaf', 'yard', 'home']

    },
    {
        id: 3,
        productName: 'Hammer',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2018',
        description: 'Curved claw steel hammer',
        price: 8.9,
        starRating: 4.8,
        imageUrl: '../assets/img/hammer.jpeg',
        tags: ['tools', 'hammer', 'construction']
    },
    {
        id: 4,
        productName: 'Saw',
        productCode: 'TBX-0022',
        releaseDate: 'May 15, 2018',
        description: '15-inch steel blade hand saw',
        price: 11.55,
        starRating: 3.7,
        imageUrl: '../assets/img/hand_saw.jpeg',
        tags: []

    },
    {
        id: 5,
        productName: 'Video Game Controller',
        productCode: 'GMG-0042',
        releaseDate: 'October 15, 2018',
        description: 'Standard two-button video game controller',
        price: 35.95,
        starRating: 4.6,
        imageUrl: '../assets/img/controller.jpeg',
        tags: ['tools', 'hammer',]

    }

]