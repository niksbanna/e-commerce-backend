import catchAsyncErrors from "../../middlewares/catchAsyncErrors.js";
import ApiFeatures from "../../utils/apiFeatures.js";
import ErrorHandler from "../../utils/errorhandler.js";
import { Product } from "../models/productModel.js"

// get all products
export const index = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(), req.query).search().filter();

    let products = await apifeature.query;

    const filteredProductsCount = products.length;

    apifeature.pagination(resultPerPage);

    products = await apifeature.query.clone();

    res.status(200).json(
        {
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount
        }
    )
});

// Get All Product (Admin)
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// get single product
export const show = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json(
        {
            success: true,
            product
        }
    )
})

// create a product - Admin
export const create = catchAsyncErrors(async (req, res) => {
    const imagesLinks = [];
    imagesLinks.push({
        public_id: "macbookjpg_le5xfg",
        url: "https://res.cloudinary.com/dj8e7u4km/image/upload/v1686290676/avatars/macbookjpg_le5xfg.jpg",
    });

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json(
        {
            success: true,
            product
        }
    )
})

// update a product - Admin
export const update = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
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
})

// delete a product - Admin
export const destroy = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })
})

// Create New Review or Update the review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = Number(rating);
                rev.comment = comment;

            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});