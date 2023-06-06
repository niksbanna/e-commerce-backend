import { Product } from "../models/productModel.js"

// get all products
export const index = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(
        {
            success: true,
            products
        }
    )
}

// get single product
export const show = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(422).send({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json(
        {
            success: true,
            product
        }
    )
}

// create a product - Admin
export const create = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(
        {
            success: true,
            product
        }
    )
}

// update a product - Admin
export const update = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(422).send({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json(
        {
            success: true,
            product
        }
    )
}

// delete a product - Admin
export const destroy = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(422).send({
            success: false,
            message: "Product not found"
        })
    }
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })
}