const express = require('express');
const app = express();
const port = 3000;

const restaurantData = [
    { 
      id: "1", 
      name: "Maple Butter",
      rating: 4.6, 
      time: "30-35 mins", 
      cuisine: "Indian, Chinese", 
      discount: "30% OFF", 
      price: "UPTO ₹50", 
      image: "../assets/images/1.jpg"
    },
    { 
      id: "2", 
      name: "Dark Chocolate Heaven", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹50", 
      image: "../assets/images/2.jpg" 
    },
    { 
      id: "3", 
      name: "White Chocolate Heaven", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹60", 
      image: "../assets/images/3.jpg" 
    },
    { 
      id: "4", 
      name: "Coffee Bytes", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹60", 
      image: "../assets/images/4.jpg" 
    },
    { 
      id: "5", 
      name: "Strawberry", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹60", 
      image: "../assets/images/5.jpg" 
    },
    { 
      id: "6", 
      name: "Blueberry", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹70", 
      image: "../assets/images/6.jpg" 
    },
    { 
      id: "7", 
      name: "Oreo Fillings", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹70", 
      image: "../assets/images/7.jpg" 
    },
    { 
      id: "8", 
      name: "Butter Scotch", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹70", 
      image: "../assets/images/8.jpg" 
    },
    { 
      id: "9", 
      name: "Cotton Candy", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹60", 
      image: "../assets/images/9.jpg" 
    },
    { 
      id: "10", 
      name: "KitKat Loaded", 
      rating: 4.2, 
      time: "30-35 mins", 
      cuisine: "South Indian", 
      discount: "40% OFF", 
      price: "UPTO ₹70", 
      image: "../assets/images/10.jpg" 
    }
  ];
  
  // Define the API route to get restaurant data
  app.get('/api/restaurants', (req, res) => {
    res.json({ restaurantData });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/restaurants`);
  });