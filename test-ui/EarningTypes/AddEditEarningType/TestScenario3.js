StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Add Annual Salary Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-ANNUAL', 'Annual Salary','CRUD - Add Annual Salary Earning Type',66000,'52000-0000-003',
                                        'C','');
        })

        //Add Overtime Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-OVERTIME', 'Overtime','CRUD - Add Overtime Earning Type',1.5,'52000-0000-003',
                                        'R','Tax as Normal');
        })

        //Add Reimbursement Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-REIMBURSEMENT', 'Reimbursement','CRUD - Add Reimbursement Earning Type',100,'54100-0000-000',
                                        'F','');
        })

    .done()
});