StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var empNo = 'CRUDADDEMP';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Create employee with duplicate Entity No.
        //Check if Entity No to duplicate exists
        .displayText('Checking if Employee ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Entity No',empNo);
        })
        .waitUntilLoaded()
        .continueIf({
            expected: true,
            actual: function (win,next) {
                new iRely.FunctionalTest().start(t, next);
                return win.down('#grdSearch').store.getCount() >= 1;
            },
            success: function (next) {
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('emcreatenewentity')
                .enterData('Text Field', 'Name', 'Aegon Targaryen')
                .enterData('Text Field', 'Contact', 'Aegon Targaryen')
                .enterData('Text Field', 'Phone', '987-887-9655')
                .enterData('Text Field', 'Email', 'dracarys1@gotdemo1.com')
                .addFunction(function(next){
                    t.chain(
                        { click : "#frmCreateNewEntity #tabCreateNewEntity panel[title=Details] #txtSearchAddress => .x-form-text"},
                        { action : "type", options : { shiftKey : true }, text : "Holyrood Park Road" },
                        { mousedown : "span.pac-matched:contains(Holyrood Park Road)"});
                    next();
                })
                .waitUntilLoaded()
                .verifyStatusMessage('Ready')
                .clickButton('Match')
            
                .waitUntilLoaded()
                .clickButton('Add')
                .waitUntilLoaded()
                .clickTab('Entity')
                .enterData('Text Field', 'EntityNumber', empNo)
                .addFunction(function(next){
                    t.chain(
                        { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-input-field"},
                        { action : "type", options : { shiftKey : true }, text : "User" },
                        { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-form-trigger"});
                    next();
                })
                .waitTillLoaded('',2000)
                
                .enterData('Text Field', 'Location', 'Scotland Branch')

                // Employee > Details tab
                .clickTab('Employee')
                .waitUntilLoaded()
                .clickTab('Detail')
                .waitUntilLoaded()
                .enterData('Text Field', 'EmployeeFirstName', 'Aegon')
                .enterData('Text Field', 'EmployeeMiddleName', 'Targaryen')
                .enterData('Text Field', 'EmployeeLastName', 'Targaryen')
                .enterData('Text Field', 'EmployeeTitle', 'CRUD Product Owner')
                .enterData('Date Field', 'EmployeeBirthDate', '11/25/1985')
                .enterData('Date Field', 'EmployeeOriginalDate', '6/1/2015')
                .enterData('Date Field', 'EmployeeHired', '8/5/2010')
                .selectComboBoxRowValue('EmployeePayPeriod', 'Weekly', 'strPayPeriod',1)
                .selectComboBoxRowNumber('EmployeeWorkersCompCode',1)
                .enterData('Text Field', 'EmployeeSocialSecurity', '598-789-784')
                
                // User > Details tab
                .clickTab('User')
                .waitUntilLoaded()
                .enterData('Text Field', 'UserUsername', 'aegonthedragon')
                .enterData('Text Field', 'UserCurrentPassword', 'aegon123')
                .selectComboBoxRowValue('UserDefaultRole', 'Employee', 'strUserRoleName',1)
                .selectComboBoxRowValue('SecurityPolicy', 'Default User Policy', 'intSecurityPolicyId',1)
                .clickCheckBox('UserDisabled', true)
                .clickButton('EmployeeTemplate')
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'Entity No already exists', 'ok', 'error')
                .clickMessageBoxButton('ok')
                .waitUntilLoaded()
                .clickButton('Save')
                .verifyMessageBox('iRely i21', 'Entity No already exists', 'ok', 'error')
                .clickMessageBoxButton('ok')
                .waitUntilLoaded()
                .clickButton('Close')
                .verifyMessageBox('iRely i21', 'Do you want to save the changes you made?', 'yesnocancel', 'warning')
                .clickMessageBoxButton('no')
                .waitUntilLoaded()
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Employee with Entity No with:' + empNo +  ' does not exists.')
                .displayText('Unable to execute Test Scenario for duplicate. Execute Test Scenario 1 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')
        .done();
        

});