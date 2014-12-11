/**
 * Created by YoonJung on 2014-11-25.
 */

window.onload = function () {
    var main = new Main();
    document.addEventListener('keydown', main.moveFocus, false);
    $("#contentGroupList").hide();
    $(".bg_submenu_poster").hide();
};

function Main() {
    var history = [];
    var communicator = new Communicator();
    var categoryManager = new CategoryManager();
    var contentGroupManager = new ContentGroupManager();

    var getCategoryList = communicator.getCategoryList("getCategoryTree", 0);
    var resultCategoryList = communicator.connection(getCategoryList);
    var categoryList = categoryManager.getValues(resultCategoryList);

    var mainView = $(".bg_left");
    var menuList = mainView[0].getElementsByClassName("menu_list");
    var menuItem = menuList[0].getElementsByClassName("menu");
    var mainModel = new Model(categoryList, 0, 9, 0);

    var subView = $(".bg_right");
    var submenuList = subView[0].getElementsByClassName("submenu_list");
    var submenuItem = submenuList[0].getElementsByTagName("li");
    var subModel;

    var contentGroupItem = submenuList[1].getElementsByClassName("rank_title02");

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

    function subMenu(focusIndex) {
        var focusCategoryData = mainModel.getData();
        var focusCategoryId = focusCategoryData[focusIndex].getCategoryId();

        var focusCategoryList = communicator.connection(communicator.getCategoryList("getCategoryTree", focusCategoryId));
        var subCategoryList = categoryManager.getValues(focusCategoryList);
        return subModel = new Model(subCategoryList, 0, 9, 0);
    }

    function subMenuList(focusIndex) {
        var focusCategoryData = mainModel.getData();
        var getContentGroupList = communicator.getContentGroupList("getContentGroupList", focusCategoryData[focusIndex].getCategoryId());
        var resultContentGroupList = communicator.connection(getContentGroupList);
        var contentGroupList = contentGroupManager.getValues(resultContentGroupList);

        var listModel = new Model(contentGroupList, 0, 10, 0);
        return listModel;
    }

    function drawSubMenu(subModelData) {
        $("#previewList").show();
        $("#contentGroupList").hide();
        $(".bg_submenu_poster").hide();

        var subCategoryData = subModelData.getData();
        var j = subModelData.getStartIndex();
        if (subCategoryData != null) {
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

    function drawSubMenuList(subListModelData) {
        $("#previewList").hide();
        $("#contentGroupList").show();
        $(".bg_submenu_poster").show();
        var contentGroupData = subListModelData.getData();
        var j = subListModelData.getStartIndex();

        for (var i = 0; i < subListModelData.getPageSize(); i++) {
            if(contentGroupData[j] != null) {
                contentGroupItem[i].innerText = contentGroupData[j].getTitle();
            } else {
                //submenuList[1].removeChild(contentGroupItemForm[i]);
            }
            j++;
        }
    }

    drawMenu(mainModel);
    isContentGroup(mainModel.getCurrentIndex());

    this.moveFocus = function () {
        var keyCode = event.keyCode;

        selectedItem(mainModel.getCurrentIndex() - mainModel.getStartIndex());
        switch (keyCode) {
            case 38: //up
                if (mainModel.getCurrentIndex() != 0) {
                    if (mainModel.getCurrentIndex() == mainModel.getStartIndex()) {
                        mainModel.setStartIndex(mainModel.getStartIndex() - 1);
                        mainModel.setCurrentIndex(mainModel.getCurrentIndex() - 1);
                    } else {
                        mainModel.setCurrentIndex(mainModel.getCurrentIndex() - 1);
                    }
                } else {
                    if (mainModel.getTotalItemCount() < mainModel.getPageSize()) {
                        mainModel.setStartIndex(0);
                        mainModel.setCurrentIndex(mainModel.getTotalItemCount() - 1);
                    } else {
                        mainModel.setCurrentIndex(mainModel.getTotalItemCount() - 1);
                        mainModel.setStartIndex(mainModel.getCurrentIndex() - mainModel.getPageSize() + 1);
                    }
                }
                drawMenu(mainModel);
                isContentGroup(mainModel.getCurrentIndex());
                console.log("[KEY_UP]" + mainModel.getStartIndex() + "/" + mainModel.getCurrentIndex());
                break;
            case 40: //down
                if (mainModel.getCurrentIndex() != mainModel.getTotalItemCount() - 1) {
                    if (mainModel.getEndIndex() - 1 == mainModel.getCurrentIndex()) {
                        mainModel.setStartIndex(mainModel.getStartIndex() + 1);
                        mainModel.setCurrentIndex(mainModel.getCurrentIndex() + 1);
                    } else {
                        mainModel.setCurrentIndex(mainModel.getCurrentIndex() + 1);
                    }
                } else {
                    mainModel.setCurrentIndex(0);
                    mainModel.setStartIndex(0);
                }
                drawMenu(mainModel);
                isContentGroup(mainModel.getCurrentIndex());
                console.log("[KEY_DOWN]" + mainModel.getStartIndex() + "/" + mainModel.getCurrentIndex());
                break;
            case 39: //right
                history.push(mainModel);
                mainModel = subModel;
                drawMenu(mainModel);
                isContentGroup(mainModel.getCurrentIndex());
                console.log("[KEY_RIGHT]" + mainModel.getStartIndex() + "/" + mainModel.getCurrentIndex());
                //console.error("[pcgView]" + isLeafCategory(mainModel.getCurrentIndex()) + "/[leaf]" + mainModel.getData()[mainModel.getCurrentIndex()].getLeaf());
                break;
            case 37: //left
                if (history.length != 0) {
                    mainModel = history.pop();
                } else {
                }
                drawMenu(mainModel);
                isContentGroup(mainModel.getCurrentIndex());
                console.log("[KEY_LEFT]" + mainModel.getStartIndex() + "/" + mainModel.getCurrentIndex());
                //console.error("[pcgView]" + isLeafCategory(mainModel.getCurrentIndex()) + "/[leaf]" + mainModel.getData()[mainModel.getCurrentIndex()].getLeaf());
                break;
                console.log(mainModel.getData()[mainModel.getCurrentIndex()].getViewerType());
        }
    };

    function isContentGroup(focusIndex) {
        var isLeafCategory;
        var modelData = mainModel.getData();

        if (modelData[focusIndex].getViewerType() == "30") {
            isLeafCategory = subMenuList(focusIndex);
            drawSubMenuList(isLeafCategory);
        } else {
            isLeafCategory = subMenu(focusIndex);
            drawSubMenu(isLeafCategory);
        }

    }

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
}