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
            }
        });
        return resultData;
    };

    this.getCategoryList = function (apiName, categoryId) {
        var apiName = apiName + ".json?";
        var version = "version=1&";
        var terminalKey = "terminalKey=25C5C02283A06C80B1F18FCAB3C36D62";
        var url = apiName + version + ""+ terminalKey + "&categoryId=" + categoryId + "&depth=2&categoryProfile=4";

        return url;
    };

    this.getContentGroupList = function(apiName, categoryId) {
        var apiName = apiName + ".json?";
        var version = "version=1&";
        var terminalKey = "terminalKey=25C5C02283A06C80B1F18FCAB3C36D62";
        var url = apiName + version + ""+ terminalKey + "&categoryId=" + categoryId+"&contentGroupProfile=2";

        return url;
    };
}