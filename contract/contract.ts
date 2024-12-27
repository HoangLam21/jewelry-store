import { initContract } from "@ts-rest/core";
import { z } from "zod";
const c = initContract();
export const contract = c.router({
  user: c.router({}),
  customer: c.router({
    createCustomer:{
        method: "POST",
        path: "/api/customer/create",
        body: z.object({
          fullName: z.string(),
          phoneNumber: z.string(),
          email: z.string().email(),
          address: z.string(),
        }),
        responses: {
          201: z.object({
            fullName: z.string(),
            phoneNumber: z.string(),
            email: z.string().email(),
            address: z.string(),
            createdAt: z.date(),
          }),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
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
      query:z.object({
        id:z.string()
      })
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
      query:z.object({
        id:z.string()
      })
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
      query:z.object({
        id:z.string()
      })
    },
  }),
  product: c.router({}),
  import: c.router({}),
  provider: c.router({}),
  order: c.router({}),
  finance: c.router({}),
  cart: c.router({}),
  rating: c.router({}),
  voucher: c.router({}),
  category: c.router({}),
  report: c.router({}),
});
