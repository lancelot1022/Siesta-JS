StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')

        //Add Fringe Benefit Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-FRINGE', 'Fringe Benefit','CRUD - Add Fringe Benefit Earning Type',100,'60100-0003-007',
                                        'EE','Tax as Supplemental');
        })

        //Add Hourly Rate Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-HOURLY', 'Hourly Rate','CRUD - Add Hourly Rate Earning Type',15,'55100-9000-902',
                                        'Z','Tax as Normal');
        })

        //Add Rate Factor Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-RATEFACTOR', 'Rate Factor','CRUD - Add Rate Factor Earning Type',0.75,'52000-0001-002',
                                        '','');
        })

        //Add Tips Earning Type
        .addFunction(function(next){
            commonPR.addEarningType(t,next,'CRUD-TIPS', 'Tip','CRUD - Add Tips Earning Type',20.75,'57000-9000-014',
                                        'Q','');
        })

    .done()
});