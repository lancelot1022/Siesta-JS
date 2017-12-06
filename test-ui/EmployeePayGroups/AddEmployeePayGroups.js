
StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

   
       
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Pay Groups', 'Screen')                                                                // Opens Employee Pay Groups screen
        .clickButton('Insert')
        .enterGridData('EmployeePayGroup','Dummy','colPayGroup','Pay Group 1')
        .enterGridData('EmployeePayGroup',5,'colDescription','Pay Group 1 Description')
        .selectGridComboBoxRowValue('EmployeePayGroup',5,'colBankAccount','12152015','BankAccountId',1)
        .clickButton('Save')
        .clickButton('Close')

  
       
        .clickMenuScreen('Employee Pay Groups', 'Screen')                                                                // Opens Employee Pay Groups screen
        .clickButton('Insert')
        .enterGridData('EmployeePayGroup','Dummy','colPayGroup','Pay Group 1')
        .clickButton('Save')
        .verifyMessageBox('iRely i21', 'Pay Group already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close')

        .done();
});


