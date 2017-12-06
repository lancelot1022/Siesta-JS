StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitUntilLoaded()

        //Add Percent Deduction Type paid by Company
        .addFunction(function(next){
            commonPR.addDeductionType(t,next,'CRUD-PERCENT', 'Percent','CRUD Gross - Add Percent Deduction Type',2.95,'Company',
                                        '23000-0002-006','','0001005195','56109-0000-000','');
        })

    .done();
});