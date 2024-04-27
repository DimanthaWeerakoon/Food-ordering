const Restaurant = require("../models/Restaurant.model.js");
const cartServices = require("./cartServices");

module.exports = {
  async createOrder(order, user) {
    try {
      const address = order.deliveryAddressl;
      let savedAddress;
      if (address._id) {
        const isAddressExist = await Address.findById(address._id);
        if (isAddressExist) {
          savedAddress = isAddressExist;
        } else {
          const shippingAddress = new Address(order.deliveryAddress);
          savedAddress = await shippingAddress.save();
        }
      }
      if (!user.addresses.includes(savedAddress._id)) {
        user.addresses.push(savedAddress._id);
        await user.save();
      }

      const restaurant = await Restaurant.findById(order.restaurantId);
      if (!restaurant) {
        throw new Error(`Restaurant not found with ID ${order.restaurantId}`);
      }

      const cart = await cartServices.findCartByUserId(user._id);

      if (!cart) {
        throw new Error("Cart not found");
      }
      const orderItems = [];

      for (const cartItem of cart.items) {
        const orderItem = new orderItems({
          food: cartItem.food,
          ingredients: cartItem.ingredients,
          quantity: cartItem.quantity,
          totalPrice: cartItem.food.price * cartItem.quantity,
        });
        const savedOrderItem = await orderItems.save();
        orderItem.push(savedOrderItem._id);
      }

      const totalPrice = await cartServices.calculateCartTotals(cart);

      const createdOrder = new Order({
        customer: user._id,
        deliveryAddress: savedAddress._id,
        createdAt: new Date(),
        orderStatus: "PENDING",
        totalAmount: totalPrice,
        restaurant: restaurant.id,
        items: orderItems,
      });

      const savedOrder = await createOrder.save();
      restaurant.orders.push(savedOrder._id);
      await restaurant.save();

      //   const paymentResponse = await paymentService.generatePaymentLink(
      //     savedOrder
      //   );
      //   console.log(paymentResponse);
      //   return paymentResponse;
      return savedOrder;
    } catch (error) {
      throw new Error(`Failed to create order:  ${error.message}`);
    }
  },
};
