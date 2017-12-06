StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Earning Types', 'Screen')
        .waitTillLoaded()

        //Edit CRUD-FIX Earning Type
        .displayText('Checking if Earning ID already exist.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Earning ID','CRUD-EDITFIXED');
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
                .displayText('Deleting existing Earning ID.')
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

        .displayText('Checking if Earning ID to edit exist')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Earning ID','CRUD-FIXED');
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
                    .displayText('Earning ID exist. Editing Earning Information.')
                    .selectSearchRowByRange(1,1)
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prearningtype')
                    .enterData('Text Field', 'EarningId', 'CRUD-EDITFIXED')
                    .selectComboBoxRowValue('CalculationType', 'Reimbursement','strCalculationType',1)
                    .enterData('Text Field', 'Description', 'CRUD - Edit Fixed Amount Earning to Reimbursement')
                    .enterData('Text Field', 'Amount', 175)
                    .isControlDisable('Button', 'AddEarningTax', true)
                    .isControlDisable('Button', 'DeleteEarningTax', true)
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('UpdateEmployees')
                    .waitUntilLoaded()
                    //.verifyMessageBox('iRely i21','This will update and override all Employee and Template Earnings with the values in this screen.This process is irreversible.Do you want to proceed?','yesno','question')
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
                    .displayText('Earning ID to edit does not exist!')
                    .displayText('Creating Earning ID to edit')
                    .clickButton('ClearAllFilters')
                    .addFunction(function(next){
                        commonPR.addEarningType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD - Add Fixed Earning Type',1250,'54100-0000-000',
                                                    'A','');
                    })
                    .waitUntilLoaded()
                    .selectSearchRowValue('CRUD-FIXED', 'Earning ID')
                    .clickButton('OpenSelected')
                    .waitUntilLoaded()
                    .verifyScreenShown('prearningtype')
                    .enterData('Text Field', 'EarningId', 'CRUD-EDITFIXED')
                    .selectComboBoxRowValue('CalculationType', 'Reimbursement','strCalculationType',1)
                    .enterData('Text Field', 'Description', 'CRUD - Edit Fixed Amount Earning to Reimbursement')
                    .enterData('Text Field', 'Amount', 175)
                    .isControlDisable('Button', 'AddEarningTax', true)
                    .isControlDisable('Button', 'DeleteEarningTax', true)
                    .verifyStatusMessage('Edited')
                    .clickButton('Save')
                    .waitUntilLoaded()
                    .verifyStatusMessage('Saved')
                    .clickButton('UpdateEmployees')
                    .waitUntilLoaded()
                    //.verifyMessageBox('iRely i21','This will update and override all Employee and Template Earnings with the values in this screen.This process is irreversible.Do you want to proceed?','yesno','question')
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