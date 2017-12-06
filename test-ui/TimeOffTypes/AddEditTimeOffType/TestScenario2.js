StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var TODAY = Ext.Date.format(sysDATE, 'njy');
    var timeOffID = 'CRUD-TIMEOFF1';
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
                .displayText('Time Off ID exists.')
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .enterData('Text Field','TimeOffID',timeOffID)
                .selectComboBoxRowValue('AwardOn', 'Start of Year','strAwardPeriod')
                .enterData('Text Field','Description','CRUD - Add new time off type - Duplicate ID')
                .clickButton('Save')
                .verifyMessageBox('iRely i21', 'Time Off ID already exists!', 'ok', 'error')
                .clickMessageBoxButton('ok')
                .clickButton('Close')
                .clickMessageBoxButton('no')
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off with:' + timeOffID +  ' ID does not exists.')
                .displayText('Unable to execute Test Scenario for duplicate Time Off Type. Execute Test Scenario 1 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')
        
    .done();
});