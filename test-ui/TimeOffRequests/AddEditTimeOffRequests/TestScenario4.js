StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var pastDate = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -9), 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Create Time Off Request for employee with Approval - Past Date
        .addFunction(function(next){
            commonPR.addTimeOff(t,next,'CJLOWE', pastDate, pastDate, 'IT', 'VAC', 8, 
                            'CRUD - Create TOR with Approval - Past Date',
                            '1299 CRUD St., Melbourne, VIC 4323','yes');
        })

    .done()
});