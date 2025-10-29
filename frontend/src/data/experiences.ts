// src/data/experiences.ts
export type Experience = {
   _id?: string;
  id: string;
  title: string;
  location: string; // short city string
  locationFull?: string; // optional full city/state
  description: string;
  price: number; // base price in INR
  imageUrl: string;
  slug?: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "1",
    title: "Kayaking",
    location: "Udupi",
    locationFull: "Udupi, Karnataka",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 999,
    imageUrl:
      "/kayaking.jpg",
    slug: "kayaking-udupi",
  },
  {
    id: "2",
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 899,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-4c6a2b3edc4a?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "nandi-hills-sunrise",
  },
  {
    id: "3",
    title: "Coffee Trail",
    location: "Coorg",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-2d3fe2b1a1a1?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "coffee-trail-coorg",
  },
  {
    id: "4",
    title: "Kayaking",
    location: "Udupi",
    locationFull: "Udupi, Karnataka",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 999,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-3b8f0d94c0f6?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "kayaking-udupi-2",
  },
  {
    id: "5",
    title: "Boat Cruise",
    location: "Sunderban",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 1599,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-6f0a3a9ad4e5?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "boat-cruise",
  },
  {
    id: "6",
    title: "Bungee Jumping",
    location: "Manali",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 1999,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-7a0b2d1f8f3c?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "bungee-jumping",
  },
  {
    id: "7",
    title: "Coffee Trail",
    location: "Coorg",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-5a0fa1f2e1c6?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "coffee-trail-2",
  },
  {
    id: "8",
    title: "Sunset Trek",
    location: "Kodaikanal",
    description:
      "Curated small-group experience. Certified guide. Safety first with gear included.",
    price: 1099,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-1a2f3b4c5d6e?q=80&w=1400&auto=format&fit=crop&crop=entropy",
    slug: "sunset-trek",
  },
];

export default EXPERIENCES;
