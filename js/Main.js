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

    var getCategoryList = communicator.getCategoryList("getCategoryTree", 0);
    var resultCategoryList = communicator.connection(getCategoryList);

    var categoryList = communicator.getValues(resultCategoryList);

    var menuList = document.getElementsByClassName("menu_list");
    var menuItem = menuList[0].getElementsByClassName("menu");

    var model = new Model(categoryList, 0, 9, 0);
    //console.log(this + "Model.prototype/" + Model.prototype);

    var submenuList = document.getElementsByClassName("submenu_list");
    var submenuItem = submenuList[0].getElementsByTagName("li");
    var model2;


    function drawMenu(modelData) {
        var categoryData = modelData.getData();

        var j = modelData.getStartIndex();
        for (var i = 0; i < modelData.getPageSize(); i++) {
            if (categoryData[j] != null) {
            menuItem[i].innerText = categoryData[j].getCategoryName();
            } else {
                menuItem[i].innerText = "";
            }
            j++;
        }
        selectItem(modelData.getCurrentIndex() - modelData.getStartIndex());
    }

    drawMenu(model);
    subMenu(model.getCurrentIndex());
    drawSubMenu(model2);

    this.moveFocus = function () {
        var keyCode = event.keyCode;

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
                drawMenu(model);
                subMenu(model.getCurrentIndex());
                drawSubMenu(model2);
                console.log("[KEY_UP]" + model.getStartIndex() + "/" + model.getCurrentIndex());
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
                drawMenu(model);
                subMenu(model.getCurrentIndex());
                drawSubMenu(model2);
                console.log("[KEY_DOWN]" + model.getStartIndex() + "/" + model.getCurrentIndex());
                break;
            case 39: //right
                history.push(model);
                model = model2;
                drawMenu(model);
                subMenu(model.getCurrentIndex());
                drawSubMenu(model2);
                console.log("[KEY_RIGHT]" + model.getStartIndex() + "/" + model.getCurrentIndex());
                break;
            case 37: //left
                if (history.length != 0) {
                    model = history.pop();
                } else {
                }
                drawMenu(model);
                subMenu(model.getCurrentIndex());
                drawSubMenu(model2);
                console.log("[KEY_LEFT]" + model.getStartIndex() + "/" + model.getCurrentIndex());
                break;
        }

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


    function subMenu(focusIndex) {
        var focusCategoryData = model.getData();
        var focusCategoryId = focusCategoryData[focusIndex].getCategoryId();
        var focusCategoryList = communicator.connection(communicator.getCategoryList("getCategoryTree", focusCategoryId));
        var subCategoryList = communicator.getValues(focusCategoryList);

        model2 = new Model(subCategoryList, 0, 9, 0);
        console.log(subCategoryList.length);
    }

    function drawSubMenu(subModelData) {
        var subCategoryData = subModelData.getData();

        var j = subModelData.getStartIndex();
        for (var i = 0; i < subModelData.getPageSize(); i++) {
            if (subCategoryData[j] != null) {
                submenuItem[i].innerText = subCategoryData[j].getCategoryName();
            } else {
                submenuItem[i].innerText = "";
            }
            j++;
        }
    }

}