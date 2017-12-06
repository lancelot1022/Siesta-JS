StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitTillLoaded()

        //Add Local Tax Type
        .addFunction(function(next){
            commonPR.addTaxType(t,next,'CRUD-LOCAL', 'USA Local','CRUD - Add Local Tax Type','','',
                                        '24110-0000-000','Indiana','Delaware','','55100-0000-000','');
        })

    .done();
});