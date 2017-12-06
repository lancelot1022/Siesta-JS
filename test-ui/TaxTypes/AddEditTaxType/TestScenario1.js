StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitTillLoaded()

        //Add Fixed Amount Tax Type
        .addFunction(function(next){
            commonPR.addTaxType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD - Add Fixed Tax Type',79.5,'',
                                        '24000-0007-003','','','','52000-0001-004','100');
        })

        //Add Existing Tax Type
        .waitUntilLoaded()
        .clickButton('New')
        .verifyScreenShown('prtaxtype')
        .enterData('Text Field','Reference','CRUD-FIXED')
        .enterData('Text Field', 'Description', 'CRUD - Add Duplicate Fixed Tax Type')
        .selectComboBoxRowValue('AccountId','24000-0007-003', 'intAccountId')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .verifyMessageBox('iRely i21', 'Tax ID already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close')
        .clickMessageBoxButton('no')

    .done()
});