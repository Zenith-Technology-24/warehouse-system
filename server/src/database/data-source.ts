import { DataSource } from 'typeorm';
import { User } from '../models/user.entity';
import 'dotenv/config';
import { Inventory } from '../models/inventory.entity';
import { Sales } from '../models/sales.entity';
import { Customer } from '../models/customer.entity';
import { SalesInventory } from '../models/sales_inventories.entity';
import { Expense } from '../models/expense.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Inventory, Sales, Customer, SalesInventory, Expense],
    synchronize: true,
    logging: true,
});
