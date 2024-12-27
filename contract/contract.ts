import { initContract } from "@ts-rest/core";
import { z } from "zod";
const c = initContract();
export const contract = c.router({
 user:c.router({}),
 customer:c.router({}),
 staff:c.router({}),
 product:c.router({}),
 import:c.router({}),
 provider:c.router({}),
 order:c.router({}),
 finance:c.router({}),
 cart:c.router({}),
 rating:c.router({}),
 voucher:c.router({}),
 category:c.router({}),
 report:c.router({}),
});
