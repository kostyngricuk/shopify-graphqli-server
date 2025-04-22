import express from 'express';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

import { getProducts } from './modules/products.js';
import { getVariantsWithoutImages } from './utils/getVariantsWithoutImages.js';
import { PORT, SHOPIFY_STORE } from './constants.js';
import { shopify } from './config.js';
import { getShopifySession } from './utils/getShopifySession.js';

const app = express();
const port = PORT;

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);


app.listen(port, () => {
  console.log(`Example app: http://localhost:${port}`)
});

app.post('/auth', async (req, res) => {
  try {
    const shop = req.query.shop ?? SHOPIFY_STORE;

    const { session } = await shopify.auth.clientCredentials({
      shop: shopify.utils.sanitizeShop(shop, true)
    });

    req.session.shopifySession = session;

    res.json({
      ...session,
      accessToken: "********************"
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get('/getProducts', async (req, res) => {
  try {
    const response = await getProducts(req);
    const products = response?.body.data.products;

    res.json(products);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.get('/getVariantsWithoutImages', async (req, res) => {
  try {
    const response = await getProducts(req);
    const products = response?.body.data.products;

    const variantsWithoutImages = getVariantsWithoutImages(products);

    res.json(variantsWithoutImages);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})
