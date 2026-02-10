"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, X, Loader2, Tag } from "lucide-react";
import {
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useGenerateAIDescriptionMutation,
    useGenerateAISpecificationsMutation,
} from "@/redux/api/product/productApi";
import { useGetCategoriesQuery } from "@/redux/api/category/categoryApi";
import { useGetBrandsQuery } from "@/redux/api/brand/brandApi";
import Image from "next/image";
import { toast } from "sonner";

const AddProductForm = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");

    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
        brandId: "",
        sku: "",
        price: "",
        discountPrice: "",
        stock: "",
        description: "",
        specifications: "",
        tags: [] as string[],
        isFeatured: false,
        isBestSellingProduct: false,
    });

    const [tagInput, setTagInput] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const isEditMode = !!productId;

    // Fetch categories and brands
    const { data: categoriesResponse } = useGetCategoriesQuery();
    const { data: brandsResponse } = useGetBrandsQuery();

    // Fetch product data for editing
    const { data: productResponse, isLoading: isLoadingProduct } =
        useGetProductByIdQuery(productId || "", {
            skip: !productId,
        });

    // Mutations
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [generateAIDescription, { isLoading: isGeneratingDescription }] = useGenerateAIDescriptionMutation();
    const [generateAISpecifications, { isLoading: isGeneratingSpecifications }] = useGenerateAISpecificationsMutation();

    const categories = categoriesResponse?.data || [];
    const brands = brandsResponse?.data || [];
    const product = productResponse?.data;

    // Load product data for editing
    useEffect(() => {
        if (isEditMode && product) {
            setFormData({
                name: product.name || "",
                categoryId: product.categoryId || "",
                brandId: product.brandId || "",
                sku: product.sku || "",
                price: product.price?.toString() || "",
                discountPrice: product.discountPrice?.toString() || "0",
                stock: product.stock?.toString() || "",
                description: product.description || "",
                specifications: product.specifications || "",
                tags: product.tags || [],
                isFeatured: product.isFeatured || false,
                isBestSellingProduct: product.isBestSellingProduct || false,
            });
            if (product.images) {
                setImagePreview(product.images);
            }
        }
    }, [product, isEditMode]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, trimmedTag],
            }));
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
        }));
    };

    const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleGenerateDescription = async () => {
        if (!formData.name) {
            toast.error("Please enter a product name first to use as a prompt");
            return;
        }
        try {
            const res = await generateAIDescription({ prompt: formData.name }).unwrap();
            setFormData(prev => ({ ...prev, description: res.data.description }));
            toast.success("Description generated successfully");
        } catch (error) {
            toast.error("Failed to generate description");
        }
    };

    const handleGenerateSpecifications = async () => {
        if (!formData.name) {
            toast.error("Please enter a product name first to use as a prompt");
            return;
        }
        try {
            const res = await generateAISpecifications({ prompt: formData.name }).unwrap();
            const rawSpecs = (res).data.specifications;
            const specs = Array.isArray(rawSpecs)
                ? rawSpecs.join("\n")
                : rawSpecs;
            setFormData(prev => ({ ...prev, specifications: specs }));
            toast.success("Specifications generated successfully");
        } catch (error) {
            toast.error("Failed to generate specifications");
        }
    };

    const handleSubmit = async () => {
        try {
            const price = parseFloat(formData.price) || 0;
            const discountPrice = parseFloat(formData.discountPrice) || 0;

            if (discountPrice > price) {
                toast.error("Discount price cannot be greater than original price");
                return;
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: price,
                discountPrice: discountPrice,
                stock: parseInt(formData.stock) || 0,
                categoryId: formData.categoryId,
                brandId: formData.brandId,
                specifications: typeof formData.specifications === 'string'
                    ? formData.specifications
                    : Array.isArray(formData.specifications)
                        ? (formData.specifications as string[]).join('\n')
                        : '',
                tags: formData.tags.filter((tag: string) => tag !== ""),
                isFeatured: formData.isFeatured,
                isBestSellingProduct: formData.isBestSellingProduct,
            };

            if (isEditMode && productId) {
                // Update product
                await updateProduct({
                    id: productId,
                    data: productData,
                    image: imageFile || undefined,
                }).unwrap();
            } else {
                // Create product with form-data
                await createProduct({
                    data: productData,
                    image: imageFile || undefined,
                }).unwrap();
            }

            router.push("/dashboard/products");
        } catch (error) {
            console.error("Error submitting product:", error);
        }
    };

    const handleCancel = () => {
        router.push("/dashboard/products");
    };

    const isFormValid =
        formData.name.trim() !== "" &&
        formData.price !== "" &&
        formData.stock !== "" &&
        formData.categoryId !== "" &&
        formData.brandId !== "";

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? "Edit Product" : "Add New Product"}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    {isEditMode
                        ? "Update product information in your catalog"
                        : "Create a new product in your catalog"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Product Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="N95 Respirator Face Mask"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={formData.categoryId}
                                        onValueChange={(value) => handleSelectChange("categoryId", value)}
                                    >
                                        <SelectTrigger className="w-full border-gray-300">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        value={formData.brandId}
                                        onValueChange={(value) => handleSelectChange("brandId", value)}
                                    >
                                        <SelectTrigger className="w-full border-gray-300">
                                            <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem key={brand.id} value={brand.id}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SKU / Model Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    placeholder="N95-8210-20"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price ($) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Discount Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        name="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="isFeatured" className="text-sm text-gray-700 cursor-pointer">
                                        Featured Products
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isBestSellingProduct"
                                        name="isBestSellingProduct"
                                        checked={formData.isBestSellingProduct}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <label htmlFor="isBestSellingProduct" className="text-sm text-gray-700 cursor-pointer">
                                        Best Selling Product
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Product Description
                        </h2>
                        <div className="relative">
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your product..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />

                        </div>
                        <Button size={"lg"} variant={"default"}
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGeneratingDescription}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {isGeneratingDescription ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Description With AI"
                            )}
                        </Button>
                    </div>

                    {/* Specifications */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Specifications
                        </h2>
                        <div className="relative">
                            <textarea
                                name="specifications"
                                value={formData.specifications}
                                onChange={handleInputChange}
                                placeholder="Add product specifications (one per line)..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />

                        </div>
                        <Button size={"lg"} variant={"default"}
                            type="button"
                            onClick={handleGenerateSpecifications}
                            disabled={isGeneratingSpecifications}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {isGeneratingSpecifications ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Specifications With AI"
                            )}
                        </Button>
                    </div>

                    {/* Tags */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Product Tags
                        </h2>
                        <div className="space-y-4">
                            {/* Tag Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={handleTagInputKeyPress}
                                    placeholder="Add tags (press Enter or comma to add)"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 cursor-pointer"
                                >
                                    Add Tag
                                </Button>
                            </div>

                            {/* Tags Display */}
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag: string, index: number) => (
                                        <div
                                            key={index}
                                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            <Tag className="h-3 w-3" />
                                            <span>{tag}</span>
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-gray-500">
                                Add relevant tags to help customers find your product. Examples: &quot;medical&quot;, &quot;protective&quot;, &quot;disposable&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Product Image */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Product Image
                        </h2>
                        <div className="space-y-4">
                            {imagePreview ? (
                                <div className="relative">
                                    <Image
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="w-full h-48 object-cover rounded-md border border-gray-300"
                                        width={500}
                                        height={500}
                                    />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4 cursor-pointer" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col items-center justify-center">
                                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload image</p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={() => handleSubmit()}
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2.5 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                            disabled={isCreating || isUpdating || isLoadingProduct || !isFormValid}
                        >
                            {isCreating || isUpdating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    {isEditMode ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                isEditMode ? "Update Product" : "Publish Product"
                            )}
                        </Button>

                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 py-2.5 cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddProductPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddProductForm />
        </Suspense>
    );
};

export default AddProductPage;
