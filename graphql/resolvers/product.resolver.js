const admin = require("firebase-admin");

const db = admin.firestore();
const productRef = db.collection("Products");

const dummyProduct = [
  {
    name: "Brazilian Carrot Cake - Pack of 4",
    featured: false,
    description: "Delicious as a tea time treat or even as a snack.",
    indregients: [
      "Water",
      "White Rice Flour",
      "Brown Rice Flour",
      "Tapioca Starch",
      "Corn Starch",
      "Buckwheat Flour",
      "Unrefined Sugar",
      "Carrots (10%)",
      "Choco Chips (cocoa [cocoa butter, cocoa mass]",
      "sugar",
      "rice powder",
      "sunflower lecithin [emulsifier] and natural flavouring)",
      "stabiliser: xanthan gum",
      "baking powder: mono calcium phosphate, corn starch, sodium bicarbonate.",
    ],
    available: true,
    stock: 50,
    weightKG: null,
    offerPrice: null,
    price: 5.2,
    category: [
      "Food &amp; Drink",
      "Bakery &amp; Cakes",
      "Cakes &amp; Tray Bakes",
    ],
    tags: ["Incredible Bakery"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/9EDEAE1EC15542E6B696932CA6E7F782.jpg"],
    allergen:
      "This product is gluten free, dairy free, egg free, soya free and vegan.",
  },
  {
    name: "Golden Linseed Loaf - 650g",
    featured: true,
    description:
      "Family size loaf for everyone to share. Perfect for sandwiches or toast",
    indregients: [
      "Water",
      "gram flour",
      "white and brown rice flour",
      "potato starch",
      "tapioca starch",
      "golden linseed (14%)",
      "cold pressed rapeseed oil",
      "stabiliser: xanthan gum",
      "raising agent: yeast, psyllium husk",
      "unrefined sugar and sea salt.",
    ],
    available: true,
    stock: 8,
    weightKG: 0.65,
    salePrice: 2.95,
    price: 3.95,
    category: [
      "Food &amp; Drink",
      "Bakery &amp; Cakes",
      "Bread &amp; Rolls",
      "Dietary",
      "Gluten Free",
      "Soy Free",
    ],
    tags: ["Incredible Bakery"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/F251626CD27448AAB490C25AAC604D72.jpg"],
    allergen:
      "This product is gluten free, dairy free, egg free, soya free and vegan",
  },
  {
    name: "GreenVie Block Greek Style 200g",
    featured: false,
    description:
      "Finally a tasty Vegan Feta that crumbles! GreenVie brings you a refreshing taste of Mediterranean flavour bites will have you craving for more. Use it like Feta you won't be disappointed!",
    indregients: [
      "Water",
      "Coconut Oil (25%)",
      " Starch",
      "Modified Starch*",
      "Potato Protein",
      "Sea Salt",
      "Acidity Regulator: Lactic Acid (Non-dairy)",
      "Vegan Flavourings",
      "Olive Extract",
      "Vitamin B12",
      "*Not to be confused with GMO (Genetically Modified) ingredients.",
    ],
    available: true,
    stock: 5,
    weightKG: 0.2,
    salePrice: 2.8,
    price: 2.99,
    category: ["Food &amp; Drink", "Cheese Blocks", "Cheese", "Special Offers"],
    tags: ["Green Vie"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/greek.jpg"],
    allergen: "This product is free from the main 14 allergens.",
  },
  {
    name: "Meetlyke Vegan Burger - 150g",
    featured: false,
    description:
      "The Meetlyke Vegan Burger with its fine hint of smokey taste can also be used as a steak. Served from the BBQ or from the pan, it makes every meal to a special experience!",
    indregients: [
      "Seitan (Water,WHEAT Protein) 71%",
      "Coconut Fat",
      "Onions",
      "Yeast Extract",
      "Breadcrumbs (WHEAT Flour, Salt, Yeast)",
      "Pea Protein",
      "Flavourings",
      "Spices",
      "Salt",
      "WHEAT Starch",
      "Food Colouring: Iron Oxide.",
    ],
    available: false,
    stock: false,
    weightKG: 0.15,
    salePrice: null,
    price: 3.09,
    category: [
      "Food &amp; Drink",
      "Bacon",
      "Burgers &amp; Steaks",
      "Plant-Based Alternatives",
    ],
    tags: ["Meetlyke"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/vegan_bruger.jpg"],
    allergen:
      "Contains WHEAT (GLUTEN). May contain traces of CELERY , MUSTARD , SOYA and LUPIN.",
  },
  {
    name: "Rolin Vegetarian Mock Chicken Meat 283g",
    featured: false,
    description:
      "Enjoy in a stir fry or marinated for extra flavour in your favourite dishes.",
    indregients: [
      "Fried Wheat Gluten (63%)",
      "Water",
      "Soybean Sauce (Water, Soybean, Salt, Wheat)",
      "Sugar",
      "Salt Colourings",
      "No Additives",
    ],
    available: true,
    stock: 10,
    weightKG: 0.283,
    salePrice: null,
    price: 2.3,
    category: [
      "Food &amp; Drink",
      "Cupboard Staples",
      "Tinned",
      "Jar Foods &amp; Spices",
      "Plant-Based Alternatives",
      "Vegan Proteins",
    ],
    tags: ["Rolin"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/ED290E34571D42D3A2D5B0BE8F8A0ECC.jpg"],
    allergen: " Contains gluten and soya",
  },
  {
    name: "Naturli - Vegan Block 200g",
    featured: false,
    description:
      "Whether you melt it over hot sweetcorn, bake with it, toss your pasta in it, fry with it, spread it on your bread, add it to sauces, or cook your vegetables in it, you'll love this vegan butter!",
    indregients: [
      "Shea Butter Oil* (43%)",
      "Water",
      "Coconut Oil* (21%)",
      "Rapeseed Oil* (11%)",
      "Salt",
      "ALMOND Butter* (1%)",
      "Emulsifier (Lecithin*)",
      "Carrot Juice*",
      "Lemon Juice*",
      "Natural Flavouring",
      "*Organic Ingredient",
    ],
    available: false,
    stock: false,
    weightKG: 0.2,
    salePrice: null,
    price: 1.89,
    category:
      "Food &amp; Drink > Dairy &amp; Egg Alternatives > Butter &amp; Spreads, Food &amp; Drink > Dairy &amp; Egg Alternatives",
    tags: ["Naturli"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/vegan_block.jpg"],
    allergen:
      "Contains ALMOND. May contain traces of HAZELNUT, CASHEW and PISTACHIO.",
  },
  {
    name: "Potato, Mushroom &amp; Spinach Pasty-6",
    featured: false,
    description:
      "Soft pastry filled with a delicious potatoes, mushroom, spinach and seasoning. It can be enjoyed cold or warm",
    indregients: [
      "Pastry: Water, white rice flour, brown rice flour, tapioca starch",
      "potato starch",
      "golden linseed",
      "cold pressed rapeseed oil",
      "vegan spread:(sunflower oil* (50%), palm oil*, water, coconut oil*, carrot juice*, sunflower, lecithin, lemon juice*)",
      "raising agent: yeast, salt, vegetable fibre, unrefined sugar, xanthan gum",
      "Filling: Potatoes, Mushrooms, Spinach, Rapeseed Oil, seasoning (cornflour, potato starch, salt, flavourings, onion powder, palm oil, sugar, garlic powder, ground turmeric).",
    ],
    available: true,
    stock: null,
    weightKG: null,
    salePrice: null,
    price: 18,
    category: [
      "Food &amp; Drink",
      "Bakery &amp; Cakes",
      "Panini's &amp; Pastries",
    ],
    tags: ["Incredible Bakery"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/443C6F85C2ED4F348E81B23974F048EB.jpg"],
    allergen:
      " This product is Gluten Free, Dairy Free, Egg Free, Soya Free &amp; Vegan.",
  },
  {
    name: "Sweets in the City Apple &amp; Watermelon Dual Pouch 50g",
    featured: false,
    description:
      "50g Apple &amp; Watermelon Duals offer a double taste sensation perfect for vegans and vegetarians. Made with a pectin jelly centre bursting to get out!",
    indregients: [
      "Glucose syrup",
      "sugar",
      "dextrose",
      "6% apple juice from concentrate",
      "modified tapioca starch",
      "modified potato starch",
      "acids: citric acid,malic acid,fruit",
      "vegetable concentrates: spirulina ,safflower,carrot,blackcurrant",
      "acidity regulator: sodium citrates ,sodium malates? ,invert sugar syrup,hydrolysed rice protein",
      "gelling agent: pectins flavourings potato protein.",
    ],
    available: false,
    stock: null,
    weightKG: null,
    salePrice: null,
    price: 1.72,
    category: ["Food &amp; Drink", "Snacks", "Sweet Treats"],
    tags: ["sweets in the city"],
    img: ["https://vevibes.com/wp-content/uploads/2021/07/sweets-2.jpg"],
  },
];

module.exports = {
  Query: {
    getProducts: async (_, args, context, info) => {
      console.log(context);
      const productSnapshot = await productRef.get();
      let res = [];
      productSnapshot.forEach((p) => {
        var productId = p.id;
        res.push({
          id: productId,
          ...p.data(),
        });
      });
      return res;
    },
    getProductFromID: async (_, args, context, info) => {
      const productSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .get();
      var res = {
        id: productSnapshot.id,
        ...productSnapshot.data(),
      };
      return res;
    },
  },
  Mutation: {
    addProduct: async (_, args, context, info) => {
      const data = await productRef.add({
        ...args.input,
      });
      dummyProduct.map(async (d) => {
        var dummy = await productRef.add({
            ...d
        });
      })
      const productSnapshot = await data.get();
      var res = {
        id: data.id,
        ...productSnapshot.data(),
      };
      return res;
    },
    updateProduct: async (_, args, context, info) => {
      const productSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .update({
          ...args.updates,
        });
      const updateSnapshot = await db
        .collection("Products")
        .doc(args.productId)
        .get();
      var res = {
        id: updateSnapshot.id,
        ...updateSnapshot.data(),
      };
      return res;
    },
  },
};
