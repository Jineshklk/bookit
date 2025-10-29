// backend/seed.js
const Experience = require("./models/Experience");
const Promo = require("./models/Promo");

async function seed() {
  console.log("⚠ Clearing old experiences...");
  await Experience.deleteMany({}); // <--- FULL RESET

  const samples = [
    {
      title: "Kayaking",
      slug: "kayaking-udupi",
      location: "Udupi",
      locationFull: "Udupi, Karnataka",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 999,
      duration: 3,
      imageUrl: "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
      slots: [
        { date: "2025-11-01", time: "08:00 AM", totalSeats: 10 },
        { date: "2025-11-02", time: "10:00 AM", totalSeats: 8 },
        { date: "2025-11-03", time: "02:00 PM", totalSeats: 6 }
      ]
    },
    {
      title: "Nandi Hills Sunrise",
      slug: "nandi-hills-sunrise",
      location: "Bangalore",
      description: "Sunrise trek with local guide. Transport not included.",
      price: 899,
      duration: 5,
      imageUrl: "https://images.unsplash.com/photo-1692155861048-c23debed7eb8?auto=format&fit=crop&q=80&w=764",
      slots: [
        { date: "2025-11-02", time: "05:00 AM", totalSeats: 20 },
        { date: "2025-11-03", time: "05:00 AM", totalSeats: 20 }
      ]
    },
    {
      title: "Coffee Trail",
      slug: "coffee-trail-coorg",
      location: "Coorg",
      description: "Tasting and plantation tour with local coffee experts.",
      price: 1299,
      duration: 4,
      imageUrl: "https://images.unsplash.com/photo-1710612198146-77512950a4b7?auto=format&fit=crop&q=80&w=1170",
      slots: [
        { date: "2025-11-04", time: "09:00 AM", totalSeats: 12 },
        { date: "2025-11-05", time: "11:00 AM", totalSeats: 12 }
      ]
    },
    // 5 premium mixed
    {
      title: "Desert Safari & Dinner",
      slug: "desert-safari-dubai",
      location: "Dubai",
      description: "Dune bashing, camel ride, and an Arabian dinner under the stars.",
      price: 4999,
      duration: 6,
      imageUrl: "https://images.unsplash.com/photo-1576159470850-494c8b17aca0?auto=format&fit=crop&q=80&w=1170",
      slots: [
        { date: "2025-11-05", time: "04:00 PM", totalSeats: 20 },
        { date: "2025-11-06", time: "05:00 PM", totalSeats: 20 }
      ]
    },
    {
      title: "Luxury Yacht Sunset Cruise",
      slug: "luxury-yacht-bali",
      location: "Bali",
      description: "Sunset cruise with drinks and live music aboard a luxury yacht.",
      price: 7999,
      duration: 3,
      imageUrl: "https://images.unsplash.com/photo-1618760775793-e6c36537f7a1?auto=format&fit=crop&q=80&w=1171",
      slots: [
        { date: "2025-11-07", time: "05:30 PM", totalSeats: 12 },
        { date: "2025-11-08", time: "06:00 PM", totalSeats: 12 }
      ]
    },
    {
      title: "Goa Hidden Beaches Tour",
      slug: "goa-hidden-beaches",
      location: "Goa",
      description: "Private van, secluded beaches and beachside lunch at hidden coves.",
      price: 2999,
      duration: 8,
      imageUrl: "https://images.unsplash.com/photo-1682743710558-b338ba285925?auto=format&fit=crop&q=80&w=1074",
      slots: [
        { date: "2025-11-09", time: "09:00 AM", totalSeats: 14 },
        { date: "2025-11-10", time: "09:00 AM", totalSeats: 14 }
      ]
    },
    {
      title: "Paris Romantic Picnic",
      slug: "paris-romantic-picnic",
      location: "Paris",
      description: "Curated picnic near the Seine with a gourmet basket and local wine.",
      price: 6999,
      duration: 2,
      imageUrl: "https://plus.unsplash.com/premium_photo-1679911014387-a73ff9d2e75f?auto=format&fit=crop&q=80&w=1170",
      slots: [
        { date: "2025-11-11", time: "04:00 PM", totalSeats: 10 },
        { date: "2025-11-12", time: "04:00 PM", totalSeats: 10 }
      ]
    },
    {
      title: "Maldives Overwater Dinner",
      slug: "maldives-overwater-dinner",
      location: "Maldives",
      description: "Exclusive overwater dinner on a private deck with chef-curated menu.",
      price: 12999,
      duration: 2,
      imageUrl: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=1074",
      slots: [
        { date: "2025-11-13", time: "07:00 PM", totalSeats: 8 },
        { date: "2025-11-14", time: "07:00 PM", totalSeats: 8 }
      ]
    }
  ];

  await Experience.insertMany(samples);
  console.log("✅ Fresh experiences inserted.");

  const promoCount = await Promo.countDocuments();
  if (promoCount === 0) {
    console.log("Seeding promos...");
    await Promo.create([
      { code: "SAVE10", type: "PERCENT", value: 10 },
      { code: "FLAT100", type: "FLAT", value: 100 }
    ]);
  }

  console.log("✅ Seeding complete.");
}
module.exports = seed;
