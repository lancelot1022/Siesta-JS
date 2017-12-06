StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var TODAY = Ext.Date.format(sysDATE, 'njy');
    var empNo = 'CRUDADDEMP';
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Check if Entity No already exist
        .displayText('Checking if Employee ID exists')
        .addFunction(function(next){
            commonPR.itemSearch(t,next,'Entity No',empNo);
        })
        .waitUntilLoaded()
        .continueIf({
            expected: true,
            actual: function (win,next) {
                new iRely.FunctionalTest().start(t, next);
                return win.down('#grdSearch').store.getCount() >= 1;
            },
            success: function (next) {
                var empNo = 'CRUDADDEMP' + TODAY
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Employee with Entity No already exists.')
                .displayText('Changing Entity No. of employee creating to: ' + empNo)
                .done();

            },
            failure: function(next){
                new iRely.FunctionalTest().start(t, next)
                .waitTillLoaded('',3000)
                .displayText('Employee with Entity No with:' + empNo +  ' does not exists.')
                .done();
            },
            continueOnFail: true
        })
        .waitUntilLoaded()
        .clickButton('ClearAllFilters')

        //Add New Active Employee - Using Template
        .clickButton('New')
        .waitUntilLoaded()
        .verifyScreenShown('emcreatenewentity')
        .enterData('Text Field', 'Name', 'Jon T. Snow')
        .enterData('Text Field', 'Contact', 'Jon T. Snow')
        .enterData('Text Field', 'Phone', '998-884-1125')
        .enterData('Text Field', 'Email', 'uknownothin@gotdemo1.com')
        .addFunction(function(next){
            t.chain(
                { click : "#frmCreateNewEntity #tabCreateNewEntity panel[title=Details] #txtSearchAddress => .x-form-text"},
                { action : "type", options : { shiftKey : true }, text : "Downing Street London" },
                { mousedown : "span.pac-matched:contains(Downing Street)"});
            next();
        })
        .waitUntilLoaded()
        .verifyStatusMessage('Ready')
        .clickButton('Match')
     
        .waitUntilLoaded()
        .clickButton('Add')
        .waitUntilLoaded()
        .clickTab('Entity')
        .enterData('Text Field', 'EntityNumber', empNo)
        .addFunction(function(next){
            t.chain(
                { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-input-field"},
                { action : "type", options : { shiftKey : true }, text : "User" },
                { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-form-trigger"});
            next();
        })
        .waitTillLoaded('',2000)
        
        .enterData('Text Field', 'Location', 'London Headquarters')
        
        // Employee > Details tab
        .clickTab('Employee')
        .waitUntilLoaded()
        .clickTab('Detail')
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeFirstName', 'Jon')
        .enterData('Text Field', 'EmployeeMiddleName', 'Targaryen')
        .enterData('Text Field', 'EmployeeLastName', 'Snow')
        .enterData('Text Field', 'EmployeeTitle', 'CRUD Employee')
        .enterData('Date Field', 'EmployeeBirthDate', '10/21/1990')
        .enterData('Date Field', 'EmployeeOriginalDate', '6/1/2015')
        .enterData('Date Field', 'EmployeeHired', '6/1/2015')
        .selectComboBoxRowValue('EmployeePayPeriod', 'Weekly', 'strPayPeriod',1)
        .enterData('Text Field', 'EmployeeRank', 1)
        .selectComboBoxRowNumber('EmployeeWorkersCompCode',1)
        .selectComboBoxRowValue('EmployeeEthnicOrigin', 'White', 'strEthnicity',1)
        .selectComboBoxRowValue('EmployeeEEOCCode', 'Professionals','strEEOCCode',1)
        .enterData('Text Field', 'EmployeeSocialSecurity', '598-789-784')
        
        // User > Details tab
        .clickTab('User')
        .waitUntilLoaded()
        .enterData('Text Field', 'UserUsername', 'jonsnow')
        .enterData('Text Field', 'UserCurrentPassword', 'jon1234')
        .selectComboBoxRowValue('UserDefaultRole', 'Employee', 'strUserRoleName',1)
        .selectComboBoxRowValue('SecurityPolicy', 'Default User Policy', 'intSecurityPolicyId',1)
        .clickCheckBox('UserDisabled', true)

        // Employee uses template for taxes, deductions, etc.
        .clickButton('EmployeeTemplate')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'All information on Taxes, Earnings, Deductions and Time Off will be overridden. Do you want to continue?', 'yesno', 'question')
        .clickMessageBoxButton('yes')
        .waitUntilLoaded()
        .verifyScreenShown('premployeetemplatelist')
        .selectGridRowValue('Template', [{dataIndex: 'strTemplateName', value: 'Hourly - Single - Bi Weekly'}])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()

        // Employee > Taxes tab
        .clickTab('Employee')
        .waitUntilLoaded()
        .clickTab('Taxes')
        .waitUntilLoaded()

        // Employee > Earnings tab
        .clickTab('Earnings')
        .waitUntilLoaded()
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'REG'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningAmount', '21.5')
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '40')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'OTV'}])
        .waitUntilLoaded()
        .selectComboBoxRowValue('EmployeeEarningLinkId', 'REG', 'strEarningLink',1)
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '0')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'SICK'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '0')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'VAC'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '0')
        .waitUntilLoaded()

        // Employee > Deductions tab
        .clickTab('Deductions')
        .waitUntilLoaded()

        // Employee > Time Off tab
        .clickTab('Time Off')
        .waitUntilLoaded()
        .selectGridRowValue('EmployeeTimeOff', [{dataIndex: 'strTimeOffId', value: 'VAC (Year)'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeOffHoursEarned', '40')
        .selectGridRowValue('EmployeeTimeOff', [{dataIndex: 'strTimeOffId', value: 'SICK'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeOffHoursEarned', '20')
        
        // Employee > Time Entry tab
        .clickTab('Time Entry')
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeEntryPassword', '1234')
        .clickButton('EmployeeTimeOffDepartmentAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntryDepartment', 'Dummy', 'strEmployeeDepartment', 'Warehouse', 'strDepartment')
        .clickButton('EmployeeTimeOffSupervisorAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntrySupervisor', 'Dummy', 'strEmployeeSupervisorEntityId', 'ACJOHNSON', 'strEmployeeSupervisorEntityId')

        // General tab
        .clickTab('General')
        .waitUntilLoaded()
        .clickButton('EntityRequireApprovalInsert')
        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'strScreenName', 'Time Off Requests', 'strScreenName')
        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'strApprovalList', 'Time Off Approval', 'strApprovalList')
        .clickButton('Save')
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')


        .done();
        

});