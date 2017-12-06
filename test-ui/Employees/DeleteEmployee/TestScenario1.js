StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var empName = 'Margery Tyrell';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Delete employee with no transactions
        //Check if Employee to edit exist
        .displayText('Checking if Employee ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Name',empName);
        })
        .waitUntilLoaded()
        .continueIf({
            expected: true,
            actual: function (win,next) {
                new iRely.FunctionalTest().start(t, next);
                return win.down('#grdSearch').store.getCount() >= 1;
            },
            success: function (next) {
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .selectSearchRowByRange(1,1)
                .clickButton('OpenSelected')
                .waitUntilLoaded() 
                .clickButton('Delete')
                .verifyMessageBox('iRely i21', 'Are you sure you want to delete this record?', 'yesno', 'question')
                .clickMessageBoxButton('yes')
                .waitUntilLoaded()

                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Employee::' + empName +  ' does not exists.')
                .displayText('Unable to execute Test Scenario for edit existing employee. Execute Test Scenario 2 before proceeding for this scenario.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')


        .done();
        

});