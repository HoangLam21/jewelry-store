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
  import: c.router({}),
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
  order: c.router({}),
  finance: c.router({}),
  cart: c.router({}),
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
  category: c.router({}),
  report: c.router({}),
});
