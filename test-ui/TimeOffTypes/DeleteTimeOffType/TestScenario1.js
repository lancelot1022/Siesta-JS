StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var timeOffID = 'CRUD-TIMEOFF-EDIT';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Time Off Types', 'Screen')
        .waitUntilLoaded()

        //Check if Time Off ID already exist
        .displayText('Checking if Time Off ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Time Off Type',timeOffID);
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
                .displayText('Time Off Type to delete exists.')
                //Delete unused Time Off type
                .selectSearchRowNumber(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .clickButton('Delete')
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'Are you sure you want to delete this record?', 'yesno', 'question')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .done();
            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off with:' + timeOffID +  ' ID does not exists.')
                .displayText('Unable to execute Test Scenario for Delete Unused Time Off Type. Execute Test Scenario 4 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')

        

    .done();
});