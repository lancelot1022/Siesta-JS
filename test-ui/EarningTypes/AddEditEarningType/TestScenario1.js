StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Add Fixed Amount Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-FIXED', 'Fixed Amount','CRUD - Add Fixed Earning Type',1250,'54100-0000-000',
                                        'A','');
        })


        //Add Existing Earning Type
        .clickButton('New')
        .verifyScreenShown('prearningtype')
        .enterData('Text Field', 'EarningId', 'CRUD-FIXED')
        .enterData('Text Field', 'Description', 'CRUD - Add Duplicate Fixed Earning Type')
        .selectComboBoxRowValue('AccountId', '70000-0001-005', 'intAccountId', 1)
        .verifyStatusMessage('Edited')
        .clickButton('AddEarningTax') 
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Earning ID already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Cancel')
        .clickButton('Save')
        .verifyMessageBox('iRely i21', 'Earning ID already exists!', 'ok', 'error')
        .clickMessageBoxButton('ok')
        .clickButton('Close')
        .clickMessageBoxButton('no')

    .done()
});