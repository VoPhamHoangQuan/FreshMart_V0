import { createSelector } from "@reduxjs/toolkit";

export const homeUserSelector = (state) => state.homeUser;
export const productListSelector = (state) => state.homeUser.productList;
export const categoryMeatFilterSelector = (state) =>
    state.homeUser.categoryMeatFilter;
export const categoryVegetableFilterSelector = (state) =>
    state.homeUser.categoryVegetableFilter;

export const productListCategoryMeatSelector = createSelector(
    productListSelector,
    categoryMeatFilterSelector,
    (productList, categoryFilter) => {
        if (categoryFilter === "") {
            return productList;
        } else {
            const categoryFilterArray = categoryFilter.split(",");
            const productListCategory = productList.filter((product) => {
                return categoryFilterArray.includes(product.category);
            });
            return productListCategory;
        }
    }
);

export const productListCategoryVegetableSelector = createSelector(
    productListSelector,
    categoryVegetableFilterSelector,
    (productList, categoryFilter) => {
        if (categoryFilter === "") {
            return productList;
        } else {
            const categoryFilterArray = categoryFilter.split(",");
            const productListCategory = productList.filter((product) => {
                return categoryFilterArray.includes(product.category);
            });
            return productListCategory;
        }
    }
);
