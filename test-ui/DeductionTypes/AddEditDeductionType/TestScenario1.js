StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitUntilLoaded()

        //Add Fixed Amount Deduction Type
        .addFunction(function(next){
            commonPR.addDeductionType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD Gross - Add Fixed Deduction Type',150,'',
                                        '24050-0000-000','','','','');
        })

        //Add Existing Deduction Type
        .clickButton('New')
        .verifyScreenShown('prdeductiontype')
        .enterData('Text Field', 'DeductionId', 'CRUD-FIXED')
        .enterData('Text Field', 'Description', 'CRUD - Add Duplicate Fixed Deduction Type')
        .selectComboBoxRowValue('AccountId', '24050-0000-000', 'intAccountId', 1)
        .verifyStatusMessage('Edited')
        .clickButton('AddDeductionTax') 
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Deduction ID already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Cancel')
        .clickButton('Save')
        .verifyMessageBox('iRely i21', 'Deduction ID already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close')
        .clickMessageBoxButton('no')
        
        .done();

});