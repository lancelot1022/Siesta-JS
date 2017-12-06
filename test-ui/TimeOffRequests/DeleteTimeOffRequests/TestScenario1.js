StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Delete Time Off Request - No need for Approval
        .displayText('=========== DELETE EMPLOYEE TIME OFF REQUEST - NO APPROVAL REQUIRED ===========')
        .clickMenuScreen('Time Off Requests', 'Screen')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Employee No.','APRITTER');
        })
        .waitUntilLoaded()
        .selectSearchRowNumber(2,1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyToolbarButton({ New : true , Save : true, Search: true, Delete: true, Undo: true, Print: true, UnpostFromCalendar: true,Close: true})
        .clickButton('UnpostFromCalendar')
        .clickButton('Delete')
        .clickMessageBoxButton('yes')

    .done()
});