import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { env } from '../src/env';

const prisma = new PrismaClient();

async function seedDevUser() {
  try {
    console.log('🌱 Seeding dev user...');
    
    const identifier = env.DEV_BYPASS_IDENTIFIER;
    const name = env.DEV_BYPASS_NAME;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (existingUser) {
      // Update existing user to ensure they're verified
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          role: Role.ADMIN,
          // Note: We don't have an isVerified field in the schema, 
          // so we'll handle verification in the auth logic
        }
      });
      console.log(`✅ Updated existing dev user: ${updatedUser.name} (${updatedUser.email || updatedUser.phone})`);
    } else {
      // Create new dev user
      const isEmail = identifier.includes('@');
      
      const newUser = await prisma.user.create({
        data: {
          name,
          email: isEmail ? identifier : `dev-${identifier}@example.com`,
          phone: isEmail ? `+91${identifier}` : identifier,
          role: Role.ADMIN,
        }
      });
      console.log(`✅ Created new dev user: ${newUser.name} (${newUser.email || newUser.phone})`);
    }
    
    console.log('🎉 Dev user seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding dev user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDevUser();
