const restaurantService = require("../services/RestaurantService");

const createRestaurant = async (req, res) => {
  try {
    const user = req.user;
    const restaurant = await RestaurantService.createRestaurant(req.body, user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    await restaurantService.deleteRestaurant(id);
    res.status(200).json({
      message: "Restaurant deleted with ID successfully !",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("restaurant id", id);
    const restaurant = await restaurantService.updateRestaurantStatus(
      id.toString()
    );
    console.log("restaurant id", id);
    res.status(200).json({ restaurant });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const findRestaurantyByUserId = async (res, req) => {
  try {
    const user = req.user;
    const restaurant = await restaurantService.getRestaurantsByUserId(user._id);
    res.status(200).json({ restaurant });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const searchRestaurant = async (res, req) => {
  try {
    const { keyword } = req.query;
    const restaurants = await restaurantService.searchRestaurant(keyword);
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.findRestaurantById(id);
    res.status(200).json({ restaurant });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const addToFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const restaurant = await restaurantService.addToFavorites(id, user);
    res.status(200).json({ restaurant });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  createRestaurant,
  deleteRestaurant,
  updateRestaurantStatus,
  findRestaurantyByUserId,
  searchRestaurant,
  getAllRestaurants,
  findRestaurantById,
  addToFavorite,
};
