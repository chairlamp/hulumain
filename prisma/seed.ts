const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);
  const driverPassword = await bcrypt.hash("driver123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "customer@example.com",
      password: customerPassword,
      role: "CUSTOMER",
      addresses: {
        create: [
          {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
            isDefault: true,
          },
        ],
      },
    },
  });

  const driver = await prisma.user.upsert({
    where: { email: "driver@example.com" },
    update: {},
    create: {
      name: "Driver User",
      email: "driver@example.com",
      password: driverPassword,
      role: "DELIVERY_AGENT",
      driverStatus: {
        create: {
          isOnline: false,
        },
      },
    },
  });

  console.log("Created users:", { admin, customer, driver });

  // Create restaurants
  const restaurant1 = await prisma.restaurant.upsert({
    where: { id: "clz1" },
    update: {},
    create: {
      id: "clz1",
      name: "Burger Palace",
      description: "Best burgers in town",
      address: "456 Burger Ave, New York, NY 10002",
      image: "/placeholder.svg?height=200&width=200",
      category: "Fast Food",
      rating: 4.5,
      deliveryFee: 2.99,
      estimatedDeliveryTime: 30,
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { id: "clz2" },
    update: {},
    create: {
      id: "clz2",
      name: "Pizza Heaven",
      description: "Authentic Italian pizzas",
      address: "789 Pizza St, New York, NY 10003",
      image: "/placeholder.svg?height=200&width=200",
      category: "Italian",
      rating: 4.7,
      deliveryFee: 3.99,
      estimatedDeliveryTime: 45,
    },
  });

  console.log("Created restaurants:", { restaurant1, restaurant2 });

  // Create menu items
  const menuItems = await Promise.all([
    prisma.menuItem.upsert({
      where: { id: "mi1" },
      update: {},
      create: {
        id: "mi1",
        restaurantId: restaurant1.id,
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and special sauce",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Burgers",
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "mi2" },
      update: {},
      create: {
        id: "mi2",
        restaurantId: restaurant1.id,
        name: "Cheeseburger",
        description: "Classic burger with American cheese",
        price: 9.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Burgers",
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "mi3" },
      update: {},
      create: {
        id: "mi3",
        restaurantId: restaurant1.id,
        name: "French Fries",
        description: "Crispy golden fries",
        price: 3.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sides",
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "mi4" },
      update: {},
      create: {
        id: "mi4",
        restaurantId: restaurant2.id,
        name: "Margherita Pizza",
        description: "Tomato sauce, mozzarella, and basil",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Pizzas",
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "mi5" },
      update: {},
      create: {
        id: "mi5",
        restaurantId: restaurant2.id,
        name: "Pepperoni Pizza",
        description: "Tomato sauce, mozzarella, and pepperoni",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Pizzas",
      },
    }),
    prisma.menuItem.upsert({
      where: { id: "mi6" },
      update: {},
      create: {
        id: "mi6",
        restaurantId: restaurant2.id,
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sides",
      },
    }),
  ]);

  console.log(`Created ${menuItems.length} menu items`);

  // Create a sample order
  const customerAddress = await prisma.address.findFirst({
    where: { userId: customer.id },
  });

  if (customerAddress) {
    const order = await prisma.order.create({
      data: {
        userId: customer.id,
        restaurantId: restaurant1.id,
        addressId: customerAddress.id,
        status: "DELIVERED",
        total: 22.97,
        deliveryFee: 2.99,
        placedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        preparedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
        pickedUpAt: new Date(Date.now() - 22.5 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
        items: {
          create: [
            {
              menuItemId: "mi1",
              quantity: 1,
              price: 8.99,
            },
            {
              menuItemId: "mi2",
              quantity: 1,
              price: 9.99,
            },
            {
              menuItemId: "mi3",
              quantity: 1,
              price: 3.99,
            },
          ],
        },
      },
    });

    console.log("Created sample order:", order);

    const review = await prisma.review.create({
      data: {
        userId: customer.id,
        restaurantId: restaurant1.id,
        orderId: order.id,
        rating: 5,
        comment: "Great food and fast delivery!",
      },
    });

    console.log("Created review:", review);
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: customer.id,
      restaurantId: restaurant2.id,
    },
  });

  console.log("Created favorite:", favorite);
  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
