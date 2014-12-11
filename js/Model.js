/**
 * Created by YoonJung on 2014-11-25.
 */

function Model(data, startIndex, pageSize, currentIndex) {
    var data = data;
    var startIndex = startIndex; //화면상 시작점
    var pageSize = pageSize;
    var currentIndex = currentIndex; //배열데이터의 인덱스
    var visible = false;

    this.setData = function(_data) {
        data = _data;
    };

    this.getData = function() {
        return data;
    };

    this.setStartIndex = function(_startIndex) {
        startIndex = _startIndex;
    };

    this.getStartIndex = function() {
        return startIndex;
    };

    this.setPageSize = function(_pageSize) {
        pageSize = _pageSize;
    };

    this.getPageSize = function() {
        return pageSize;
    };

    this.setCurrentIndex = function(_currentIndex) {
        currentIndex = _currentIndex;
    };

    this.getCurrentIndex = function() {
        return currentIndex;
    };

    this.setEndIndex = function(_startIndex) {
        startIndex = _startIndex;
    };

    this.getEndIndex = function() {
        return startIndex + pageSize;
    };

    this.getTotalItemCount = function() {
        return data.length;
    };

    this.setVisible = function(_visible) {
        visible = _visible;
    };

    this.getVisible = function() {
        return visible;
    };
}

