"use server";

import Cart from "@/database/cart.model";
import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose";
import Product from "@/database/product.model";

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

interface CartProduct {
    productId: string;
    quantity: number;
}

export const addProductsToCart = async (
    userId: string,
    products: CartProduct[]
) => {
    try {
        await connectToDatabase();

        // Validate input
        if (!products || products.length === 0) {
            throw new Error("No products provided");
        }

        // Lấy thông tin sản phẩm để tính toán tổng giá
        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }
                return {
                    id: item.productId,
                    cost: product.cost,
                    quantity: item.quantity,
                };
            })
        );

        // Tạo object để update details Map
        const detailsUpdate = productDetails.reduce((acc, item) => {
            acc[`details.${item.id}`] = item.quantity;
            return acc;
        }, {} as { [key: string]: number });

        // Tính tổng cost của các sản phẩm mới
        const additionalCost = productDetails.reduce((total, item) => {
            return total + item.cost * item.quantity;
        }, 0);

        // Update cart
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: detailsUpdate,
                $inc: { totalCost: additionalCost },
            },
            {
                new: true,
                upsert: true,
            }
        ).populate({
            path: "details",
            populate: {
                path: "key",
                model: "Product",
                select: "name cost files",
            },
        });

        if (!cart) {
            throw new Error("Failed to update cart");
        }

        return cart;
    } catch (error) {
        console.error("Error adding products to cart: ", error);
        throw new Error("Failed to add products to cart");
    } finally {
        await mongoose.connection.close();
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

// Add a product variant to a cart
export const addProductVariantToCart = async (
    userId: string,
    productId: string,
    quantity: number,
    material: string,
    size: string
) => {
    try {
        await connectToDatabase();
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const variant = product.variants.find(
            (variant: any) =>
                variant.material === material &&
                variant.sizes.some((sizeObj: any) => sizeObj.size === size)
        );
        if (!variant) {
            throw new Error("Product variant not found");
        }
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const newDetails = new Map(cart.details);
        if (newDetails.has(productId)) {
            const currentQuantity = newDetails.get(productId);
            newDetails.set(productId, (currentQuantity as any) + quantity);
        } else {
            newDetails.set(productId, quantity);
        }
        const updatedCart = await Cart.findByIdAndUpdate(
            cart._id,
            {
                details: newDetails,
                totalCost: cart.totalCost + quantity,
            },
            { new: true }
        );
        if (!updatedCart) {
            throw new Error("Failed to update cart");
        }
        await mongoose.connection.close();
        return updatedCart;
    } catch (error) {
        console.log("Error adding product variant to cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to add product variant to cart");
    }
};

// Remove a product variant from a cart
export const removeProductVariantFromCart = async (
    userId: string,
    productId: string,
    material: string,
    size: string
) => {
    try {
        await connectToDatabase();
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const variant = product.variants.find(
            (variant: any) =>
                variant.material === material &&
                variant.sizes.some((sizeObj: any) => sizeObj.size === size)
        );
        if (!variant) {
            throw new Error("Product variant not found");
        }
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const newDetails = new Map(cart.details);
        const currentQuantity = newDetails.get(productId);
        if (currentQuantity === 1) {
            newDetails.delete(productId);
        } else {
            newDetails.set(productId, (currentQuantity as any) - 1);
        }
        const updatedCart = await Cart.findByIdAndUpdate(
            cart._id,
            {
                details: newDetails,
                totalCost: cart.totalCost - 1,
            },
            { new: true }
        );
        if (!updatedCart) {
            throw new Error("Failed to update cart");
        }
        await mongoose.connection.close();
        return updatedCart;
    } catch (error) {
        console.log("Error removing product variant from cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to remove product variant from cart");
    }
};

// Edit the quantity of a product variant in a cart
export const editProductVariantQuantityInCart = async (
    userId: string,
    productId: string,
    material: string,
    size: string,
    newQuantity: number
) => {
    try {
        await connectToDatabase();
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const variant = product.variants.find(
            (variant: any) =>
                variant.material === material &&
                variant.sizes.some((sizeObj: any) => sizeObj.size === size)
        );
        if (!variant) {
            throw new Error("Product variant not found");
        }
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const newDetails = new Map(cart.details);
        if (newQuantity === 0) {
            newDetails.delete(productId);
        } else {
            newDetails.set(productId, newQuantity);
        }
        const updatedCart = await Cart.findByIdAndUpdate(
            cart._id,
            {
                details: newDetails,
                totalCost: newQuantity,
            },
            { new: true }
        );
        if (!updatedCart) {
            throw new Error("Failed to update cart");
        }
        await mongoose.connection.close();
        return updatedCart;
    } catch (error) {
        console.log("Error editing product variant quantity in cart: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to edit product variant quantity in cart");
    }
};

// Get all information of a cart with product variants
export const getCartInformationWithVariants = async (userId: string) => {
    try {
        await connectToDatabase();
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const products = [];
        for (const [productId, quantity] of cart.details) {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error("Product not found");
            }
            const variants = product.variants.map((variant: any) => {
                return {
                    material: variant.material,
                    sizes: variant.sizes,
                };
            });
            products.push({
                product: product,
                variants: variants,
                quantity: quantity,
            });
        }
        const cartInformation = {
            userId: cart.user,
            totalCost: cart.totalCost,
            products: products,
        };
        await mongoose.connection.close();
        return cartInformation;
    } catch (error) {
        console.log("Error getting cart information with variants: ", error);
        await mongoose.connection.close();
        throw new Error("Failed to get cart information with variants");
    }
};
