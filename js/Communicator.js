/**
 * Created by YoonJung on 2014-11-26.
 */
function Communicator() {
    this.connection = function (apiInfo) {
        var resultData;
        $.ajax({
            url: "http://softstb.cjhellovision.com:8080/HApplicationServer/"+apiInfo,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                resultData = data;
            }// end success
        });// end ajax
        return resultData;
    };

    this.getCategoryList = function (apiName, categoryId) {
        var apiName = apiName + ".json?";
        var version = "version=1";
        var terminalKey = "25C5C02283A06C80B1F18FCAB3C36D62";
        var url = apiName + version + "&terminalKey="+ terminalKey + "&categoryId=" + categoryId + "&depth=2";

        return url;
    };

    this.getValues = function (data) {
        var resultCategoryList = [];
        if (data != null) {
            var categoryList = data.categoryList;
            if(categoryList != null && categoryList.length > 1) {
                console.log(categoryList.length);
                // 자신을 포함한 데이터가 넘어오기 때문에 0부터가 아닌 1부터 시작
                for (var i = 1; i < categoryList.length; i++) {
                    var categoryName = categoryList[i].categoryName;
                    var categoryId = categoryList[i].categoryId;
                    var category = new Category(categoryName, categoryId);
                    resultCategoryList.push(category);
                }
            }
        }
        return resultCategoryList;
    };

}