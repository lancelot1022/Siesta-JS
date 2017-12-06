StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var timeOffID = 'CRUD-TIMEOFF2';
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
                var timeOffID = 'CRUD-TIMEOFF-EDIT'
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off Type to edit exists.')
                //Edit existing Time Off type
                .selectSearchRowNumber(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .clearData('Text Field','TimeOffID')
                .enterData('Text Field','TimeOffID',timeOffID)
                .selectComboBoxRowValue('AwardOn', 'End of Month','strAwardPeriod')
                .enterData('Text Field','Description','CRUD -Edit time off type')
                .enterGridData('TimeOffTiers',1,'colYearsOfService','0')
                .enterGridData('TimeOffTiers',1,'colDescription','CRUD - Entry Level - Edit')
                .verifyStatusMessage('Edited')
                .enterGridData('TimeOffTiers',1,'colRateHours','0.2')
                .enterGridData('TimeOffTiers',1,'colRatePer','1')
                .selectGridComboBoxRowValue('TimeOffTiers',1,'colPeriod','Hour','Period',1)
                .enterGridData('TimeOffTiers',1,'colMaxEarned','80')
                .enterGridData('TimeOffTiers',1,'colMaxCarryover','16')
                .enterGridData('TimeOffTiers',2,'colYearsOfService','1')
                .enterGridData('TimeOffTiers',2,'colDescription','CRUD - Mid Level - Edit')
                .enterGridData('TimeOffTiers',2,'colRateHours','0.4')
                .enterGridData('TimeOffTiers',2,'colRatePer','1')
                .selectGridComboBoxRowValue('TimeOffTiers',2,'colPeriod','Hour','Period',1)
                .enterGridData('TimeOffTiers',2,'colMaxEarned','120')
                .enterGridData('TimeOffTiers',2,'colMaxCarryover','60')
                .enterGridData('TimeOffTiers',3,'colYearsOfService','2')
                .enterGridData('TimeOffTiers',3,'colDescription','CRUD - Senior Level - Edit')
                .enterGridData('TimeOffTiers',3,'colRateHours','0.6')
                .enterGridData('TimeOffTiers',3,'colRatePer','1')
                .selectGridComboBoxRowValue('TimeOffTiers',3,'colPeriod','Hour','Period',1)
                .enterGridData('TimeOffTiers',3,'colMaxEarned','160')
                .enterGridData('TimeOffTiers',3,'colMaxCarryover','80')
                .enterGridData('TimeOffTiers',4,'colYearsOfService','5')
                .enterGridData('TimeOffTiers',4,'colDescription','CRUD - Managerial Level - Edit')
                .enterGridData('TimeOffTiers',4,'colRateHours','0.8')
                .enterGridData('TimeOffTiers',4,'colRatePer','1')
                .selectGridComboBoxRowValue('TimeOffTiers',4,'colPeriod','Hour','Period',1)
                .enterGridData('TimeOffTiers',4,'colMaxEarned','200')
                .enterGridData('TimeOffTiers',4,'colMaxCarryover','0')
                .clickButton('Save')
                .waitUntilLoaded()
                .verifyStatusMessage('Saved')
                .clickButton('UpdateEmployees')
                .waitUntilLoaded()
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'Update Successful!', 'ok', 'information')
                .waitUntilLoaded()
                .clickMessageBoxButton('ok')
                .clickButton('UpdateHours')
                .waitUntilLoaded()
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()
                .verifyMessageBox('iRely i21', 'Update Successful!', 'ok', 'information')
                .waitUntilLoaded()
                .clickMessageBoxButton('ok')
                .clickButton('Close')
                .done();
            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off with:' + timeOffID +  ' ID does not exists.')
                .displayText('Unable to execute Test Scenario for duplicate Time Off Type. Execute Test Scenario 2 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')

        

    .done();
});