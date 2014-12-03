/**
 * Created by YoonJung on 2014-11-25.
 */

window.onload = function () {
    var main = new Main();
    document.addEventListener('keydown', main.moveFocus, false);
};

function Main() {
    var history = [];
    var communicator = new Communicator();

    var mainCategoryList = communicator.connection(communicator.getCategoryList(0));
    var mainCategoryName = communicator.getValues(mainCategoryList, 'categoryName');
    var mainCategoryId = communicator.getValues(mainCategoryList, 'categoryId');

    var categoryList = makeCategoryList(mainCategoryName, mainCategoryId);

    function makeCategoryList(categoryNameList, categoryIdList) {
        var categoryList = [];
        for(var i=0; i<categoryNameList.length; i++) {
            var category = new Category(categoryNameList[i], categoryIdList[i]);
            category.setCategoryName(categoryNameList[i]);
            category.setCategoryId(categoryIdList[i]);
            categoryList[i] = category;
        }
        return categoryList
    }

    //this.moveFocus = function() {
    //    console.log("moveFocus");
    //    mainMenu.moveFocus(event);
    //};

    var itemList = document.getElementsByClassName("menu_list");
    var item = itemList[0].getElementsByClassName("menu");

    var model = new Model(categoryList, 0, 9, 0);
    model.setData(categoryList);
    model.setStartIndex(0);
    model.setPageSize(9);
    model.setCurrentIndex(0);

    function drawMenu(modelData) {
        var categoryData = modelData.getData();

        var j = modelData.getStartIndex();
        for (var i = 0; i < modelData.getPageSize(); i++) {
            if (categoryData[j] != null) {
                item[i].innerText = categoryData[j].getCategoryName();
            } else {
                item[i].innerText = "";
            }
            j++;
        }
        selectItem(modelData.getCurrentIndex() - modelData.getStartIndex());
    }

    drawMenu(model);

    this.moveFocus = function () {
        var keyCode = event.keyCode;
        subMenu(model.getCurrentIndex());
        drawSubMenu(model2);
        selectedItem(model.getCurrentIndex() - model.getStartIndex());
        switch (keyCode) {
            case 38: //up
                if (model.getCurrentIndex() != 0) {
                    if (model.getCurrentIndex() == model.getStartIndex()) {
                        model.setStartIndex(model.getStartIndex() - 1);
                        model.setCurrentIndex(model.getCurrentIndex() - 1);
                    } else {
                        model.setCurrentIndex(model.getCurrentIndex() - 1);
                    }
                } else {
                    if (model.getTotalItemCount() < model.getPageSize()) {
                        model.setStartIndex(0);
                        model.setCurrentIndex(model.getTotalItemCount() - 1);
                    } else {
                        model.setCurrentIndex(model.getTotalItemCount() - 1);
                        model.setStartIndex(model.getCurrentIndex() - model.getPageSize() + 1);
                    }
                }
                console.log("[KEY_UP]" + model.startIndex + "/" + model.currentIndex);
                break;
            case 40: //down
                if (model.getCurrentIndex() != model.getTotalItemCount() - 1) {
                    if (model.getEndIndex() - 1 == model.getCurrentIndex()) {
                        model.setStartIndex(model.getStartIndex() + 1);
                        model.setCurrentIndex(model.getCurrentIndex() + 1);
                    } else {
                        model.setCurrentIndex(model.getCurrentIndex() + 1);
                    }
                } else {
                    model.setCurrentIndex(0);
                    model.setStartIndex(0);
                }
                console.log("[KEY_DOWN]" + model.startIndex + "/" + model.currentIndex);
                break;
            case 39: //right
                history.push(model);
                model = model2;
                console.log("[KEY_RIGHT]"+ model.startIndex + "/" + model.currentIndex);
                break;
            case 37: //left
                if(history.length != 0) {
                    model = history.pop();
                } else {
                }
                console.log("[KEY_LEFT]"+ model.startIndex + "/" + model.currentIndex);
                break;
        }
        drawMenu(model);
        subMenu(model.getCurrentIndex());
        drawSubMenu(model2);
    };

    function getFocusItem(focusIndex) {
        var listItems = $(".menu_box");
        var focusItem = listItems.eq(focusIndex);
        return focusItem;
    }

    function selectItem(focusIndex) {
        getFocusItem(focusIndex).addClass("focus selected");
    }

    function selectedItem(focusIndex) {
        getFocusItem(focusIndex).removeClass("focus selected");
    }

    var itemList2 = document.getElementsByClassName("submenu_list");
    var item2 = itemList2[0].getElementsByTagName("li");
    var model2;

    function subMenu(focusIndex) {
        var focusCategoryData = model.getData();
        var focusCategoryId = focusCategoryData[focusIndex].getCategoryId();
        var focusCategory = communicator.getCategoryList(focusCategoryId);
        var subCategoryList = communicator.connection(focusCategory);
        var subCategoryName = communicator.getValues(subCategoryList, 'categoryName');
        var subCategoryId = communicator.getValues(subCategoryList, 'categoryId');
        var subCategoryList = makeCategoryList(subCategoryName, subCategoryId);

        model2 = new Model(subCategoryList, 0, 9, 0);
        model2.setData(subCategoryList);
        model2.setStartIndex(0);
        model2.setPageSize(9);
        model2.setCurrentIndex(0);
    }

    function drawSubMenu(subModelData) {
        var subCategoryData = subModelData.getData();

        var j = subModelData.getStartIndex();
        for (var i = 0; i < subModelData.getPageSize(); i++) {
            if (subCategoryData[j] != null) {
                item2[i].innerText = subCategoryData[j].getCategoryName();
            } else {
                item2[i].innerText = "";
            }
            j++;
        }
    }

}