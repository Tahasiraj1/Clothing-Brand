// import { client } from '@/sanity/lib/client';

// export async function decrementProductQuantity(productId: string, amount: number) {
//   try {
//     const updatedProduct = await client
//       .patch(productId)
//       .dec({ quantity: amount })
//       .commit()
//     return updatedProduct
//   } catch (error) {
//     console.error('Error decrementing product quantity:', error)
//     throw error; // Propagate the error
//   }
// }



// const products = [
//     { 
//         id: "1", 
//         name: 'product 1', 
//         quantity: 10, 
//         price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", 
//         sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Best Selling'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' 
//     },
//     {
//         id: "2", 
//         name: 'product 2', 
//         quantity: 10, 
//         price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", 
//         sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['On Sale'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' 
//     },
//     {
//         id: "3", 
//         name: 'product 3', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Most Rated', 'Best Selling'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' 
//     },
//     {
//         id: "4", 
//         name: 'product 4', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Best Selling'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "5", 
//         name: 'product 5', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['On Sale'], 
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "6", 
//         name: 'product 6', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Most Rated'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "7", 
//         name: 'product 7', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Best Selling'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "8", 
//         name: 'product 8', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['On Sale'], 
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "9", 
//         name: 'product 9', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Most Rated'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "10", 
//         name: 'product 10', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: ['Best Selling'],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "11", 
//         name: 'product 11', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "12", 
//         name: 'product 12', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "13", 
//         name: 'product 13', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "14", 
//         name: 'product 14', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "15", 
//         name: 'product 15', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "16", 
//         name: 'product 16', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "17", 
//         name: 'product 17', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "18", 
//         name: 'product 18', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling3.jpg',
//             '/images/bestselling1.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "19", 
//         name: 'product 19', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling1.jpg',
//             '/images/bestselling2.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
//     {
//         id: "20", 
//         name: 'product 20', 
//         quantity: 10, price: 100, 
//         images: [
//             '/images/bestselling2.jpg',
//             '/images/bestselling3.1.jpg',
//         ], 
//         ratings: "5.0", sizes: ["Small", "Medium", "Large"], 
//         colors: ['red', 'blue', 'green'], 
//         tags: [],
//         description: 'A slim-fitting lightweight turtleneck thats great for layering or wearing on its own. Whether you are heading into the office or out and about, this timeless sweater gives you that soft touch feel that will make it easy for life on the go.' },
// ];

// export default products;