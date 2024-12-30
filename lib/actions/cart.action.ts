"use server";

import Cart from "@/database/cart.model";
import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";

// Add a product to a cart
export const addProductToCart = async (
    userId: string,
    productId: string,
    quantity: number
) => {
    try {
        await connectToDatabase();
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: {
                    [`details.${productId}`]: quantity,
                },
                $inc: {
                    totalCost: quantity,
                },
            },
            { new: true, upsert: true }
        );
        if (!cart) {
            throw new Error("Cart not found");
        }
        await mongoose.connection.close();
        return cart;
    } catch (error) {
        console.log("Error adding product to cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to add product to cart");
    }
};

// Remove a product from a cart
export const removeProductFromCart = async (
    userId: string,
    productId: string
) => {
    try {
        await connectToDatabase();
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $unset: { [`details.${productId}`]: "" },
            },
            { new: true }
        );
        if (!cart || !cart.details) {
            throw new Error("Cart or product not found");
        }
        const productQuantity = cart.details.get(productId);
        if (!productQuantity) {
            throw new Error("Product not found in cart");
        }
        // Update total cost
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $inc: { totalCost: -productQuantity } },
            { new: true }
        );
        if (!updatedCart) {
            throw new Error("Failed to update cart");
        }
        await mongoose.connection.close();
        return updatedCart;
    } catch (error) {
        console.log("Error removing product from cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to remove product from cart");
    }
};

// Edit the quantity of a product in a cart
export const editProductQuantityInCart = async (
    userId: string,
    productId: string,
    newQuantity: number
) => {
    try {
        await connectToDatabase();
        const cart = await Cart.findOne({ user: userId });
        if (!cart || !cart.details) {
            throw new Error("Cart not found");
        }
        const currentQuantity = cart.details.get(productId);
        if (!currentQuantity) {
            throw new Error("Product not found in cart");
        }
        // Update quantity
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: {
                    [`details.${productId}`]: newQuantity,
                },
                $inc: {
                    totalCost: newQuantity - currentQuantity,
                },
            },
            { new: true }
        );
        if (!updatedCart) {
            throw new Error("Failed to update cart");
        }
        await mongoose.connection.close();
        return updatedCart;
    } catch (error) {
        console.log("Error editing product quantity in cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to edit product quantity in cart");
    }
};

// Get all information of a cart
export const getCartInformation = async (userId: string) => {
    try {
        await connectToDatabase();
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const cartInformation = {
            userId: cart.user,
            totalCost: cart.totalCost,
            products: Object.fromEntries(cart.details),
        };
        await mongoose.connection.close();
        return cartInformation;
    } catch (error) {
        console.log("Error getting cart information: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to get cart information");
    }
};
