StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var empName = 'CRUDADDEMP';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Delete employee with no transactions
        //Check if Employee to edit exist
        .displayText('Checking if Employee ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Entity No',empName);
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
                .clickButton('ClearAllFilters')
                .waitUntilLoaded()
                .clickMenuScreen('Paychecks', 'Screen')
                .waitUntilLoaded()
                .clickButton('New')
                .waitUntilLoaded()
                .selectSearchRowValue(empName, 'strEmployeeId')
                .waitUntilLoaded()
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .selectComboBoxRowValue('BankNumber', 'Commerce Bank', 'intBankAccountId',1)
                .waitUntilLoaded()
                .clickButton('Save')
                .waitUntilLoaded()
                .clickButton('Close')
                .clickMenuScreen('Employees', 'Screen')
                .waitUntilLoaded()
                .selectSearchRowValue(empName, 'strEmployeeId')
                .waitUntilLoaded()
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .clickButton('Delete')
                .verifyMessageBox('iRely i21', 'Are you sure you want to delete this record?', 'yesno', 'question')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'The record you are trying to delete is being used. The entity has been set to inactive.', 'ok', 'error')
                .clickMessageBoxButton('ok')
                .waitUntilLoaded()
                .clickTab('Employee')
                .waitUntilLoaded()
                .clickTab('Detail')
                .waitUntilLoaded()
                .verifyCheckboxValue('EmployeeActive', false)
                .waitUntilLoaded()
                .clickButton('Save')
                .clickButton('Close')
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Employee::' + empName +  ' does not exists.')
                .displayText('Unable to execute Test Scenario. Execute Test Scenario 1 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()

        .done();
        

});