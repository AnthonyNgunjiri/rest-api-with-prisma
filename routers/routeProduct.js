import { Router } from "express";
import { PrismaClient } from "@prisma/client";


const route = Router();
const prisma = new PrismaClient();


route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getProduct = await prisma.products.findFirst({
      where: { id: id },
      select: {
        productThumbnail: true,
        productTitle: true,
        productDescription: true,
        productCost: true,
        onOffer: true,
      },
    });
    if (getProduct) {
      res.status(200).json(getProduct);
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

route.post("/", async (req, res) => {
    const {
        productThumbnail,
        productTitle,
        productDescription,
        productCost,
        onOffer,
      } = req.body;
  try {
   
    const newProduct = await prisma.products.create({
      data: {
        productThumbnail: productThumbnail,
        productTitle: productTitle,
        productDescription: productDescription,
        productCost: productCost,
        onOffer: onOffer,
      }
   
    });
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

route.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const {
      productThumbnail,
      productTitle,
      productDescription,
      productCost,
      onOffer,
    } = req.body;
    const updatedProduct = await prisma.products.update({
      where: { id: id },
      data: {
        ...(productThumbnail && { productThumbnail }),
        ...(productTitle && { productTitle }),
        ...(productDescription && { productDescription }),
        ...(productCost && { productCost }),
        ...(onOffer !== undefined && { onOffer }),
      },
      select: {
        productThumbnail: true,
        productTitle: true,
        productDescription: true,
        productCost: true,
        onOffer: true,
      },
    });
    res.status(200).json({ updatedProduct });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProducts = await prisma.products.delete({
      where: { id: id },
    });
    res.status(200).json({ deleteProducts });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default route;
