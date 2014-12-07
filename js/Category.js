/**
 * Created by YoonJung on 2014-12-03.
 */

function Category(categoryName, categoryId) {
    var categoryName = categoryName;
    var categoryId = categoryId;

    this.setCategoryName = function(_categoryName) {
        categoryName = _categoryName;
    };

    this.getCategoryName = function() {
        return categoryName;
    };

    this.setCategoryId = function(_categoryId) {
        categoryId = _categoryId;
    };

    this.getCategoryId = function() {
        return categoryId;
    };

}