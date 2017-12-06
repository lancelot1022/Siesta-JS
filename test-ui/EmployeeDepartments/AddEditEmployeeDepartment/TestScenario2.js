StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)
       
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')
        
        //Add Duplicate Employee Department
        .clickButton('Insert')
        .enterGridData('Department','Dummy','colDepartment','CRUD-DEPT')
        .enterGridData('Department',14,'colDescription','CRUD - Add Duplicate Employee Deparment')
        .selectGridComboBoxRowValue('Department',14,'colLocation','0000','Code')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Department already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close') 

        .done();
});

