StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var TODAY = Ext.Date.format(sysDATE, 'njy');
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
                var timeOffID = 'CRUD-TIMEOFF2' + TODAY
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off ID already exists.')
                .displayText('Changing Time Off ID to: ' + timeOffID)
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .selectSearchRowNumber(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .enterData('Text Field','TimeOffID',timeOffID)
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off with:' + timeOffID +  ' ID does not exists.')
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .selectSearchRowNumber(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded()
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .enterData('Text Field','TimeOffID',timeOffID)
                .done();
            },
            continueOnFail: true
        })
        
        //Add Time Off Type - Anniversary Date
        .selectComboBoxRowValue('AwardOn', 'Anniversary Date','strAwardPeriod')
        .enterData('Text Field','Description','CRUD - Add new time off type - Anniversary Date')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','0')
        .enterGridData('TimeOffTiers',1,'colDescription','CRUD - Entry Level')
        .enterGridData('TimeOffTiers',1,'colRateHours','20')
        .enterGridData('TimeOffTiers',1,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',1,'colPeriod','Quarter','Period',5)
        .enterGridData('TimeOffTiers',1,'colMaxEarned','80')
        .enterGridData('TimeOffTiers',1,'colMaxCarryover','16')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','1')
        .enterGridData('TimeOffTiers',2,'colDescription','CRUD - Mid Level')
        .enterGridData('TimeOffTiers',2,'colRateHours','40')
        .enterGridData('TimeOffTiers',2,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',2,'colPeriod','Quarter','Period',5)
        .enterGridData('TimeOffTiers',2,'colMaxEarned','120')
        .enterGridData('TimeOffTiers',2,'colMaxCarryover','60')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','2')
        .enterGridData('TimeOffTiers',3,'colDescription','CRUD - Senior Level')
        .enterGridData('TimeOffTiers',3,'colRateHours','40')
        .enterGridData('TimeOffTiers',3,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',3,'colPeriod','Quarter','Period',5)
        .enterGridData('TimeOffTiers',3,'colMaxEarned','160')
        .enterGridData('TimeOffTiers',3,'colMaxCarryover','0')
        .clickButton('Save')
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        

    .done();
});