/**
 * Created by YoonJung on 2014-12-03.
 */

function Category(categoryName, categoryId) {
    var categoryName = categoryName;
    var categoryId = categoryId;

    this.setCategoryName = function(categoryName) {
        this.categoryName = categoryName
    };

    this.getCategoryName = function() {
        return this.categoryName;
    };

    this.setCategoryId = function(categoryId) {
        this.categoryId = categoryId;
    };

    this.getCategoryId = function() {
        return this.categoryId;
    };

}