StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)
       
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')

        //Add Employee Department
        .clickButton('Insert')
        .enterGridData('Department','Dummy','colDepartment','CRUD-DEPT')
        .enterGridData('Department',13,'colDescription','CRUD - Add Employee Department')
        .selectGridComboBoxRowValue('Department',13,'colLocation','9008','Code',1)
        .selectGridComboBoxRowValue('Department',13,'colLOB','007','Code',1)
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .done();
});

