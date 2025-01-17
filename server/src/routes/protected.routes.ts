import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { getAllUsers, updateUser } from '../controllers/user.controller';
import { createInventory, deleteInventory, getAllInventory, getAllProductNames, getExportInventory, updateInventory, updateStatusInventory } from '../controllers/inventory.controller';
import { createSales, deleteSalesProduct, getAllSales, getExportSales, getSales, updateSales, updateStatusSales } from '../controllers/sales.controller';
import { createExpense, getAllExpense, getExportExpense, updateExpense, updateStatusExpense } from '../controllers/expense.controller';
import { session } from '../controllers/auth.controller';
import { dashboardData } from '../controllers/dashboard.controller';
import { getAllCustomer } from '../controllers/customer.controller';

const protectedRouter = Router();

// Apply the authentication middleware
protectedRouter.use(authMiddleware);

protectedRouter.get('/session', session);

protectedRouter.get('/dashboard', dashboardData);

// Prefix: /api/protected
protectedRouter.get('/users', getAllUsers);
protectedRouter.post('/user/update', updateUser);

protectedRouter.post('/inventory', getAllInventory);
protectedRouter.get('/inventory/names', getAllProductNames);
protectedRouter.post('/inventory/create', createInventory);
protectedRouter.post('/inventory/:id/update', updateInventory);
protectedRouter.get('/inventory/:id/delete', deleteInventory);
protectedRouter.get('/inventory/:id/:status', updateStatusInventory);
protectedRouter.post('/inventory/export', getExportInventory);

protectedRouter.post('/sales', getAllSales);
protectedRouter.post('/sales/create', createSales);
protectedRouter.get('/sales/:id', getSales);
protectedRouter.post('/sales/:id/update', updateSales);
protectedRouter.get('/sales/:id/:status', updateStatusSales);
protectedRouter.get('/sales/product/:id/delete', deleteSalesProduct);
protectedRouter.post('/sales/export', getExportSales);

protectedRouter.post('/expenses', getAllExpense);
protectedRouter.post('/expenses/create', createExpense);
protectedRouter.post('/expenses/:id/update', updateExpense);
protectedRouter.get('/expenses/:id/:status', updateStatusExpense);
protectedRouter.post('/expenses/export', getExportExpense);

protectedRouter.get('/customers', getAllCustomer);

export default protectedRouter;
