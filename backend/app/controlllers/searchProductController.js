const Product = require("../models/products/product")
const mongoose = require("mongoose")
const Variant = require("../models/products/variant")

module.exports.getAllShirts = async (req, res) => {
    try {
        const products = await Product.find({ product_type: "Clothings", generic_name: { $in: ["Formal Shirts", "Casual Shirts", "T-Shirts"] } })

        const p = await Product.aggregate([
            // Step 1: Match the product you are looking for
            {
                $match: { generic_name: { $in: ["Formal Shirts", "Casual Shirts", "T-Shirts"] } }
            },
            // Step 2: Lookup variants for the matched product
            {
                $lookup: {
                    from: "variants", // Variant collection
                    localField: "_id", // Assuming product's _id is linked to variant's product_id
                    foreignField: "product_id",
                    as: "variants"
                }
            },
            // Step 3: Unwind the variants array to work with each variant
            {
                $unwind: {
                    path: "$variants",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 4: Lookup size variants for each variant
            {
                $lookup: {
                    from: "sizevariants", // SizeVariant collection
                    localField: "variants._id",
                    foreignField: "product_variant_id",
                    as: "variants.sizeVariants"
                }
            },
            // // Step 5: Unwind the sizeVariants array
            {
                $unwind: {
                    path: "$variants.sizeVariants",
                    preserveNullAndEmptyArrays: true
                }
            },
            // // Step 6: Lookup size variant inventory for each size variant
            // {
            //     $lookup: {
            //         from: "SizeVariantInventory", // SizeVariantInventory collection
            //         localField: "variants.sizeVariants._id",
            //         foreignField: "size_variant_id",
            //         as: "variants.sizeVariants.inventory"
            //     }
            // },
            // Step 7: Group or project the final structure
            {
                $group: {
                    _id: "$_id",
                    ideal_for: { $first: "$ideal_for" },
                    pack_of: { $first: "$pack_of" },
                    country_of_origin: { $first: "$country_of_origin" },
                    product_type: { $first: "$product_type" },
                    brand_name: { $first: "$brand_name" },
                    fit: { $first: "$fit" },
                    fabric: { $first: "$fabric" },
                    generic_name: { $first: "$generic_name" },
                    variants: {
                        $push: {
                            _id: "$variants._id",
                            primary_color: "$variants.primary_color",
                            secondary_color: "$variants.secondary_color",
                            size: "$variants.sizeVariants.size",
                            actual_price: "$variants.sizeVariants.actual_price",
                            offered_price: "$variants.sizeVariants.offered_price"
                        }
                    }
                }
            }
        ])


        // console.log(p)
        // console.log(p[0].variants[0])
        // console.log(p[0].variants[0].sizeVariants)
        // console.log(p[0].variants[0].sizeVariants[0])


        // return res.status(200).send({ success: true, message: "Product found successfully", products });
        return res.status(200).send({ success: true, message: "Product found successfully", products: p });
    } catch (error) {
        console.log("Error while finding shirts products", error)
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}

module.exports.getShirtDetails = async (req, res) => {
    try {
        const productId = req.query.productId
        // console.log(productId)

        const product = await Product.aggregate([
            // Step 1: Match the product you are looking for
            {
                $match: { _id: new mongoose.Types.ObjectId(productId) }
            },
            // Step 2: Lookup variants for each product
            {
                $lookup: {
                    from: "variants",
                    localField: "_id",
                    foreignField: "product_id",
                    as: "variants"
                }
            },
            // Step 3: Unwind the variants array
            {
                $unwind: {
                    path: "$variants",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 4: Lookup size variants for each variant
            {
                $lookup: {
                    from: "sizevariants",
                    localField: "variants._id",
                    foreignField: "product_variant_id",
                    as: "variants.sizeVariants"
                }
            },


            // Step 5: Unwind sizeVariants to process each size variant
            {
                $unwind: {
                    path: "$variants.sizeVariants",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Step 6: Lookup size variant inventory for each size variant
            {
                $lookup: {
                    from: "sizevariantinventories", // Ensure correct collection name
                    localField: "variants.sizeVariants._id",
                    foreignField: "size_variant_id",
                    as: "variants.sizeVariants.inventory"
                }
            },
            // Step 7: Group back sizeVariants with inventory inside each variant
            {
                $group: {
                    _id: {
                        productId: "$_id",
                        variantId: "$variants._id"
                    },
                    product_name: { $first: "$product_name" },
                    generic_name: { $first: "$generic_name" },
                    product_description: { $first: "$product_description" },
                    product_type: { $first: "$product_type" },
                    ideal_for: { $first: "$ideal_for" },
                    pack_of: { $first: "$pack_of" },
                    country_of_origin: { $first: "$country_of_origin" },
                    brand_name: { $first: "$brand_name" },
                    fit: { $first: "$fit" },
                    fabric: { $first: "$fabric" },
                    fabric_care: { $first: "$fabric_care" },
                    suitable_for: { $first: "$suitable_for" },
                    sleeve: { $first: "$sleeve" },
                    variants: {
                        $push: {
                            _id: "$variants._id",
                            primary_color: "$variants.primary_color",
                            secondary_color: "$variants.secondary_color",
                            sizeVariants: {
                                _id: "$variants.sizeVariants._id",
                                size: "$variants.sizeVariants.size",
                                actual_price: "$variants.sizeVariants.actual_price",
                                offered_price: "$variants.sizeVariants.offered_price",
                                inventory: "$variants.sizeVariants.inventory"
                            }
                        }
                    }
                }
            },
            // Step 8: Group back variants inside the product
            {
                $group: {
                    _id: "$_id.productId",
                    product_name: { $first: "$product_name" },
                    generic_name: { $first: "$generic_name" },
                    product_description: { $first: "$product_description" },
                    product_type: { $first: "$product_type" },
                    ideal_for: { $first: "$ideal_for" },
                    pack_of: { $first: "$pack_of" },
                    country_of_origin: { $first: "$country_of_origin" },
                    brand_name: { $first: "$brand_name" },
                    fit: { $first: "$fit" },
                    fabric: { $first: "$fabric" },
                    fabric_care: { $first: "$fabric_care" },
                    suitable_for: { $first: "$suitable_for" },
                    sleeve: { $first: "$sleeve" },
                    variants: {
                        $push: "$variants"
                    }
                }
            },




            // Step 5: Group the results back into a product structure with nested variants
            // {
            //     $group: {
            //         _id: "$_id",
            //         product_name: { $first: "$product_name" },
            //         generic_name: { $first: "$generic_name" },
            //         product_description: { $first: "$product_description" },
            //         product_type: { $first: "$product_type" },
            //         ideal_for: { $first: "$ideal_for" },
            //         pack_of: { $first: "$pack_of" },
            //         country_of_origin: { $first: "$country_of_origin" },
            //         brand_name: { $first: "$brand_name" },
            //         fit: { $first: "$fit" },
            //         fabric: { $first: "$fabric" },
            //         fabric_care: { $first: "$fabric_care" },
            //         suitable_for: { $first: "$suitable_for" },
            //         sleeve: { $first: "$sleeve" },
            //         variants: {
            //             $push: {
            //                 _id: "$variants._id",
            //                 primary_color: "$variants.primary_color",
            //                 secondary_color: "$variants.secondary_color",
            //                 sizeVariants: "$variants.sizeVariants"
            //             }
            //         }
            //     }
            // },
            // Optional: Project the final structure
            // {
            //     $project: {
            //         _id: 1,
            //         product_name: 1,
            //         product_type: 1,
            //         ideal_for: 1,
            //         pack_of: 1,
            //         country_of_origin: 1,
            //         brand_name: 1,
            //         fit: 1,
            //         fabric: 1,
            //         variants: 1
            //     }
            // }
        ])

        // console.log(product)

        return res.status(200).send({ success: true, message: "Product found successfully", product });
    } catch (error) {
        console.log("Error while getting shirt details", error)
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}