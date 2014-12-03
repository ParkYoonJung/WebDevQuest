/**
 * Created by YoonJung on 2014-11-26.
 */
function Communicator() {
    //this.getCategoryList = function (categoryId) {
    this.connection = function(categoryIdInfo) {
        var resultData;
        $.ajax({
            url: "http://softstb.cjhellovision.com:8080/HApplicationServer/getCategoryTree.json?" +
        "version=1&terminalKey=25C5C02283A06C80B1F18FCAB3C36D62" + categoryIdInfo,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (data) {
                resultData = data;
            }// end success
        });// end ajax
        return resultData;
    };

    this.getCategoryList = function(categoryId) {
        var url = "&categoryId=" +categoryId + "&depth=2";
        return url;
    };

    this.getValues = function (data, key) {
        var categoryItems = [];
        for (var i in data) {
            if (!data.hasOwnProperty(i))
                continue;
            if (data[i] != "") {
                if (typeof data[i] == 'object') {
                    categoryItems = categoryItems.concat(this.getValues(data[i], key));
                } else if (i == key) {
                    categoryItems.push(data[i]);
                }
            }
        }
        return categoryItems;
    };

}