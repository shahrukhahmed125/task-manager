import { hash } from "bcryptjs";
import { prisma } from "../app/lib/prisma";

async function main() {
  const password = await hash("12345678", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password,
    },
  });
}

main()
  .then(() => console.log("Admin user created."))
  .finally(async () => {
    await prisma.$disconnect();
  });