/**
 * PROJECT DATA (placeholder).
 *
 * shortcut: hardcoded array, migrate to PostgreSQL once real project data exists.
 * Every entry marked PLACEHOLDER is invented filler. Photos are Unsplash stock (free license)
 * standing in for real project photography; `src: null` renders the hatched placeholder.
 * To swap in real photos: drop files in /public/projects/<slug>/ and set `src` to "/projects/<slug>/x.jpg".
 */

export type ProjectType = "New home" | "Remodel" | "Addition" | "ADU";

export const PROJECT_TYPES: ProjectType[] = ["New home", "Remodel", "Addition", "ADU"];

export type Photo = { src: string | null; alt: string };

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  location: string;
  sqFt: number;
  style: string;
  heroImage: Photo;
  gallery: Photo[];
  beforeAfter?: { before: Photo; after: Photo };
  scope: string;
  services: string[];
  description: string[];
  youtubeId?: string;
};

// shortcut: stock photos served from Unsplash's CDN, replace with real project photography.
export const stock = (id: string, alt: string): Photo => ({
  src: `https://images.unsplash.com/photo-${id}?w=2400&q=80`,
  alt: `${alt} (stock placeholder)`,
});
const gallery = (name: string, ids: string[]) => ids.map((id, i) => stock(id, `${name}, photo ${i + 1}`));

export const projects: Project[] = [
  {
    slug: "spehar-rancho",
    name: "Spehar Rancho",
    type: "Remodel",
    // TODO: confirm real location, square footage, style and scope copy for Spehar Rancho.
    location: "Los Angeles, CA",
    sqFt: 2400,
    style: "California ranch",
    heroImage: stock("1600585154340-be6161a56a0c", "Spehar Rancho at dusk, after the remodel"),
    gallery: gallery("Spehar Rancho", ["1600607687939-ce8a6c25118c", "1600573472550-8090b5e0745e", "1502005229762-cf1b2da7c5d6", "1600607687644-c7171b42498f", "1600566752355-35792bedcfea"]),
    beforeAfter: {
      before: stock("1605276374104-dee2a0ed3cd6", "Spehar Rancho before the remodel"),
      after: stock("1600585154340-be6161a56a0c", "Spehar Rancho after the remodel"),
    },
    // TODO: replace scope + description with the real Spehar Rancho story.
    scope: "Whole-house remodel of a single-story ranch home.",
    services: ["Design", "Construction drawings", "Permitting"],
    description: [
      "Placeholder description. The real Spehar Rancho story goes here: what the house was, what the owners needed, and what changed.",
      "Placeholder description. A second paragraph on the plan, the materials and how the remodel was built.",
    ],
    youtubeId: "wycZU8fNcco",
  },
  // PLACEHOLDER
  {
    slug: "encino-courtyard-house",
    name: "Courtyard House",
    type: "New home",
    location: "Encino, CA",
    sqFt: 3850,
    style: "Modern",
    heroImage: stock("1613490493576-7fde63acd811", "Courtyard House, street view"),
    gallery: gallery("Courtyard House", ["1600596542815-ffad4c1539a9", "1600585154526-990dced4db0d", "1503174971373-b1f69850bded", "1613977257363-707ba9348227"]),
    scope: "New two-story home arranged around a planted central courtyard.",
    services: ["Design", "Construction drawings", "Permitting"],
    description: [
      "Placeholder description. Replace with the real project story.",
      "Placeholder description. A second paragraph on materials, site and process.",
    ],
  },
  // PLACEHOLDER
  {
    slug: "studio-city-adu",
    name: "Garden ADU",
    type: "ADU",
    location: "Studio City, CA",
    sqFt: 640,
    style: "Contemporary",
    heroImage: stock("1518780664697-55e3ad937233", "Garden ADU, entry porch"),
    gallery: gallery("Garden ADU", ["1581858726788-75bc0f6a952d", "1586023492125-27b2c045efd7", "1600210492486-724fe5c67fb0"]),
    scope: "Detached one-bedroom accessory dwelling at the back of a deep lot.",
    services: ["Design", "Plans & permits"],
    description: ["Placeholder description. Replace with the real project story."],
  },
  // PLACEHOLDER
  {
    slug: "sherman-oaks-addition",
    name: "Hillside Addition",
    type: "Addition",
    location: "Sherman Oaks, CA",
    sqFt: 920,
    style: "Mid-century",
    heroImage: stock("1568605114967-8130f3a36994", "Hillside Addition, rear deck"),
    gallery: gallery("Hillside Addition", ["1560448204-e02f11c3d0e2", "1449844908441-8829872d2607", "1600607687644-c7171b42498f", "1502005229762-cf1b2da7c5d6"]),
    beforeAfter: {
      before: stock("1576941089067-2de3c901e126", "Hillside Addition before"),
      after: stock("1600047509807-ba8f99d2cdde", "Hillside Addition after"),
    },
    scope: "Second-story primary suite added over an existing mid-century house.",
    services: ["Design", "Construction drawings", "Permitting"],
    description: ["Placeholder description. Replace with the real project story."],
  },
  // PLACEHOLDER
  {
    slug: "tarzana-kitchen-remodel",
    name: "Tarzana Kitchen",
    type: "Remodel",
    location: "Tarzana, CA",
    sqFt: 1680,
    style: "Transitional",
    heroImage: stock("1556911220-bff31c812dba", "Tarzana Kitchen, island and windows"),
    gallery: gallery("Tarzana Kitchen", ["1600489000022-c2086d79f9d4", "1484154218962-a197022b5858", "1600210492486-724fe5c67fb0"]),
    scope: "Kitchen and family room remodel with a new wall of glass to the garden.",
    services: ["Design consultation", "Plans & permits"],
    description: ["Placeholder description. Replace with the real project story."],
  },
  // PLACEHOLDER
  {
    slug: "woodland-hills-house",
    name: "Oak Ridge House",
    type: "New home",
    location: "Woodland Hills, CA",
    sqFt: 4200,
    style: "Modern farmhouse",
    heroImage: stock("1570129477492-45c003edd2be", "Oak Ridge House, approach"),
    gallery: gallery("Oak Ridge House", ["1583608205776-bfd35f0d9f83", "1480074568708-e7b720bb3f09", "1512917774080-9991f1c4c750", "1523217582562-09d0def993a6"]),
    scope: "New single-family home stepping down a sloped lot under mature oaks.",
    services: ["Design", "Construction drawings", "Permitting"],
    description: ["Placeholder description. Replace with the real project story."],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const formatMeta = (p: Project) =>
  `${p.location} · ${p.sqFt.toLocaleString("en-US")} sq ft`;
