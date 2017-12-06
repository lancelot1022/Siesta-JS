StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var pDate = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -16), 'n/j/Y');
    var pDate2 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -15), 'n/j/Y');
    var TODAY = Ext.Date.format(sysDATE, 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Resubmit Time Off Request - No need for Approval
        .displayText('=========== EDIT AND RESUBMIT EMPLOYEE TIME OFF REQUEST ===========')
        .clickMenuScreen('Time Off Requests', 'Screen')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Employee No.','CJLOWE');
        })
        .waitUntilLoaded()
        .selectSearchRowNumber(2,1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyToolbarButton({ New : true , Save : true, Search: true, Delete: true, Undo: true, Print: true, PostFromCalendar: false,Close: true})
        .enterData('Date Field', 'DateFrom', pDate)
        .enterData('Date Field', 'DateTo', pDate2)
        .enterData('Text Field', 'RequestHours', 16)
        .enterData('Text Field', 'Reason', 'CRUD - Edit TOR with Approval - Past Date')
        .enterData('Text Field', 'Address', '1251 Elizabeth St., Perth, WA 5433')
        .clickButton('Save')
        .clickMessageBoxButton('yes')
        .clickMessageBoxButton('ok')
        .waitUntilLoaded()
        .verifyStatusMessage('Waiting for Approval')
        .clickButton('Close')

        
    .done()
});