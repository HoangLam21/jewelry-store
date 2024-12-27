import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { updateCustomerSchema } from "./zod.schema";
const c = initContract();
export const contract = c.router({
  user: c.router({}),
  customer: c.router({
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
      body: updateCustomerSchema,
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
  staff: c.router({}),
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
