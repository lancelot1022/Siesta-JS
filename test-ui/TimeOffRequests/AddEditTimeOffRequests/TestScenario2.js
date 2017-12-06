StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var futureDate = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 7), 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        //Setup employee approval list
        .addFunction(function(next){
            commonPR.addApprovalList(t,next,'CRUDApprover','Kris Lindower',0,36,'no');
        })

        .clickMenuFolder('Payroll', 'Folder')

        .addFunction(function(next){
            commonPR.addApprovalListToEmp(t,next,'CJLOWE','CRUDApprover');
        })

        //Create Time Off Request for employee with Approval
        .addFunction(function(next){
            commonPR.addTimeOff(t,next,'CJLOWE', futureDate, futureDate, 'IT', 'VAC', 8, 
                            'CRUD - Create TOR with Approval - Future Date',
                            '1299 CRUD St., Melbourne, VIC 4323','yes');
        })

    .done()
});