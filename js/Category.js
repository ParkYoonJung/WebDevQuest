/**
 * Created by YoonJung on 2014-12-03.
 */

function Category(categoryName, categoryId, viewerType, leaf) {
    var categoryName = categoryName;
    var categoryId = categoryId;
    var viewerType = viewerType;
    var leaf = leaf;

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

    this.setViewerType = function(_viewerType) {
        viewerType = _viewerType;
    };

    this.getViewerType = function() {
        return viewerType;
    };

    this.setLeaf = function(_leaf) {
        leaf = _leaf;
    };

    this.getLeaf = function() {
        return leaf;
    };
}