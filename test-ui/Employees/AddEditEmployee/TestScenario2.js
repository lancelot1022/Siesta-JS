StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');

    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employees', 'Screen')
        .waitTillLoaded()

        //Add New Active Employee - No template used
        .clickButton('New')
        .waitUntilLoaded()
        .verifyScreenShown('emcreatenewentity')
        .enterData('Text Field', 'Name', 'Margery Tyrell')
        .enterData('Text Field', 'Contact', 'Margery Tyrell')
        .enterData('Text Field', 'Phone', '985-895-4455')
        .enterData('Text Field', 'Email', 'queen7@gotdemo1.com')
        .addFunction(function(next){
            t.chain(
                { click : "#frmCreateNewEntity #tabCreateNewEntity panel[title=Details] #txtSearchAddress => .x-form-text"},
                { action : "type", options : { shiftKey : true }, text : "Buckingham Palace Road London" },
                { mousedown : "span.pac-matched:contains(Buckingham Palace Road)"});
            next();
        })
        .waitUntilLoaded()
        .verifyStatusMessage('Ready')
        .clickButton('Match')
     
        .waitUntilLoaded()
        .clickButton('Add')
        .waitUntilLoaded()
        .clickTab('Entity')
        .addFunction(function(next){
            t.chain(
                { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-input-field"},
                { action : "type", options : { shiftKey : true }, text : "User" },
                { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-form-trigger"});
            next();
        })
        .waitTillLoaded('',2000)
        .enterData('Text Field', 'ContactMobile', '9845621')
        .enterData('Text Field', 'Location', 'UK Main Office')
        .enterData('Text Field', 'Notes', 'CRUD - Add Employee No Template')
        
        // Employee > Details tab
        .clickTab('Employee')
        .waitUntilLoaded()
        .clickTab('Detail')
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeFirstName', 'Margery')
        .enterData('Text Field', 'EmployeeLastName', 'Tyrell')
        .enterData('Text Field', 'EmployeeTitle', 'CRUD Project Manager')
        .selectComboBoxRowValue('EmployeePayPeriod', 'Bi-Weekly', 'strPayPeriod',1)
        .enterData('Text Field', 'EmployeeRank', 1)
        .enterData('Text Field', 'EmployeeEmergencyContact', 'Ollena Tyrell')
        .enterData('Text Field', 'EmployeeEmergencyRelation', 'Grandmother')
        .enterData('Text Field', 'EmployeeEmergencyPhone', '112-454-8899')
        .enterData('Text Field', 'EmployeeEmergencyPhone2', '774-896-2231')
        .enterData('Date Field', 'EmployeeBirthDate', '9/4/1988')
        .enterData('Date Field', 'EmployeeOriginalDate', '3/15/2012')
        .enterData('Date Field', 'EmployeeHired', '3/15/2012')
        .selectComboBoxRowValue('EmployeeGender', 'Female', 'Gender',1)
        .selectComboBoxRowValue('EmployeeMaritalStatus', 'Married', 'MaritalStatus',1)
        .enterData('Text Field', 'EmployeeWorkPhone', '112-598-8977')
        .selectComboBoxRowNumber('EmployeeWorkersCompCode',1)
        .selectComboBoxRowValue('EmployeeEthnicOrigin', 'White', 'strEthnicity',1)
        .selectComboBoxRowValue('EmployeeEEOCCode', 'Professionals','strEEOCCode',1)
        .enterData('Text Field', 'EmployeeSocialSecurity', '985-896-965')
        
        // User > Details tab
        .clickTab('User')
        .waitUntilLoaded()
        .enterData('Text Field', 'UserUsername', 'margerytyrell')
        .enterData('Text Field', 'UserCurrentPassword', 'queenM123')
        .selectComboBoxRowValue('UserDefaultRole', 'ADMINISTRATOR', 'strUserRoleName',1)
        .selectComboBoxRowValue('SecurityPolicy', 'Default User Policy', 'intSecurityPolicyId',1)
        .clickCheckBox('UserDisabled', true)

        // Employee > Taxes tab
        .clickTab('Employee')
        .waitUntilLoaded()
        .clickTab('Taxes')
        .waitUntilLoaded()
        .clickButton('EmployeeTaxesAddTaxes')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'FIT'},
            {dataIndex: 'strTax', value: 'FUTA'},
            {dataIndex: 'strTax', value: 'SUTA'},
            {dataIndex: 'strTax', value: 'FICA MED Company'},
            {dataIndex: 'strTax', value: 'FICA MED Employee'},
            {dataIndex: 'strTax', value: 'FICA SS Company'},
            {dataIndex: 'strTax', value: 'FICA SS Employee'},
            {dataIndex: 'strTax', value: 'MI-State Tax'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()

        // Employee > Earnings tab
        .clickTab('Earnings')
        .waitUntilLoaded()
        .clickButton('EmployeeEarningsAdd')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strEarning', value: 'REG'},
            {dataIndex: 'strEarning', value: 'OTV'},
            {dataIndex: 'strEarning', value: 'VAC'},
            {dataIndex: 'strEarning', value: 'SICK'},
            {dataIndex: 'strEarning', value: 'BONUS'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()
        .selectGridComboBoxRowValue('EmployeeEarning', 1, 'colEmployeeEarningsPayGroup', 'Bi-weekly', 'strPayGroup')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'REG'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningAmount', '26.25')
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '80')
        .selectGridComboBoxRowValue('EmployeeEarningDistribution', 1, 'colEmployeeEarningDistributionAccount', '52000-0000-001', 'strAccountId')
        .enterGridData('EmployeeEarningDistribution', 1, 'dblPercentage', '50')
        .selectGridComboBoxRowValue('EmployeeEarningDistribution', 2, 'colEmployeeEarningDistributionAccount', '52000-0000-002', 'strAccountId')
        .enterGridData('EmployeeEarningDistribution', 2, 'dblPercentage', '50')
        
        .selectGridComboBoxRowValue('EmployeeEarning', 2, 'colEmployeeEarningsPayGroup', 'Bi-weekly', 'strPayGroup')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'OTV'}])
        .waitUntilLoaded()
        .selectComboBoxRowValue('EmployeeEarningLinkId', 'REG', 'strEarningLink',1)
        .enterData('Text Field', 'EmployeeEarningAmount', '1.75')

        .selectGridComboBoxRowValue('EmployeeEarning', 3, 'colEmployeeEarningsPayGroup', 'Bi-weekly', 'strPayGroup')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'VAC'}])
        .waitUntilLoaded()
        .selectComboBoxRowValue('EmployeeEarningLinkId', 'REG', 'strEarningLink',1)
        .enterData('Text Field', 'EmployeeEarningAmount', '1')

        .selectGridComboBoxRowValue('EmployeeEarning', 4, 'colEmployeeEarningsPayGroup', 'Bi-weekly', 'strPayGroup')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'SICK'}])
        .waitUntilLoaded()
        .selectComboBoxRowValue('EmployeeEarningLinkId', 'REG', 'strEarningLink',1)
        .enterData('Text Field', 'EmployeeEarningAmount', '1')
        .waitUntilLoaded()

        .selectGridComboBoxRowValue('EmployeeEarning', 5, 'colEmployeeEarningsPayGroup', 'Bi-weekly', 'strPayGroup')
        .clickGridCheckBox('EmployeeEarning',5 , 'strEarningId', 'BONUS', 'ysnDefault', false)

        // Employee > Deductions tab
        .clickTab('Deductions')
        .waitUntilLoaded()
        .clickButton('EmployeeDeductionAdd')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strDeduction', value: '401K'},
            {dataIndex: 'strDeduction', value: 'Uniforms'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()

        // Employee > Time Off tab
        .clickTab('Time Off')
        .waitUntilLoaded()
        .clickButton('EmployeeTimeOffAdd')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTimeOff', value: 'VAC (Year)'},
            {dataIndex: 'strTimeOff', value: 'SICK'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()

        .selectGridRowValue('EmployeeTimeOff', [{dataIndex: 'strTimeOffId', value: 'VAC (Year)'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeOffEligibleDate', '1/1/2012')
        .selectGridRowValue('EmployeeTimeOff', [{dataIndex: 'strTimeOffId', value: 'SICK'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeOffEligibleDate', '1/1/2012')
        
        // Employee > Time Entry tab
        .clickTab('Time Entry')
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeEntryPassword', '1234')
        .clickButton('EmployeeTimeOffDepartmentAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntryDepartment', 'Dummy', 'colEmployeeTimeEntryDepartment', 'Home Office', 'strDepartment')
        .selectGridComboBoxRowValue('EmployeeTimeEntryDepartment', 'Dummy', 'colEmployeeTimeEntryDepartment', 'Admin', 'strDepartment')
        .clickButton('EmployeeTimeOffSupervisorAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntrySupervisor', 'Dummy', 'colEmployeeTimeEntrySupervisorEmployeeId', 'ACJOHNSON', 'strEmployeeSupervisorEntityId')
        .selectGridComboBoxRowValue('EmployeeTimeEntrySupervisor', 'Dummy', 'colEmployeeTimeEntrySupervisorEmployeeId', 'JBFOWLER', 'strEmployeeSupervisorEntityId')
        
        // Employee > Time Entry tab
        .clickTab('Direct Deposit')
        .selectGridComboBoxRowValue('EmployeeDirectDeposit', 'Dummy', 'colEmployeeDirectDepositBankName', 'Wells Fargo Indiana', 'strBankName')
        .enterGridData('EmployeeDirectDeposit', 1, 'strAccountNumber', '11223345')
        .selectGridComboBoxRowValue('EmployeeDirectDeposit', 1, 'colEmployeeDirectDepositAccountType', 'Savings', 'strAccountType')
        .selectGridComboBoxRowValue('EmployeeDirectDeposit', 1, 'colEmployeeDirectDepositClassification', 'Corporate', 'strAccountClassification')
        .enterGridData('EmployeeDirectDeposit', 1, 'dtmEffectiveDate', '3/15/2012')
        .selectGridComboBoxRowValue('EmployeeDirectDeposit', 1, 'colEmployeeDirectDepositDistributionType', 'Percent', 'strDistributionType')
        .enterGridData('EmployeeDirectDeposit', 1, 'dblAmount', '100')
        .clickGridCheckBox('EmployeeDirectDeposit',1 , 'strBankName', 'Wells Fargo Indiana', 'ysnActive', true)

        .clickButton('Save')
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .done();
        
});