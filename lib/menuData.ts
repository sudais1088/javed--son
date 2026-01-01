export type PizzaPrice = {
    s: number; // 7 inches
    m: number; // 10 inches
    l: number; // 13 inches
    f: number; // 16 inches
    p: number; // 21 inches
};

export type MenuItem = {
    id: string;
    name: string;
    description?: string;
    allergens?: string[];
    price: number | PizzaPrice;
    category: string;
    image?: string; // We can add placeholder images or mapping later
    isPizza?: boolean;
};

export const MENU_CATEGORIES = [
    "Pizzas",
    "Burgers",
    "Shawarmas",
    "BBQ",
    "Paratha Rolls"
];

export const MENU_ITEMS: MenuItem[] = [
    // Pizzas
    {
        id: "pizza-1",
        name: "J's Special Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2700 },
        description: "Our signature pizza topped with spicy chicken, olives, mushrooms, onions, and bell peppers, smothered in extra mozzarella cheese.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (1).jpg"
    },
    {
        id: "pizza-2",
        name: "Chicken Tikka Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 800, l: 1300, f: 1800, p: 2600 },
        description: "Traditional Pakistani flavors with marinated chicken tikka chunks, onions, and cheese on a crispy crust.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (2).jpg"
    },
    {
        id: "pizza-3",
        name: "Italiano Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2600 },
        description: "A classic Italian delight featuring pepperoni, mushrooms, sausages, and Italian herbs.",
        allergens: ["Gluten", "Dairy", "Meat"],
        image: "/pizza (3).jpg"
    },
    {
        id: "pizza-4",
        name: "Kabab Crust Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2700 },
        description: "A unique fusion pizza with a stuffed seeking kabab crust and spicy chicken topping.",
        allergens: ["Gluten", "Dairy", "Meat"],
        image: "/pizza (4).jpg"
    },
    {
        id: "pizza-5",
        name: "Cheese Lovers Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2700 },
        description: "For the ultimate cheese fans! Loaded with Mozzarella, Cheddar, and Parmesan cheese.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (5).jpg"
    },
    {
        id: "pizza-6",
        name: "Dough Diven Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1400, f: 1800, p: 2700 },
        description: "Deep pan pizza with extra thick, fluffy dough and generous toppings.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (6).jpg"
    },
    {
        id: "pizza-7",
        name: "Fajita Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2700 },
        description: "Mexican style spicy chicken strips with onions and green peppers.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (7).jpg"
    },
    {
        id: "pizza-8",
        name: "BBQ Pizza",
        category: "Pizzas",
        isPizza: true,
        price: { s: 650, m: 900, l: 1300, f: 1800, p: 2700 },
        description: "Smoky BBQ chicken with onions and a special BBQ sauce drizzle.",
        allergens: ["Gluten", "Dairy"],
        image: "/pizza (1).jpg"
    },

    // Burgers
    {
        id: "burger-1",
        name: "Zinger Burger",
        category: "Burgers",
        price: 350,
        description: "Crispy fried chicken fillet served with fresh lettuce and mayo in a soft sesame bun.",
        allergens: ["Gluten", "Eggs", "Sesame"],
        image: "/burger (1).jpg"
    },
    {
        id: "burger-2",
        name: "Zinger Cheese Burger",
        category: "Burgers",
        price: 400,
        description: "Our classic Zinger topped with a slice of melted cheddar cheese for extra richness.",
        allergens: ["Gluten", "Dairy", "Eggs", "Sesame"],
        image: "/burger (2).jpg"
    },
    {
        id: "burger-3",
        name: "Chicken Tikka Burger",
        category: "Burgers",
        price: 250,
        description: "Grilled chicken tikka patty with spicy sauces and salad.",
        allergens: ["Gluten", "Sesame"],
        image: "/burger (1).jpg"
    },
    {
        id: "burger-4",
        name: "Chicken Tikka Cheese Burger",
        category: "Burgers",
        price: 280,
        description: "Spicy chicken tikka burger enhanced with a slice of cheese.",
        allergens: ["Gluten", "Dairy", "Sesame"],
        image: "/burger (2).jpg"
    },
    {
        id: "burger-5",
        name: "J's Special Burger",
        category: "Burgers",
        price: 450,
        description: "A double-stack delight with both grilled and fried chicken patties, cheese, and special sauce.",
        allergens: ["Gluten", "Dairy", "Eggs", "Sesame"],
        image: "/burger (1).jpg"
    },

    // Shawarmas
    {
        id: "shawarma-1",
        name: "Chicken Cheese Shawarma",
        category: "Shawarmas",
        price: 180,
        description: "Juicy chicken strips wrapped in pita bread with salad, mayo, and cheese.",
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: "shawarma-2",
        name: "Zinger Shawarma",
        category: "Shawarmas",
        price: 250,
        description: "Crispy zinger chicken chunks wrapped in pita with spicy garlic sauce.",
        allergens: ["Gluten", "Eggs"]
    },
    {
        id: "shawarma-3",
        name: "Zinger Cheese Shawarma",
        category: "Shawarmas",
        price: 280,
        description: "Crunchy zinger shawarma with an added layer of melted cheese.",
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: "shawarma-4",
        name: "J's Special Shawarma",
        category: "Shawarmas",
        price: 350,
        description: "Extra large shawarma loaded with extra chicken, cheese, and special sauces.",
        allergens: ["Gluten", "Dairy", "Eggs"]
    },

    // BBQ
    {
        id: "bbq-1",
        name: "Chicken Steam Roast",
        category: "BBQ",
        price: 1200,
        description: "Whole chicken marinated in yogurt and spices, steam cooked to tenderness, then lightly fried.",
        allergens: ["Dairy"],
        image: "/bbq 1.jpg"
    },
    {
        id: "bbq-2",
        name: "1x Steam Chicken Piece",
        category: "BBQ",
        price: 270,
        description: "Single piece of our famous steam roast chicken.",
        allergens: ["Dairy"],
        image: "/bbq 1.jpg"
    },
    {
        id: "bbq-3",
        name: "2x Steam Chicken Pieces",
        category: "BBQ",
        price: 540,
        description: "Two pieces of succulent steam roast chicken.",
        allergens: ["Dairy"],
        image: "/bbq 1.jpg"
    },
    {
        id: "bbq-4",
        name: "3x Steam Chicken Pieces",
        category: "BBQ",
        price: 800,
        description: "Three pieces of steam roast chicken, perfect for sharing.",
        allergens: ["Dairy"],
        image: "/bbq 1.jpg"
    },

    // Paratha Rolls
    {
        id: "roll-1",
        name: "Chicken BBQ Paratha Roll",
        category: "Paratha Rolls",
        price: 300,
        description: "Smoky BBQ chicken chunks wrapped in a crispy, flaky paratha.",
        allergens: ["Gluten", "Dairy"],
        image: "/bread  (1).jpg"
    },
    {
        id: "roll-2",
        name: "Chicken Cheese Paratha Roll",
        category: "Paratha Rolls",
        price: 350,
        description: "BBQ chicken paratha roll with melted cheese inside.",
        allergens: ["Gluten", "Dairy"],
        image: "/bread  (2).jpg"
    },
    {
        id: "roll-3",
        name: "Stuffed Cheese Paratha Roll",
        category: "Paratha Rolls",
        price: 380,
        description: "Paratha stuffed with spiced chicken and cheese, then rolled to perfection.",
        allergens: ["Gluten", "Dairy"],
        image: "/bread  (3).jpg"
    },

    // Cakes
    {
        id: "cake-1",
        name: "Chocolate Fudge Cake",
        category: "Cakes",
        price: 1200,
        description: "Rich, dense chocolate cake layered with silky chocolate fudge frosting.",
        allergens: ["Gluten", "Dairy", "Eggs"],
        image: "/dry (1).jpg"
    },
    {
        id: "cake-2",
        name: "Red Velvet Cake",
        category: "Cakes",
        price: 1500,
        description: "Classic red velvet sponge with a hint of cocoa, topped with smooth cream cheese frosting.",
        allergens: ["Gluten", "Dairy", "Eggs"],
        image: "/dry (2).jpg"
    },

    // Pastries
    {
        id: "pastry-1",
        name: "Chocolate Brownie",
        category: "Pastries",
        price: 250,
        description: "Fudgy, gooey chocolate brownie with a crinkle top.",
        allergens: ["Gluten", "Dairy", "Eggs"],
        image: "/dry (1).jpg"
    },
    {
        id: "pastry-2",
        name: "Cream Puff",
        category: "Pastries",
        price: 150,
        description: "Light choux pastry filled with fresh whipped cream.",
        allergens: ["Gluten", "Dairy", "Eggs"],
        image: "/dry (2).jpg"
    }
];

export const PIZZA_SIZES = [
    { key: 's', label: 'S (7")', icon: 'Items' },
    { key: 'm', label: 'M (10")', icon: 'Items' },
    { key: 'l', label: 'L (13")', icon: 'Items' },
    { key: 'f', label: 'F (16")', icon: 'Items' },
    { key: 'p', label: 'P (21")', icon: 'Items' },
];
