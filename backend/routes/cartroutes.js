const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

router.post("/", async (req, res) => {
  let { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

  
    quantity = Number(quantity);

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity, 
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    }

    const newCart = await Cart.create({
      user: userId || undefined,
      guestId: guestId || "guest_" + Date.now(),
      products: [
        {
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity, 
        },
      ],
      totalPrice: product.price * quantity,
    });

    return res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//update quantity of products in cart
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
      }, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//delete products from cart
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

   
    cart.products.splice(productIndex, 1);

    
    if (cart.products.length === 0) {
      cart.totalPrice = 0;
    } else {
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    return res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get cart
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;