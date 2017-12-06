StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var empName = 'Margery Tyrell';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Edit employee
        //Check if Employee to edit exist
        .displayText('Checking if Employee ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Name',empName);
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
                .selectSearchRowByRange(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded() 
                .addFunction(function(next){
                t.chain(
                        { click : "ementity[title=Entity - Margery Tyrell] #frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-item:nth-of-type(1) .x-tagfield-item-close"});
                    next();
                })
                .waitTillLoaded('',2000)
                .enterData('Text Field', 'Location', 'LItalia Principali Ufficio')

                .clickTab('Employee')
                .waitUntilLoaded()
                .enterData('Text Field', 'EmployeeTitle', 'CRUD Edit Manager')
                .selectComboBoxRowValue('EmployeePayPeriod', 'Weekly', 'strPayPeriod',1)
                .selectComboBoxRowValue('EmployeeMaritalStatus', 'Single', 'MaritalStatus',1)

                .clickButton('EmployeeTemplate')
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'All information on Taxes, Earnings, Deductions and Time Off will be overridden. Do you want to continue?', 'yesno', 'question')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .verifyScreenShown('premployeetemplatelist')
                .selectGridRowValue('Template', [{dataIndex: 'strTemplateName', value: 'Store Single MI'}])
                .waitUntilLoaded()
                .clickButton('Ok')  
                .waitUntilLoaded()

                .clickTab('Employee')
                .waitUntilLoaded()
                .clickTab('Taxes')
                .waitUntilLoaded()

                .clickTab('Earnings')
                .waitUntilLoaded()
                .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'REG'}])
                .waitUntilLoaded()
                .enterData('Text Field', 'EmployeeEarningDefaultHours', '40')
                .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'VAC'}])
                .waitUntilLoaded()
                .selectComboBoxRowValue('EmployeeEarningTimeOffId', 'Vac (Year)', 'intEmployeeOffId',1)

                .clickTab('Deductions')
                .waitUntilLoaded()
                .selectGridRowValue('EmployeeDeduction', [{dataIndex: 'strDeductionId', value: 'Uniforms'}])
                .waitUntilLoaded()
                .clickButton('EmployeeDeductionDelete')
                .waitUntilLoaded()
                //.verifyMessageBox('iRely i21', 'You are about to delete 1 row. Are you sure you want to continue?', 'yesno', 'question')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .clickButton('Save')
                .waitUntilLoaded()
                .waitUntilLoaded()
                .verifyStatusMessage('Saved')
                .clickButton('Close')

                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .displayText('Employee::' + empName +  ' does not exists.')
                .displayText('Unable to execute Test Scenario for edit existing employee. Execute Test Scenario 2 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')


        .done();
        

});