import Customer from '../models/Customer.js';

// Helper to format date to relative time
const formatRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

// @desc    Get all customers assigned to matchmaker
// @route   GET /api/customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    
    // Transform to include age and map status to stage if needed
    const transformedCustomers = customers.map(customer => {
      const birthDate = new Date(customer.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      
      return {
        ...customer.toObject(),
        age,
        id: customer._id, // Frontend expects id
        stage: customer.status, // Mapping status to stage for frontend
        lastActivity: formatRelativeTime(customer.lastActivity)
      };
    });
    
    res.json(transformedCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer by ID
// @route   GET /api/customers/:id
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      const birthDate = new Date(customer.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      
      res.json({
        ...customer.toObject(),
        age,
        id: customer._id,
        stage: customer.status
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer notes
// @route   PUT /api/customers/:id/notes
export const updateCustomerNotes = async (req, res) => {
  const { notes } = req.body;

  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      customer.notes = notes || customer.notes;
      const updatedCustomer = await customer.save();
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer profile (generic)
// @route   PUT /api/customers/:id
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (customer) {
      // Map 'stage' from frontend to 'status' in backend if present
      if (req.body.stage) {
        req.body.status = req.body.stage;
      }

      // Update fields
      Object.keys(req.body).forEach((key) => {
        if (key !== '_id' && key !== 'id') {
          customer[key] = req.body[key];
        }
      });

      // Update last activity
      customer.lastActivity = new Date();

      const updatedCustomer = await customer.save();
      
      const birthDate = new Date(updatedCustomer.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();

      res.json({
        ...updatedCustomer.toObject(),
        age,
        id: updatedCustomer._id,
        stage: updatedCustomer.status
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
