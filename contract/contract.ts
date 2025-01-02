import { initContract } from "@ts-rest/core";
import { z } from "zod";
const c = initContract();
export const contract = c.router({
    user: c.router({}),
    customer: c.router({
        createCustomer: {
            method: "POST",
            path: "/api/customer/create",
            body: z.object({
                fullName: z.string(),
                phoneNumber: z.string(),
                email: z.string().email(),
                address: z.string(),
            }),
            responses: {},
        },
        getCustomers: {
            method: "GET",
            path: "/api/customer/all",
            responses: {},
        },
        getCustomerById: {
            method: "GET",
            path: "/api/customer/id",
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },
        updateCustomer: {
            method: "PUT",
            path: "/api/customer/update",
            body: z.object({
                fullName: z.string().optional(),
                phoneNumber: z.string().optional(),
                email: z.string().email().optional(),
                address: z.string().optional(),
            }),
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },
        deleteCustomer: {
            method: "DELETE",
            path: "/api/customer/delete",
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    staff: c.router({
        createStaff: {
            method: "POST",
            path: "/api/staff/create",
            body: z.object({
                fullName: z.string(),
                phoneNumber: z.string(),
                email: z.string().email(),
                address: z.string(),
                avatar: z.string(),
                enrolledDate: z.date(),
                salary: z.string(),
                position: z.string(),
            }),
            responses: {
                201: z.object({
                    fullName: z.string(),
                    phoneNumber: z.string(),
                    email: z.string().email(),
                    address: z.string(),
                    avatar: z.string(),
                    enrolledDate: z.date(),
                    salary: z.string(),
                    position: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },
        getStaffs: {
            method: "GET",
            path: "/api/staff/all",
            responses: {
                200: z.array(
                    z.object({
                        fullName: z.string(),
                        phoneNumber: z.string(),
                        email: z.string().email(),
                        address: z.string(),
                        avatar: z.string(),
                        enrolledDate: z.date(),
                        salary: z.string(),
                        position: z.string(),
                        createdAt: z.date(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },
        getStaffById: {
            method: "GET",
            path: "/api/staff/id",
            responses: {
                200: z.object({
                    fullName: z.string(),
                    phoneNumber: z.string(),
                    email: z.string().email(),
                    address: z.string(),
                    avatar: z.string(),
                    enrolledDate: z.date(),
                    salary: z.string(),
                    position: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                404: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        updateStaff: {
            method: "PUT",
            path: "/api/staff/update",
            body: z.object({
                fullName: z.string().optional(),
                phoneNumber: z.string().optional(),
                email: z.string().email().optional(),
                address: z.string().optional(),
                avatar: z.string().optional(),
                enrolledDate: z.date().optional(),
                salary: z.string().optional(),
                position: z.string().optional(),
            }),
            responses: {
                200: z.object({
                    fullName: z.string(),
                    phoneNumber: z.string(),
                    email: z.string().email(),
                    address: z.string(),
                    avatar: z.string(),
                    enrolledDate: z.date(),
                    salary: z.string(),
                    position: z.string(),
                    createdAt: z.date(),
                }),

                400: z.object({ error: z.string() }),
                404: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        deleteStaff: {
            method: "DELETE",
            path: "/api/staff/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                404: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    product: c.router({
        getProducts: {
            method: "GET",
            path: "/api/product/all",
            responses: {},
        },
        getProductById: {
            method: "GET",
            path: "/api/product/id",
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },
        createProduct: {
            method: "POST",
            path: "/api/product/create",
            body: z.object({
                name: z.string(),
                cost: z.number(),
                description: z.string(),
                vouchers: z.array(z.string()).optional(),
                provider: z.string(),
                category: z.string().optional(),
                variants: z.array(
                    z.object({
                        material: z.string(),
                        sizes: z.array(
                            z.object({
                                size: z.string(),
                                stock: z.number(),
                            })
                        ),
                        addOn: z.number(),
                    })
                ),
                collections: z.string(),
                images: z.array(z.any()).optional(),
            }),
            responses: {},
        },
        updateProduct: {
            method: "PUT",
            path: "/api/product/update",
            query: z.object({
                id: z.string(),
            }),
            body: z.object({
                name: z.string().optional(),
                cost: z.number().optional(),
                description: z.string().optional(),
                vouchers: z.array(z.string()).optional(),
                provider: z.string().optional(),
                category: z.string().optional(),
                variants: z.array(
                    z.object({
                        material: z.string(),
                        sizes: z.array(
                            z.object({
                                size: z.string(),
                                stock: z.number(),
                            })
                        ),
                        addOn: z.number(),
                    })
                ),
                collections: z.string(),
                images: z.array(z.any()).optional(),
            }),
            responses: {},
        },
        deleteProduct: {
            method: "DELETE",
            path: "/api/product/delete",
            responses: {
                200: z.object({
                    message: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    provider: c.router({
        createProvider: {
            method: "POST",
            path: "/api/provider/create",
            body: z.object({
                name: z.string(),
                address: z.string(),
                contact: z.string(),
            }),
            responses: {},
        },
        getProviders: {
            method: "GET",
            path: "/api/provider/all",
            responses: {
                200: z.array(
                    z.object({
                        name: z.string(),
                        address: z.string(),
                        contact: z.string(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },
        getProviderById: {
            method: "GET",
            path: "/api/provider/id",
            responses: {
                200: z.object({
                    name: z.string(),
                    address: z.string(),
                    contact: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        updateProvider: {
            method: "PUT",
            path: "/api/provider/update",
            body: z.object({
                name: z.string().optional(),
                address: z.string().optional(),
                contact: z.string().optional(),
            }),
            responses: {
                200: z.object({
                    name: z.string(),
                    address: z.string(),
                    contact: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        deleteProvider: {
            method: "DELETE",
            path: "/api/provider/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    rating: c.router({
        getAllRatings: {
            method: "GET",
            path: "/api/rating/all",
            responses: {},
        },
        createRating: {
            method: "POST",
            path: "/api/rating/create",
            body: z.object({
                userId: z.string().uuid(),
                productId: z.string().uuid(),
                point: z.number().min(1).max(5),
                content: z.string().optional(),
                images: z.string().optional(),
            }),
            responses: {},
        },

        getRatingsByProductId: {
            method: "GET",
            path: "/api/rating/product",
            query: z.object({
                productId: z.string(),
            }),
            responses: {},
        },

        getRatingById: {
            method: "GET",
            path: "/api/rating/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {},
        },

        updateRating: {
            method: "PUT",
            path: "/api/rating/update",
            body: z.object({
                point: z.number().min(1).max(5).optional(),
                content: z.string().optional(),
                images: z.string().optional(),
            }),
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },

        deleteRating: {
            method: "DELETE",
            path: "/api/rating/delete",
            responses: {},
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    voucher: c.router({
        createVoucher: {
            method: "POST",
            path: "/api/voucher/create",
            body: z.object({
                name: z.string(),
                discount: z.number(),
                expDate: z.string(),
            }),
            responses: {
                201: z.object({
                    name: z.string(),
                    discount: z.number(),
                    expDate: z.string(),
                    createdAt: z.string(),
                    updatedAt: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getVouchers: {
            method: "GET",
            path: "/api/voucher/all",
            responses: {
                200: z.array(
                    z.object({
                        name: z.string(),
                        discount: z.number(),
                        expDate: z.string(),
                        createdAt: z.string(),
                        updatedAt: z.string(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },

        getVoucherById: {
            method: "GET",
            path: "/api/voucher/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {
                200: z.object({
                    name: z.string(),
                    discount: z.number(),
                    expDate: z.string(),
                    createdAt: z.string(),
                    updatedAt: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateVoucher: {
            method: "PUT",
            path: "/api/voucher/update",
            body: z.object({
                name: z.string().optional(),
                discount: z.number().optional(),
                expDate: z.string().optional(),
            }),
            responses: {
                200: z.object({
                    name: z.string(),
                    discount: z.number(),
                    expDate: z.string(),
                    createdAt: z.string(),
                    updatedAt: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },

        deleteVoucher: {
            method: "DELETE",
            path: "/api/voucher/delete",
            responses: {
                200: z.object({
                    name: z.string(),
                    discount: z.number(),
                    expDate: z.string(),
                    createdAt: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),
    finance: c.router({
        createFinance: {
            method: "POST",
            path: "/api/finance/create",
            body: z.object({
                type: z.string(),
                date: z.date(),
                value: z.number(),
            }),
            responses: {
                201: z.object({
                    type: z.string(),
                    date: z.date(),
                    value: z.number(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getFinances: {
            method: "GET",
            path: "/api/finance/all",
            responses: {
                200: z.array(
                    z.object({
                        type: z.string(),
                        date: z.date(),
                        value: z.number(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },

        getFinanceById: {
            method: "GET",
            path: "/api/finance/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {
                200: z.object({
                    type: z.string(),
                    date: z.date(),
                    value: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateFinance: {
            method: "PUT",
            path: "/api/finance/update",
            body: z.object({
                type: z.string().optional(),
                date: z.date().optional(),
                value: z.number().optional(),
            }),
            responses: {
                200: z.object({
                    type: z.string(),
                    date: z.date(),
                    value: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },

        deleteFinance: {
            method: "DELETE",
            path: "/api/finance/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),

    report: c.router({
        createReport: {
            method: "POST",
            path: "/api/report/create",
            body: z.object({
                staff: z.string(),
                finances: z.array(z.string()),
                revenue: z.number(),
            }),
            responses: {
                201: z.object({
                    staff: z.string(),
                    finances: z.array(z.string()),
                    revenue: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getReports: {
            method: "GET",
            path: "/api/report/all",
            responses: {
                200: z.array(
                    z.object({
                        staff: z.string(),
                        finances: z.array(z.string()),
                        revenue: z.number(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },

        getReportById: {
            method: "GET",
            path: "/api/report/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {
                200: z.object({
                    staff: z.string(),
                    finances: z.array(z.string()),
                    revenue: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateReport: {
            method: "PUT",
            path: "/api/report/update",
            body: z.object({
                staff: z.string().optional(),
                finances: z.array(z.string()).optional(),
                revenue: z.number().optional(),
            }),
            responses: {
                200: z.object({
                    staff: z.string(),
                    finances: z.array(z.string()),
                    revenue: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },

        deleteReport: {
            method: "DELETE",
            path: "/api/report/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),

    import: c.router({
        createImport: {
            method: "POST",
            path: "/api/import/create",
            body: z.object({
                staff: z.string(),
                totalCost: z.number(),
                details: z.record(z.number()),
            }),
            responses: {
                201: z.object({
                    staff: z.string(),
                    totalCost: z.number(),
                    details: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getImports: {
            method: "GET",
            path: "/api/import/all",
            responses: {
                200: z.array(
                    z.object({
                        staff: z.string(),
                        totalCost: z.number(),
                        details: z.record(z.number()),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },

        getImportById: {
            method: "GET",
            path: "/api/import/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {
                200: z.object({
                    staff: z.string(),
                    totalCost: z.number(),
                    details: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateImport: {
            method: "PUT",
            path: "/api/import/update",
            body: z.object({
                staff: z.string().optional(),
                totalCost: z.number().optional(),
                details: z.record(z.number()).optional(),
            }),
            responses: {
                200: z.object({
                    staff: z.string(),
                    totalCost: z.number(),
                    details: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },

        deleteImport: {
            method: "DELETE",
            path: "/api/import/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),

    order: c.router({
        createOrder: {
            method: "POST",
            path: "/api/order/create",
            body: z.object({
                cost: z.number(),
                discount: z.number(),
                details: z.record(
                    z.object({
                        material: z.string(),
                        size: z.string(),
                        quantity: z.number(),
                    })
                ),
                status: z.string(),
                shippingMethod: z.string(),
                ETD: z.date(),
                customer: z.string(),
                staff: z.string(),
            }),
            responses: {
                201: z.object({
                    cost: z.number(),
                    discount: z.number(),
                    details: z.record(
                        z.object({
                            material: z.string(),
                            size: z.string(),
                            quantity: z.number(),
                        })
                    ),
                    status: z.string(),
                    shippingMethod: z.string(),
                    ETD: z.date(),
                    customer: z.string(),
                    staff: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getOrders: {
            method: "GET",
            path: "/api/order/all",
            responses: {
                200: z.array(
                    z.object({
                        cost: z.number(),
                        discount: z.number(),
                        details: z.record(
                            z.object({
                                material: z.string(),
                                size: z.string(),
                                quantity: z.number(),
                            })
                        ),
                        status: z.string(),
                        shippingMethod: z.string(),
                        ETD: z.date(),
                        customer: z.string(),
                        staff: z.string(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },

        getOrderById: {
            method: "GET",
            path: "/api/order/id",
            query: z.object({
                id: z.string(),
            }),
            responses: {
                200: z.object({
                    cost: z.number(),
                    discount: z.number(),
                    details: z.record(
                        z.object({
                            material: z.string(),
                            size: z.string(),
                            quantity: z.number(),
                        })
                    ),
                    status: z.string(),
                    shippingMethod: z.string(),
                    ETD: z.date(),
                    customer: z.string(),
                    staff: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateOrder: {
            method: "PUT",
            path: "/api/order/update",
            body: z.object({
                cost: z.number().optional(),
                discount: z.number().optional(),
                details: z
                    .record(
                        z.object({
                            material: z.string(),
                            size: z.string(),
                            quantity: z.number(),
                        })
                    )
                    .optional(),
                status: z.string().optional(),
                shippingMethod: z.string().optional(),
                ETD: z.date().optional(),
                customer: z.string().optional(),
                staff: z.string().optional(),
            }),
            responses: {
                200: z.object({
                    cost: z.number(),
                    discount: z.number(),
                    details: z.record(
                        z.object({
                            material: z.string(),
                            size: z.string(),
                            quantity: z.number(),
                        })
                    ),
                    status: z.string(),
                    shippingMethod: z.string(),
                    ETD: z.date(),
                    customer: z.string(),
                    staff: z.string(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },

        deleteOrder: {
            method: "DELETE",
            path: "/api/order/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
    }),

    cart: c.router({
        createCart: {
            method: "POST",
            path: "/api/cart/create",
            body: z.object({
                userId: z.string(),
                productId: z.string(),
                quantity: z.number(),
            }),
            responses: {
                201: z.object({
                    userId: z.string(),
                    productId: z.string(),
                    quantity: z.number(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        getCart: {
            method: "GET",
            path: "/api/cart",
            query: z.object({
                userId: z.string(),
            }),
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        updateCartProduct: {
            method: "PUT",
            path: "/api/cart/update/product",
            body: z.object({
                productId: z.string(),
                quantity: z.number(),
            }),
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                userId: z.string(),
            }),
        },

        addProductToCart: {
            method: "POST",
            path: "/api/cart/add/product",
            body: z.object({
                userId: z.string(),
                productId: z.string(),
                quantity: z.number(),
            }),
            responses: {
                201: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        removeProductFromCart: {
            method: "DELETE",
            path: "/api/cart/remove/product",
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                userId: z.string(),
                productId: z.string(),
            }),
        },

        addProductVariantToCart: {
            method: "POST",
            path: "/api/cart/add/product/variant",
            body: z.object({
                userId: z.string(),
                productId: z.string(),
                material: z.string(),
                size: z.string(),
                quantity: z.number(),
            }),
            responses: {
                201: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },

        removeProductVariantFromCart: {
            method: "DELETE",
            path: "/api/cart/remove/product/variant",
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                userId: z.string(),
                productId: z.string(),
                material: z.string(),
                size: z.string(),
            }),
        },

        editProductVariantQuantityInCart: {
            method: "PUT",
            path: "/api/cart/update/product/variant",
            body: z.object({
                material: z.string(),
                size: z.string(),
                quantity: z.number(),
            }),
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.record(z.number()),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                userId: z.string(),
                productId: z.string(),
            }),
        },

        getCartInformationWithVariants: {
            method: "GET",
            path: "/api/cart/variants",
            query: z.object({
                userId: z.string(),
            }),
            responses: {
                200: z.object({
                    userId: z.string(),
                    products: z.array(
                        z.object({
                            product: z.object({
                                id: z.string(),
                                name: z.string(),
                            }),
                            variant: z.object({
                                material: z.string(),
                                size: z.string(),
                            }),
                            quantity: z.number(),
                        })
                    ),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },
    }),
    category: c.router({
        createCategory: {
            method: "POST",
            path: "/api/category/create",
            body: z.object({
                name: z.string(),
                description: z.string(),
            }),
            responses: {
                201: z.object({
                    name: z.string(),
                    description: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },
        getCategories: {
            method: "GET",
            path: "/api/category/all",
            responses: {
                200: z.array(
                    z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
        },
        getCategoryById: {
            method: "GET",
            path: "/api/category/id",
            responses: {
                200: z.object({
                    name: z.string(),
                    description: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        updateCategory: {
            method: "PUT",
            path: "/api/category/update",
            body: z.object({
                name: z.string().optional(),
                description: z.string().optional(),
            }),
            responses: {
                200: z.object({
                    name: z.string(),
                    description: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        deleteCategory: {
            method: "DELETE",
            path: "/api/category/delete",
            responses: {
                200: z.object({ message: z.string() }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                id: z.string(),
            }),
        },
        addProductToCategory: {
            method: "POST",
            path: "/api/category/add-product",
            body: z.object({
                categoryId: z.string(),
                productId: z.string(),
            }),
            responses: {
                200: z.object({
                    category: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                    product: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },
        removeProductFromCategory: {
            method: "DELETE",
            path: "/api/category/remove-product",
            responses: {
                200: z.object({
                    category: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                    product: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                categoryId: z.string(),
                productId: z.string(),
            }),
        },
        editProductCategory: {
            method: "PUT",
            path: "/api/category/edit-product",
            body: z.object({
                productId: z.string(),
                newCategoryId: z.string(),
            }),
            responses: {
                200: z.object({
                    product: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                    newCategory: z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    }),
                }),
                400: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            },
        },
        getProductsOfCategory: {
            method: "GET",
            path: "/api/category/get-products",
            responses: {
                200: z.array(
                    z.object({
                        name: z.string(),
                        description: z.string(),
                        createdAt: z.date(),
                    })
                ),
                500: z.object({ error: z.string() }),
            },
            query: z.object({
                categoryId: z.string(),
            }),
        },
    }),
});
