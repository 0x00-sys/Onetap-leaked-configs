exports.SetValue = function() {
    if (arguments.length > 5 || arguments.length < 2)
        Cheat.PrintColor([255, 0, 0, 255], "Bad arg count [" + arguments.length.toString() + "] " + arguments[arguments.length - 1] + "\n");
    if (typeof arguments[4] == "boolean") {
        arguments[4] = arguments[4] ? 1 : 0;
    }
    if (typeof arguments[1] == "boolean") {
        arguments[1] = arguments[1] ? 1 : 0;
    }
    if (typeof arguments[0] == "object")
        UI.SetValue(arguments[0], arguments[1]);
    else
        UI.SetValue([arguments[0], "SUBTAB_MGR", arguments[1], "SHEET_MGR", arguments[2], arguments[3]], arguments[4]);
};

exports.GetValue = function() {
    //tab, sub_tab, sub_tab_tab, element
    if (typeof arguments[0] == "string"){
        return UI.GetValue([arguments[0], "SUBTAB_MGR", arguments[1], "SHEET_MGR", arguments[2], arguments[3]]);
    }
    else {
        return UI.GetValue(arguments[0]);
    }
};

exports.SetEnabled = function() {
    if (arguments.length > 5 || arguments.length < 2)
        Cheat.PrintColor([255, 0, 0, 255], "Bad arg count [" + arguments.length.toString() + "] " + arguments[arguments.length - 1] + "\n");
    if (typeof arguments[4] == "boolean") {
        arguments[4] = arguments[4] ? 1 : 0;
    }
    if (typeof arguments[1] == "boolean") {
        arguments[1] = arguments[1] ? 1 : 0;
    }
    if (typeof arguments[0] == "object")
        UI.SetEnabled(arguments[0], arguments[1]);
    else
        UI.SetEnabled([arguments[0], "SUBTAB_MGR", arguments[1], "SHEET_MGR", arguments[2], arguments[3]], arguments[4]);
};

exports.AddHotkey = function(tab, sub_tab, sub_tab_tab, element, opt) {
    //tab, sub_tab, sub_tab_tab, element, opt
    if (opt == null || opt == undefined)
        opt = element;
    UI.AddHotkey([tab, sub_tab, sub_tab_tab, "Key assignment"], element, opt);
    return [tab, sub_tab, sub_tab_tab, "Key assignment", element];
};

exports.AddSubTab = function(tab, value) {
    UI.AddSubTab([tab, "SUBTAB_MGR"], value);
};

exports.AddSliderInt = function(tab, sub_tab, sub_tab_tab, element, min,max) {
    UI.AddSliderInt([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element, min, max);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddSliderFloat = function(tab, sub_tab, sub_tab_tab, element, min,max) {
    UI.AddSliderFloat([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element, min, max);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddDropdown = function(tab, sub_tab, sub_tab_tab, element, arr, searchable) {
    UI.AddDropdown([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element, arr, searchable);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddMultiDropdown = function(tab, sub_tab, sub_tab_tab, element, arr) {
    UI.AddMultiDropdown([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element, arr);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddCheckbox = function(tab, sub_tab, sub_tab_tab, element) {
    UI.AddCheckbox([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddColorPicker = function(tab, sub_tab, sub_tab_tab, element) {
    UI.AddColorPicker([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.AddTextbox = function(tab, sub_tab, sub_tab_tab, element) {
    UI.AddTextbox([tab, "SUBTAB_MGR", sub_tab, "SHEET_MGR", sub_tab_tab], element);
    return [tab, sub_tab, sub_tab_tab, element];
};

exports.toArray = function(bitwise, or_array) {
    var reverseBinaryString = bitwise.toString(2).split("").reverse(); 
    var arrayresult = or_array.filter(function(currentVal, index, arr) {return reverseBinaryString[index] == 1;});
    return arrayresult;
};

exports.includes = function(arr, wat) {
    for (n in arr) {
        if (arr[n] == wat)
            return true;
    }
    return false;
};
