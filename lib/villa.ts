import { stock, type Photo } from "./projects";

/**
 * The villa the Home page is built around. Links to its project entry by slug.
 * PLACEHOLDER: every number, amenity and caption below is invented; confirm before launch.
 */
export const VILLA = {
  slug: "spehar-rancho",
  // TODO: set to the real Airbnb listing URL.
  bookingUrl: "https://www.airbnb.com",
  tagline: "A single-story ranch, opened up to the light and the garden. Designed by Ray P. Spehar, and yours to stay in.",
  guests: 6,
  bedrooms: 3,
  baths: 2,
  intro: "Every room was reworked to face the garden. Here is the house, space by space.",
  spaces: [
    {
      name: "Living room",
      body: "One long room from the front door to the garden, with the old ceiling opened up to the roofline.",
      photo: stock("1600607687939-ce8a6c25118c", "Living room"),
    },
    {
      name: "Kitchen",
      body: "A working kitchen with an island for six and a window over the sink.",
      photo: stock("1600489000022-c2086d79f9d4", "Kitchen"),
    },
    {
      name: "Primary suite",
      body: "Doors straight onto the terrace, and quiet enough to sleep in.",
      photo: stock("1600607687644-c7171b42498f", "Primary bedroom"),
    },
    {
      name: "Garden & pool",
      body: "Glass on three sides, so the pool and the garden read as part of the house.",
      photo: stock("1600573472550-8090b5e0745e", "Garden and pool"),
    },
  ] satisfies { name: string; body: string; photo: Photo }[],
  amenities: [
    "Pool",
    "Outdoor dining",
    "Fireplace",
    "Full kitchen",
    "Wi-Fi",
    "Dedicated workspace",
    "Free parking",
    "Washer & dryer",
    "Air conditioning",
  ],
  stayPhoto: stock("1512917774080-9991f1c4c750", "Spehar Rancho pool terrace"),
};
