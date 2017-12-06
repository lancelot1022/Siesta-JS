StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitTillLoaded()

        //Add Percent Tax Type
        .addFunction(function(next){
            commonPR.addTaxType(t,next,'CRUD-PERCENT', 'Percent','CRUD - Add Percent Tax Type',0.03,'Company',
                                        '22000-9000-001','','','1005311','52000-0001-007',450);
        })

    .done();
});