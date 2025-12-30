import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function createAdmin() {
  try {
    console.log('=== Create Admin User ===\n')

    const email = await question('Enter admin email: ')
    const name = await question('Enter admin name: ')
    const password = await question('Enter admin password: ')

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log(`\nUser with email ${email} already exists.`)
      const update = await question('Do you want to update this user to ADMIN? (y/n): ')
      
      if (update.toLowerCase() === 'y') {
        const hashedPassword = bcrypt.hashSync(password, 10)
        await prisma.user.update({
          where: { email },
          data: {
            role: 'ADMIN',
            password: hashedPassword,
            name,
          },
        })
        console.log(`\n✓ User ${email} has been updated to ADMIN role.`)
      } else {
        console.log('Operation cancelled.')
      }
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
      console.log(`\n✓ Admin user created successfully!`)
      console.log(`  Email: ${adminUser.email}`)
      console.log(`  Name: ${adminUser.name}`)
      console.log(`  Role: ${adminUser.role}`)
    }
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createAdmin()

