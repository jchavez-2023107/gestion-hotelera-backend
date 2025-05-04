import authRoutes from "./auth/auth.routes.js";
/* import productsRoutes from './products/products.routes.js'
import supplierRoutes from './suppliers/suppliers.routes.js'
import categoryRoutes from './category/category.routes.js' */
import hotelRouter from '../src/hotels/hotels.routes.js'

/**
 * Función que recibe la app de Express y registra
 * todas las rutas en una sola llamada.
 */
export const rutasGenerales = (app) => {
  app.use("/api/auth", authRoutes)
  app.use('/api/hotels', hotelRouter)
  /* app.use('/api/products', productsRoutes)
  app.use('/api/suppliers', supplierRoutes)
  app.use('/api/categorys', categoryRoutes) */
};
