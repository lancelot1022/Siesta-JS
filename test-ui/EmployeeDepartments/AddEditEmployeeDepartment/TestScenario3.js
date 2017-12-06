StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')
        
        //Edit Employee Department
        .enterGridData('Department',1,'colDepartment','CRUD-EDIT')
        .enterGridData('Department',1,'colDescription','CRUD - Edit Employee Department')
        .selectGridComboBoxRowValue('Department',1,'colLocation','0001','Code')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .clickButton('Close')

        .done();
});