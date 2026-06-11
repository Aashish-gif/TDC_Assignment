import express from 'express';
import { 
  getCustomers, 
  getCustomerById, 
  updateCustomerNotes,
  updateCustomer 
} from '../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.put('/:id/notes', updateCustomerNotes);

export default router;
