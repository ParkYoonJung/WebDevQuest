/**
 * Created by YoonJung on 2014-11-25.
 */

function Model(data, startIndex, pageSize, currentIndex) {

    var data = data;
    var startIndex = startIndex; //화면상 시작점
    var pageSize = pageSize;
    var currentIndex = currentIndex; //배열데이터의 인덱스

    this.setData = function(data) {
        this.data = data;
    };

    this.getData = function() {
        return this.data;
    };

    this.setStartIndex = function(startIndex) {
        this.startIndex = startIndex;
    };

    this.getStartIndex = function() {
        return this.startIndex;
    };

    this.setPageSize = function(pageSize) {
        this.pageSize = pageSize;
    };

    this.getPageSize = function() {
        return this.pageSize;
    };

    this.setCurrentIndex = function(currentIndex) {
        this.currentIndex = currentIndex;
    };

    this.getCurrentIndex = function() {
        return this.currentIndex;
    };

}

Model.prototype.setEndIndex = function(startIndex) {
    this.startIndex = startIndex;
};

Model.prototype.getEndIndex = function() {
    return this.startIndex + this.pageSize;
};

Model.prototype.getTotalItemCount = function() {
    return this.data.length;
};