import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default admin
  const passwordHash = await bcrypt.hash('raymond2026', 12)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  })
  console.log('Admin created:', admin.username)

  // Create default funeral info
  const funeralInfo = await prisma.funeralInfo.findFirst()
  if (!funeralInfo) {
    await prisma.funeralInfo.create({
      data: {
        date: 'Vendredi 20 septembre 2026',
        time: '10h00',
        venue: 'Cathédrale de Ziguinchor',
        address: 'Place de la Cathédrale, Ziguinchor, Sénégal',
        mapsUrl: '',
        program: `10h00 - Accueil des familles et proches
10h30 - Cérémonie religieuse
12h00 - Allocutions et témoignages
13h00 - Levée du corps
13h30 - Cortège funèbre
14h00 - Inhumation`,
      },
    })
    console.log('Funeral info created')
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
