const foodService = require("../services/FoodService");
const restaurantService = require("../services/RestaurantService");

const searchFood = async (req, res) => {
  try {
    const { name } = req.query;
    const menuItems = await foodService.searchFood(name);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMenuItemByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { vegetatian, seasonal, nonveg, food_category } = req.query;
    const menuItems = await foodService.getRestaurantsFood(
      restaurantId,
      vegetatian,
      seasonal,
      nonveg,
      food_category
    );
    res.status(200).json(menuItems);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const createItem = async (req, res) => {
  try {
    const item = req.body;
    const user = req.user;
    const restaurant = await restaurantService.findRestaurantById(
      item.restaurantId
    );
    const menuItems = await foodService.createFood(item, restaurant);
    res.status(201).json(menuItems);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    await foodService.deleteFood(id);
    res.status(204).json({ message: "Menu item deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const updateAvalabilityStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItems = await foodService.updateAvalabilityStatus(id);
    res.status(200).json(menuItems);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = {
  searchFood,
  getMenuItemByRestaurantId,
  createItem,
  deleteItem,
  updateAvalabilityStatus,
};
