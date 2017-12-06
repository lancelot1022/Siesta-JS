StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Deduction Types', 'Screen')
        .waitTillLoaded()

        //Edit CRUD-PERCENT Tax Type
        .displayText('Checking if Deduction ID already exist.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Deduction ID','CRUD-HOURLYPERCENT');
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
                .displayText('Deleting existing Deduction ID.')
                .selectSearchRowByRange(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .clickButton('Delete')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')

        .displayText('Checking if Deduction ID to edit exist')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Deduction ID','CRUD-PERCENT');
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
                    .displayText('Deduction ID exist. Editing Deduction Information.')
                    .selectSearchRowByRange(1,1)
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prdeductiontype')
                    .enterData('Text Field', 'DeductionId', 'CRUD-HOURLYPERCENT')
                    .selectComboBoxRowValue('CalculationType', 'Hourly Percent', 'strCalculationType',1)
                    .enterData('Text Field', 'Description', 'CRUD Net - Edit Hourly Percent Deduction Type')
                    .enterData('Text Field', 'Amount',.35)
                    .selectComboBoxRowValue('DeductFrom', 'Net Pay', 'strDeductFrom')
                    .isControlDisable('Button', 'AddDeductionTax', true)
                    .isControlDisable('Button', 'DeleteDeductionTax', true)
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('UpdateEmployees')
                    .waitUntilLoaded()
                    //.verifyMessageBox('iRely i21','This will update and override all Employee and Template Deductions with the values in this screen.This process is irreversible.Do you want to proceed?','yesno','question')
                    .clickMessageBoxButton('yes')
                    .waitUntilLoaded()
                    .verifyMessageBox('iRely i21','Update Successful!','ok','information')
                    .clickMessageBoxButton('ok')
                    .clickButton('Close')
                    .waitUntilLoaded()
                    .clickButton('ClearAllFilters')
                    .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                    .waitUntilLoaded()
                    .displayText('Deduction ID to edit does not exist!')
                    .displayText('Creating Deduction ID to edit')
                    .clickButton('ClearAllFilters')
                    .addFunction(function(next){
                        commonPR.addDeductionType(t,next,'CRUD-PERCENT', 'Percent','CRUD Gross - Add Percent Deduction Type',2.95,'Company',
                                                    '24000-0001-100','','0001005195','75000-0103-000','');
                    })
                    .waitUntilLoaded()
                    .selectSearchRowValue('CRUD-PERCENT', 'Deduction ID')
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prdeductiontype')
                    .enterData('Text Field', 'DeductionId', 'CRUD-HOURLYPERCENT')
                    .selectComboBoxRowValue('CalculationType', 'Hourly Percent', 'strCalculationType',1)
                    .enterData('Text Field', 'Description', 'CRUD Net - Edit Hourly Percent Deduction Type')
                    .enterData('Text Field', 'Amount',.35)
                    .selectComboBoxRowValue('DeductFrom', 'Net Pay', 'strDeductFrom')
                    .isControlDisable('Button', 'AddDeductionTax', true)
                    .isControlDisable('Button', 'DeleteDeductionTax', true)
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('UpdateEmployees')
                    .waitUntilLoaded()
                    //.verifyMessageBox('iRely i21','This will update and override all Employee and Template Deductions with the values in this screen. This process is irreversible. Do you want to proceed?','yesno','question')
                    .clickMessageBoxButton('yes')
                    .waitUntilLoaded()
                    .verifyMessageBox('iRely i21','Update Successful!','ok','information')
                    .clickMessageBoxButton('ok')
                    .clickButton('Close')
                    .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .done();

});