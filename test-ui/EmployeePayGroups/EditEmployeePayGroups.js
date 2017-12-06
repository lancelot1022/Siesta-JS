StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

   
       
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Pay Groups', 'Screen')

        .enterGridData('EmployeePayGroup',1,'colPayGroup','Pay Group Edit')
        .enterGridData('EmployeePayGroup',1,'colDescription','Pay Group Edit Description')
        .selectGridComboBoxRowValue('EmployeePayGroup',1,'colBankAccount','123452','BankAccountId',1)
        .clickButton('Save')
        .clickButton('Close')
        .done();
});
