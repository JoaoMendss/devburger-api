import { Router } from "express";
import multer from "multer"; 
import multerConfig from "./config/multer";
import authMiddleware from "./app/middlewares/auth";

import UserController from "./app/controller/UserController";
import SessionController from "./app/controller/SessionController";
import ProductController from "./app/controller/ProductController";
import CategoryController from "./app/controller/CategoryController";
import OrderController from "./app/controller/OrderController";
import CreatePaymentIntentController from "./app/controller/stripe/CreatePaymentIntentController";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store); //Cadastro
routes.post("/sessions", SessionController.store); //Login

routes.use(authMiddleware); //todas as rotas abaixo daqui precisa do middleware
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

routes.post("/create-payment-intent", CreatePaymentIntentController.store);

export default routes;

// request -> middleware -> controller -> model -> database -> response

// This file defines the routes for the DevBurger API. It currently has a single route that
