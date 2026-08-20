import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const services = [
  {
    name: "Swedish Massage",
    slug: "swedish-massage",
    description:
      "Long, flowing strokes that melt surface tension and leave you weightless.",
    duration: 60,
    price: 1800,
  },
  {
    name: "Deep Tissue Massage",
    slug: "deep-tissue-massage",
    description:
      "Focused pressure on stubborn knots and chronic tightness in the deeper muscle layers.",
    duration: 90,
    price: 2600,
  },
  {
    name: "Hot Stone Therapy",
    slug: "hot-stone-therapy",
    description:
      "Smooth heated basalt stones placed along the spine to unwind deep-set stiffness.",
    duration: 90,
    price: 2900,
  },
  {
    name: "Aromatherapy Facial",
    slug: "aromatherapy-facial",
    description:
      "A gentle cleanse, exfoliation and essential-oil massage for a calm, luminous finish.",
    duration: 60,
    price: 2200,
  },
  {
    name: "Body Scrub & Wrap",
    slug: "body-scrub-wrap",
    description:
      "Sea salt polish followed by a nourishing wrap that leaves skin impossibly soft.",
    duration: 75,
    price: 2400,
  },
  {
    name: "Couples Retreat",
    slug: "couples-retreat",
    description:
      "Side-by-side massages in a private suite, with tea service and a quiet hour after.",
    duration: 120,
    price: 5200,
  },
];

const staff = [
  {
    name: "Mia Reyes",
    specialization: "Deep Tissue & Sports",
    bio: "Twelve years releasing the knots desk work leaves behind.",
  },
  {
    name: "Anna Villareal",
    specialization: "Facials & Skin Therapy",
    bio: "Licensed esthetician with a gentle, methodical touch.",
  },
  {
    name: "Josefa Lim",
    specialization: "Hot Stone & Aromatherapy",
    bio: "Trained in Bali; known for the calmest hands in the house.",
  },
  {
    name: "Dan Cruz",
    specialization: "Swedish & Prenatal",
    bio: "Certified prenatal specialist and long-time Swedish practitioner.",
  },
];

async function main() {
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.staff.deleteMany();

  await prisma.service.createMany({ data: services });
  await prisma.staff.createMany({ data: staff });

  const allServices = await prisma.service.findMany();
  const allStaff = await prisma.staff.findMany();

  const names = [
    ["Jane Santos", "jane.santos@example.com"],
    ["Sarah Dela Cruz", "sarah.dc@example.com"],
    ["Miguel Torres", "miguel.t@example.com"],
    ["Liza Ramos", "liza.ramos@example.com"],
    ["Paolo Garcia", "paolo.g@example.com"],
    ["Karen Yu", "karen.yu@example.com"],
  ];

  const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
  const statuses = ["COMPLETED", "COMPLETED", "CONFIRMED", "PENDING"] as const;

  const bookings = [];

  for (let i = 0; i < 60; i++) {
    const daysAgo = Math.floor(Math.random() * 170);
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - daysAgo);
    date.setUTCHours(0, 0, 0, 0);

    const [name, email] = names[i % names.length];

    bookings.push({
      customerName: name,
      customerEmail: email,
      customerPhone:
        "0917" + String(1000000 + Math.floor(Math.random() * 8999999)),
      serviceId: allServices[i % allServices.length].id,
      staffId: allStaff[i % allStaff.length].id,
      date,
      time: times[i % times.length],
      status: statuses[i % statuses.length],
      paymentMethod: ["CASH", "GCASH", "CARD"][i % 3],
    });
  }

  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() + i);
    date.setUTCHours(0, 0, 0, 0);

    const [name, email] = names[i % names.length];

    bookings.push({
      customerName: name,
      customerEmail: email,
      customerPhone: "09171234567",
      serviceId: allServices[(i + 2) % allServices.length].id,
      staffId: allStaff[(i + 1) % allStaff.length].id,
      date,
      time: times[i % times.length],
      status: i % 2 === 0 ? ("CONFIRMED" as const) : ("PENDING" as const),
      paymentMethod: "GCASH",
    });
  }

  await prisma.booking.createMany({ data: bookings });

  console.log(
    "Seeded:",
    allServices.length,
    "services,",
    allStaff.length,
    "staff,",
    bookings.length,
    "bookings"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());