/**
 * Created by YoonJung on 2014-12-09.
 */

function CategoryManager() {
    this.getValues = function (data) {
        var resultCategoryList = [];
        if (data != null) {
            var categoryList = data.categoryList;
            if(categoryList != null && categoryList.length > 1) {
                // 자신을 포함한 데이터가 넘어오기 때문에 0부터가 아닌 1부터 시작
                for (var i = 1; i < categoryList.length; i++) {
                    var categoryName = categoryList[i].categoryName;
                    var categoryId = categoryList[i].categoryId;
                    var viewerType = categoryList[i].viewerType;
                    var leaf = categoryList[i].leaf;
                    var category = new Category(categoryName, categoryId, viewerType, leaf);
                    resultCategoryList.push(category);
                }
            }
        }
        return resultCategoryList;
    };
}