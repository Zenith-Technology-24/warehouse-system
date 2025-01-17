import { AppDataSource } from '../database/data-source';
import { User } from '../models/user.entity';

const seedSuperAdmin = async () => {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);

    // Check if SuperAdmin already exists
    const superAdmin = await userRepository.findOneBy({ email: 'superadmin@aaa.com' });

    if (!superAdmin) {
        const newSuperAdmin = userRepository.create({
            firstname: 'Aldrin',
            lastname: 'Richard',
            email: 'superadmin@aaa.com',
            password: 'p4ssw0rd0123',
        });

        await userRepository.save(newSuperAdmin);
        console.log('SuperAdmin user created successfully!');
    } else {
        console.log('SuperAdmin user already exists.');
    }

    await AppDataSource.destroy();
};

seedSuperAdmin().catch((error) => console.log(error));
