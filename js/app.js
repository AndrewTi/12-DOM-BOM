"use strict";

var employee = {
    arrEmplo: [{
        firstName: "John",
        lastName: "Doe",
        salary: 1000,
        position: "Manager"
    }],

    maxEmployee: 10,
    maxAverage: 2000,

    settingConf: function() {
        var valMaxEmplo = parseInt(employee.id("max_employee").value)
        var valMaxAver = parseInt(employee.id("max_average").value)
        if(valMaxEmplo) {
            employee.maxEmployee = valMaxEmplo;
        }

        if(valMaxAver) {
            employee.maxAverage = valMaxAver;
        }

        employee.shwoSetting();
    },

    addEmployee: function() {
        var elem = employee.id("dataAbEmpl");
        var data = elem.value.replace(/\s/g,"");
        elem.value = " ";
        var leng = employee.arrEmplo.length;
        var arr = [];
        var bool = true;
        data.split(",").map(function(elem) {
            if(elem != false)  arr.push(elem);
        })

        function validate(data) {
            if(employee.arrEmplo.length >= employee.maxEmployee){
                employee.showMessage("вже достатньо персоналу");
                return false;
            }


            if(!(/^[a-zA-ZА-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/.test(data[0]))) {
                return false;
            }else if(!(/^[a-zA-ZА-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/.test(data[1]))) {
                return false;
            }else if(!(/^[0-9]+$/.test(data[2]))) {
                return false;
            }else if(!(/^[a-zA-ZА-Яа-яа-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+$/.test(data[3]))) {
                return false;
            }


            for(var i = 0, arr = employee.arrEmplo.length; i < arr; i++) {
                    if(employee.arrEmplo[i].firstName.toLowerCase() == data[0].toLowerCase() || employee.arrEmplo[i].lastName.toLowerCase() == data[1].toLowerCase()) {
                        employee.showMessage("Ми з одинакомиви імени і фаміліями на роботу не берем:)");
                        bool = false;
                        return false;
                    }
            }

            var sum2 = parseInt(data[2]);
            employee.arrEmplo.map(function(e) {sum2 += parseInt(e.salary)});
            if(sum2/(leng+1) > employee.maxAverage){
                employee.showMessage("Ми не потянем такі затрати");
                bool = false;
                return false;
            }

            return true;
        }

        if(arr.length === 4){
            if(validate(arr)) {
                employee.arrEmplo[leng] = {
                    firstName: arr[0],
                    lastName: arr[1],
                    salary: parseInt(arr[2]),
                    position: arr[3],
                }
                employee.showEmployee();
            }
        }else {
            employee.showMessage("Не правильно введені дані");
            bool = false;
        }

        employee.showHideModal(bool);
    },

    showMessage: function(message) {
        var elem = employee.id("message");
        var styl = window.getComputedStyle(elem);
        var i = parseInt(styl.getPropertyValue('top'));
        employee.id("textMessage").innerHTML=message;
        var timerShow = setInterval(function(){
            if(i != 0) {
                employee.id("message").style.top = ++i+"px";
            }else {
                clearInterval(timerShow)
                setTimeout(function(){
                    var timerHide = setInterval(function(){
                        if(i != -75) {
                            employee.id("message").style.top = --i+"px";
                        }else {
                            clearInterval(timerHide);
                        }
                    },0)
                },2000)
            }
        },0);
    },

    showEmployee: function() {
        var elem = employee.id("employeeList").children;
        for(var i = 0, k = elem.length; i < k; i++){
            employee.id("employeeList").removeChild(employee.id("employeeList").firstChild);
        }

        var sum = 0;
        var leng = employee.arrEmplo.length;
        employee.arrEmplo.map(function(e) {sum += parseInt(e.salary)});
        employee.id("middel_salary").innerHTML = "Average salary : $"+Math.round(sum/leng);

        employee.arrEmplo.forEach(function(item, i, arr) {
            var elem = employee.id("employeeList").appendChild(document.createElement("li"));
            elem.appendChild(document.createElement("span")).innerHTML=arr[i].firstName;
            elem.appendChild(document.createElement("span")).innerHTML=arr[i].lastName;
            elem.appendChild(document.createElement("span")).innerHTML="$"+arr[i].salary;
            elem.appendChild(document.createElement("span")).innerHTML=arr[i].position;
        })
    },


    id: function(id) {
        return document.getElementById(id);
    },

    shwoSetting: function() {
        var elem = employee.id("setting");
        if (elem.style.display == "block") {
            elem.style.display = "none";
        }else {
            elem.style.display = "block";

        }
    },

    showHideModal: function(bool) {
        if(bool == false) {

        }else {
            var elem = employee.id("modal");
            if (elem.style.display == "block") {
                elem.style.display = "none";
            }else {
                elem.style.display = "block";

            }
        }
    }

}

employee.showEmployee();

employee.id("confirm-setting").onclick = employee.settingConf;

employee.id("show_setting").onclick = employee.shwoSetting;
employee.id("settingBackg").onclick = employee.shwoSetting;

employee.id("showMobal").onclick = employee.showHideModal;
employee.id("modal_backg").onclick = employee.showHideModal;
employee.id("checkform").onclick = employee.addEmployee;
