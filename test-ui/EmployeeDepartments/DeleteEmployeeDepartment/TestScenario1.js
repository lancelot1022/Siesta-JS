StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')
        
        //Delete Employee Department
        .selectGridRowNumber('Department',1)
        .clickButton('Remove')
        .waitUntilLoaded()
        .clickMessageBoxButton('yes')
        .waitUntilLoaded()
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')
       
        .done();

        
});

