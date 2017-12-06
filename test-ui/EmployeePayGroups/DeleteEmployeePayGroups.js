StartTest (function (t) {
    var engine = new iRely.TestEngine();
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    engine.start(t)

        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Pay Groups', 'Screen')    

                                                                     
        .checkStatusMessage('Ready')
        .selectGridRow('#grdEmployeePayGroup',0)
        .clickButton('#btnDeletePayGroup')                                                                   
        .checkMessageBox('iRely i21','You are about to delete 1 row.<br/>Are you sure you want to continue?','yesno','question')
        .waitTillLoaded()
        .clickMessageBoxButton('yes')
        .checkStatusMessage('Edited')
        .clickButton('#btnSave')
        .checkStatusMessage('Saved')
        .clickButton('#btnClose')
        .done();
})
