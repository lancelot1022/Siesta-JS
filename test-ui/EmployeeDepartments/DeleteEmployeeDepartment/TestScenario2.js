StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')
        
        //Delete Currently Used Employee Department
        .selectGridRowNumber('Department',5)
        .clickButton('Remove')
        .waitUntilLoaded()
        .clickMessageBoxButton('yes')
        .waitUntilLoaded()
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'The record you are trying to delete is being used.', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close')
       
        .done();

        
});

