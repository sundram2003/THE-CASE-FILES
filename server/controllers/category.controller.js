import { Category } from '../models/category.model.js';


// Controller function to create a category
export const createCategory = async (req, res) => {
  try {
    // Extract the category details from the request body
    const { name, description } = req.body;
    console.log("Name and description", name, description)
    // Create a new category object
    const category = new Category({
      name,
      description,
    });

    // Save the category to the database
    await category.save();

    // Return the created category as the response
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({});

    // Return the fetched categories as the response
    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      categories
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

