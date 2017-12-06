StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Earning Types', 'Screen')
        .waitTillLoaded()

        //Delete currently unused Earning ID
        .displayText('Checking if Earning ID exists.')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Earning ID','CRUD-FRINGE');
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
                .displayText('Deleting currently unused Earning ID.')
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
                .displayText('Earning ID to delete does not exist.')
                .displayText('Creating Earning ID')
                .addFunction(function(next){
                    commonPR.addEarningType(t,next,'CRUD-FRINGE', 'Fringe Benefit','CRUD - Add Fringe Benefit Earning Type',100,'60100-0003-007',
                                                'EE','Tax as Supplemental');
                })
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Earning ID','CRUD-FRINGE');
                })
                .displayText('Deleting currently unused Earning ID.')
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

        //Delete currently used Earning ID
        .displayText('Deleting currently used Earning ID.')
        .selectSearchRowValue('REG', 'Earning ID')
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