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
                var timeOffID = 'CRUD-TIMEOFF1' + TODAY
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Time Off ID already exists.')
                .displayText('Changing Time Off ID to: ' + timeOffID)
                .clickButton('ClearAllFilters')
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
                .clickButton('ClearAllFilters')
                .waitUntilLoaded()
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeofftype')
                .enterData('Text Field','TimeOffID',timeOffID)
                .done();
            },
            continueOnFail: true
        })
    
        //Add Time Off Type - Award on Start of Year 
        .selectComboBoxRowValue('AwardOn', 'Start of Year','strAwardPeriod')
        .enterData('Text Field','Description','CRUD - Add new time off type - Start of Year')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','1')
        .enterGridData('TimeOffTiers',1,'colDescription','CRUD - Entry Level')
        .enterGridData('TimeOffTiers',1,'colRateHours','80')
        .enterGridData('TimeOffTiers',1,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',1,'colPeriod','Year','Period',6)
        .enterGridData('TimeOffTiers',1,'colMaxEarned','80')
        .enterGridData('TimeOffTiers',1,'colMaxCarryover','24')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','3')
        .enterGridData('TimeOffTiers',2,'colDescription','CRUD - Mid Level')
        .enterGridData('TimeOffTiers',2,'colRateHours','160')
        .enterGridData('TimeOffTiers',2,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',2,'colPeriod','Year','Period',6)
        .enterGridData('TimeOffTiers',2,'colMaxEarned','120')
        .enterGridData('TimeOffTiers',2,'colMaxCarryover','40')
        .clickButton('Insert')
        .enterGridData('TimeOffTiers','Dummy','colYearsOfService','5')
        .enterGridData('TimeOffTiers',3,'colDescription','CRUD - Senior Level')
        .enterGridData('TimeOffTiers',3,'colRateHours','200')
        .enterGridData('TimeOffTiers',3,'colRatePer','1')
        .selectGridComboBoxRowValue('TimeOffTiers',3,'colPeriod','Year','Period',6)
        .enterGridData('TimeOffTiers',3,'colMaxEarned','300')
        .enterGridData('TimeOffTiers',3,'colMaxCarryover','40')
        .clickButton('Save')
        .verifyStatusMessage('Saved')
        .clickButton('Close')
        

    .done();
});