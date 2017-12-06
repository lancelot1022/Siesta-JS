StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var newDate = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 12), 'n/j/Y');
    var newDate2 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 13), 'n/j/Y');
    var TODAY = Ext.Date.format(sysDATE, 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Resubmit Time Off Request - No need for Approval
        .displayText('=========== EDIT AND RESUBMIT EMPLOYEE TIME OFF REQUEST ===========')
        .clickMenuScreen('Time Off Requests', 'Screen')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Employee No.','APRITTER');
        })
        .waitUntilLoaded()
        .selectSearchRowNumber(1,1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyToolbarButton({ New : true , Save : true, Search: true, Delete: true, Undo: true, Print: true, UnpostFromCalendar: false,Close: true})
        .displayText('Time Off Request with past date cannot be editted')
        .clickButton('Close')

        .waitUntilLoaded()
        .selectSearchRowNumber(2,1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyToolbarButton({ New : true , Save : true, Search: true, Delete: true, Undo: true, Print: true, UnpostFromCalendar: true,Close: true})
        .clickButton('UnpostFromCalendar')
        .enterData('Date Field', 'DateFrom', newDate)
        .enterData('Date Field', 'DateTo', newDate2)
        .enterData('Text Field', 'RequestHours', 16)
        .enterData('Text Field', 'Reason', 'CRUD - Edit TOR without Approval - Future Date')
        .enterData('Text Field', 'Address', '1345 Edit St., Sydney, NSW 4322')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('No Need for Approval')
        .clickButton('PostToCalendar')
        .waitUntilLoaded()
        .verifyStatusMessage('Posted to Calendar')
        .clickButton('Close')
        
    .done()
});