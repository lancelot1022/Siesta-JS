StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Tax Types', 'Screen')
        .waitTillLoaded()

        //Edit CRUD-FIXED Tax Type
        .displayText('Checking if New Tax ID already exist.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Tax Type','CRUD-HOURLYAMOUNT');
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
                .displayText('Deleting existing Tax ID.')
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

        .displayText('Checking if Tax ID to edit exist')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Tax Type','CRUD-FIXED');
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
                    .displayText('Tax ID exist. Editing Tax Information.')
                    .selectSearchRowByRange(1,1)
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prtaxtype')
                    .enterData('Text Field','Reference','CRUD-HOURLYAMOUNT')
                    .selectComboBoxRowValue('CalculationType', 'Hourly Amount','strCalculationType')
                    .enterData('Text Field', 'Description', 'CRUD - Edit to Hourly Amount Tax Type')
                    .enterData('Text Field', 'Amount',0.42)
                    .enterData('Text Field', 'Limit',360)
                    .selectComboBoxRowValue('AccountId','24900-9002-003', 'intAccountId')
                    .selectComboBoxRowValue('ExpenseAccount','74000-9003-005', 'intExpenseAccountId')
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('Close')
                    .waitUntilLoaded()
                    .clickButton('ClearAllFilters')
                    .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                    .waitUntilLoaded()
                    .displayText('Tax ID to edit does not exist!')
                    .displayText('Creating Tax ID to edit')
                    .clickButton('ClearAllFilters')
                    .addFunction(function(next){
                        commonPR.addTaxType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD - Add Fixed Tax Type',79.5,'',
                                                    '24000-0007-003','','','','52000-0001-004','100');
                    })
                    .waitUntilLoaded()
                    .selectSearchRowValue('CRUD-FIXED', 'strTax')
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prtaxtype')
                    .enterData('Text Field','Reference','CRUD-HOURLYAMOUNT')
                    .selectComboBoxRowValue('CalculationType', 'Hourly Amount','strCalculationType')
                    .enterData('Text Field', 'Description', 'CRUD - Edit to Hourly Amount Tax Type')
                    .enterData('Text Field', 'Amount',0.42)
                    .enterData('Text Field', 'Limit',360)
                    .selectComboBoxRowValue('AccountId','24000-0007-003', 'intAccountId')
                    .selectComboBoxRowValue('ExpenseAccount','52000-0001-004', 'intExpenseAccountId')
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('Close')
                    .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .done();

});