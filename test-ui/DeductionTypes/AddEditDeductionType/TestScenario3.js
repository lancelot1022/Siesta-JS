StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .waitUntilLoaded()

        //Add Hourly Amount Deduction Type
        .addFunction(function(next){
            commonPR.addDeductionType(t,next,'CRUD-HOURLY', 'Hourly Amount','CRUD Net - Add Hourly Deduction Type',1.2,'Employee',
                                        '24050-0000-000','Net Pay','0001005195','',10.00);
        })

    .done();
});