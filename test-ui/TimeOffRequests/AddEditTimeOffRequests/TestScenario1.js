StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var futureDate = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 7), 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Create Time Off Request for employee without Approval
        .addFunction(function(next){
            commonPR.addTimeOff(t,next,'APRITTER', futureDate, futureDate, 'Warehouse','VAC' , 8, 
                            'CRUD - Create TOR without Approval - Future Date',
                            '1299 CRUD St., Melbourne, VIC 4323','no');
        })

    .done()
});