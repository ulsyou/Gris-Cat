// Simple script to create an admin user
// Usage: node scripts/create-admin-simple.js <email> <name> <password>

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  const args = process.argv.slice(2)
  
  if (args.length < 3) {
    console.log('Usage: node scripts/create-admin-simple.js <email> <name> <password>')
    console.log('Example: node scripts/create-admin-simple.js admin@example.com "Admin User" password123')
    process.exit(1)
  }

  const [email, name, password] = args

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log(`User with email ${email} already exists. Updating to ADMIN...`)
      const hashedPassword = bcrypt.hashSync(password, 10)
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          role: 'ADMIN',
          password: hashedPassword,
          name,
        },
      })
      console.log(`✓ User ${email} has been updated to ADMIN role.`)
      console.log(`  Name: ${updatedUser.name}`)
      console.log(`  Role: ${updatedUser.role}`)
    } else {
      // Create new admin user
      const hashedPassword = bcrypt.hashSync(password, 10)
      const adminUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: 'ADMIN',
        },
      })
      console.log(`✓ Admin user created successfully!`)
      console.log(`  Email: ${adminUser.email}`)
      console.log(`  Name: ${adminUser.name}`)
      console.log(`  Role: ${adminUser.role}`)
    }
  } catch (error) {
    console.error('Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

