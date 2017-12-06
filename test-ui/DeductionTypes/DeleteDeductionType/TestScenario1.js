StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Deduction Types', 'Screen')
        .waitTillLoaded()

        //Delete currently unused Deduction ID
        .displayText('Checking if Deduction ID exists.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Deduction ID','CRUD-FIXED');
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
                .displayText('Deleting currently unused Deduction ID.')
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
                .clickButton('ClearAllFilters')
                .displayText('Deduction ID to delete does not exist.')
                .displayText('Creating Deduction ID')
                .addFunction(function(next){
                    commonPR.addDeductionType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD Gross - Add Fixed Deduction Type',150,'',
                                                '24050-0000-000','','','','');
                })
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Deduction ID','CRUD-FIXED');
                })
                .displayText('Deleting currently unused Deduction ID.')
                .selectSearchRowByRange(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .clickButton('Delete')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .done();

            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')

        //Delete currently used Deduction ID
        .displayText('Deleting currently used Deduction ID.')
        .selectSearchRowValue('401K', 'Deduction ID')
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .clickButton('Delete')
        .clickMessageBoxButton('yes')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21','The record you are trying to delete is being used.','ok','error')
        .clickMessageBoxButton('ok')
        .waitUntilLoaded()
        .clickButton('Close')

        .done();

});