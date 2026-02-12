import User, { UserRole } from 'src/modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedInitalData() {
  try {
    const adminEmail = 'jefe@simtexx.cl';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const [adminUser] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        lastname: 'Jefe',
        role: UserRole.JEFE,
      },
    });

    if (adminUser.role !== UserRole.JEFE) {
      adminUser.role = UserRole.JEFE;
      await adminUser.save();
    }

    console.log('Usuario admin creado:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error('Error al insertar datos iniciales:', error);
  }
}
