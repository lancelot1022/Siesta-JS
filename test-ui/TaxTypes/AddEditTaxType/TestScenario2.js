StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitTillLoaded()

        //Add State Tax Type
        .addFunction(function(next){
            commonPR.addTaxType(t,next,'CRUD-STATE', 'USA State','CRUD - Add State Tax Type','','',
                                        '24110-0000-000','Texas','','','55100-0000-000','');
        })

    .done();
});