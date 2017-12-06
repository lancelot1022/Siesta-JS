StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Tax Types', 'Screen')
        .waitTillLoaded()

        //Delete currently unused Tax ID
        .displayText('Checking if Tax ID exists.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Tax Type','CRUD-PERCENT');
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
                .displayText('Deleting currently unused Tax ID.')
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
                .displayText('Tax ID to delete does not exist.')
                .displayText('Creating Tax ID')
                .addFunction(function(next){
                    commonPR.addTaxType(t,next,'CRUD-PERCENT', 'Percent','CRUD - Add Percent Tax Type',0.03,'Company',
                                                '22000-9000-001','','','1005311','52000-0001-007',450);
                })
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Tax Type','CRUD-PERCENT');
                })
                .displayText('Deleting currently unused Tax ID.')
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

        //Delete currently unused Tax ID
        .displayText('Deleting currently unused Tax ID.')
        .selectSearchRowValue('FIT', 'strTax')
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