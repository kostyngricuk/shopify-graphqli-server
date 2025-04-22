import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });

export const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
export const HOST_NAME = process.env.HOST_NAME;
export const PORT = process.env.PORT;
