StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var TODAY = Ext.Date.format(sysDATE, 'n/j/Y');
    var expDATE = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 14), 'n/j/Y');
    var newDATE = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 20), 'n/j/Y');
    new iRely.FunctionalTest().start(t)

        .waitUntilMainMenuLoaded()

        .addFunction(function(next){
            commonPR.addApprovalList(t,next,'iRely Admin','Kris Lindower',0,36,'no');
        })
        
        .clickMenuFolder('Payroll', 'Folder')
        
        .clickMenuScreen('Tax Types', 'Screen')
        .selectSearchRowValue('FIT', 'strTax')
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtaxtype')
        .verifyToolbarButton({ refresh: false })
        .isControlVisible('Button', 'UpdateEmployees', true)
        .verifyFieldLabel('Text Field', [
            { itemId: 'Reference', label: 'Tax ID' },
            { itemId: 'Description', label: 'Description' },
            { itemId: 'Amount', label: 'Amount' },
            { itemId: 'Limit', label: 'Limit' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'CalculationType', label: 'Calculation Type' },
            { itemId: 'PaidBy', label: 'Paid By' },
            { itemId: 'TaxState', label: 'State' },
            { itemId: 'AccountId', label: 'Account ID' },
            { itemId: 'County', label: 'County' },
            { itemId: 'ExpenseAccount', label: 'Expense Account' },
            { itemId: 'VendorId', label: 'Vendor Id' },
            { itemId: 'SupplementalCalc', label: 'Supplemental Calc' }
        ])
        .clickButton('New')
        .enterData('Text Field', 'Reference', 'SMOKETAX')
        .selectComboBoxRowValue('CalculationType', 'Percent','strCalculationType',1)
        .enterData('Text Field', 'Description', 'New Tax Smoke Testing')
        .enterData('Text Field', 'Amount', 2.45)
        .selectComboBoxRowValue('AccountId', '28000-0000-000', 'intAccountId',1)
        .selectComboBoxRowValue('ExpenseAccount', '56109-0000-000', 'intExpenseAccountId',1)
        .selectComboBoxRowValue('VendorId', '0001005195', 'intVendorId',1)
        .verifyStatusMessage('Edited')
        .waitUntilLoaded()
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Deduction Types', 'Screen')
        .selectSearchRowValue('401K', 'Deduction ID')
        .clickButton('OpenSelected')
        .verifyScreenShown('prdeductiontype')
        .verifyToolbarButton({ refresh: false })
        .isControlVisible('Button', 'UpdateEmployees', true)
        .verifyFieldLabel('Text Field', [
            { itemId: 'DeductionId', label: 'Deduction ID' },
            { itemId: 'Description', label: 'Description' },
            { itemId: 'Amount', label: 'Percent' },
            { itemId: 'Limit', label: 'Limit' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'CalculationType', label: 'Calculation Type' },
            { itemId: 'PaidBy', label: 'Paid By' },
            { itemId: 'DeductFrom', label: 'Deduct From' },
            { itemId: 'AccountId', label: 'Account ID' },
            { itemId: 'ExpenseAccount', label: 'Expense Account' },
            { itemId: 'W2Code', label: 'W2 Code' },
            { itemId: 'VendorId', label: 'Vendor Id' }
        ])
        .clickButton('New')
        .enterData('Text Field', 'DeductionId', 'SMOKEDED')
        .selectComboBoxRowValue('CalculationType', 'Hourly Percent', 'strCalculationType',1)
        .enterData('Text Field', 'Description', 'New Deduction Smoke Testing')
        .enterData('Text Field', 'Amount', .03)
        .enterData('Text Field', 'Limit', 450)
        .selectComboBoxRowValue('PaidBy', 'Employee', 'strPaidBy',1)
        .selectComboBoxRowValue('DeductFrom', 'Gross Pay', 'strDeductFrom',1)
        .selectComboBoxRowValue('W2Code', 'C', 'strW2Code',1)
        .selectComboBoxRowValue('AccountId', '24500-0000-000', 'intAccountId',1)
        .clickButton('AddDeductionTax')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'SMOKETAX'}, {dataIndex: 'strTax', value: 'FIT'},
            {dataIndex: 'strTax', value: 'FUTA'}, {dataIndex: 'strTax', value: 'SUTA'},
            {dataIndex: 'strTax', value: 'FICA MED Company'}, {dataIndex: 'strTax', value: 'FICA MED Employee'},
            {dataIndex: 'strTax', value: 'FICA SS Company'}, {dataIndex: 'strTax', value: 'FICA SS Employee'}
        ]) 
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Earning Types', 'Screen')
        .selectSearchRowValue('REG', 'Earning ID')
        .clickButton('OpenSelected')
        .verifyScreenShown('prearningtype')
        .verifyToolbarButton({ refresh: false })
        .isControlVisible('Button', 'UpdateEmployees', true)
        .verifyFieldLabel('Text Field', [
            { itemId: 'EarningId', label: 'Earning ID' },
            { itemId: 'Description', label: 'Description' },
            { itemId: 'Amount', label: 'Amount' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'CalculationType', label: 'Calculation Type' },
            { itemId: 'AccountId', label: 'Account ID' },
            { itemId: 'W2Code', label: 'W2 Code' },
            { itemId: 'TaxCalculation', label: 'Tax Calculation' }
        ])
        .clickButton('New')
        .enterData('Text Field', 'EarningId', 'SMOKEEARN')
        .selectComboBoxRowValue('CalculationType', 'Hourly Rate', 'strCalculationType',1)
        .enterData('Text Field', 'Description', 'New Earning Smoke Testing')
        .enterData('Text Field', 'Amount', 14.75)
        .selectComboBoxRowValue('W2Code', 'C', 'strW2Code',1)
        .selectComboBoxRowValue('AccountId', '54100-0000-000', 'intAccountId',1)
        .selectComboBoxRowValue('TaxCalculation', 'Tax as Normal', 'intTaxCalculationType',1)
        .clickButton('AddEarningTax')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'SMOKETAX'}, {dataIndex: 'strTax', value: 'FIT'},
            {dataIndex: 'strTax', value: 'FUTA'}, {dataIndex: 'strTax', value: 'SUTA'},
            {dataIndex: 'strTax', value: 'FICA MED Company'}, {dataIndex: 'strTax', value: 'FICA MED Employee'},
            {dataIndex: 'strTax', value: 'FICA SS Company'}, {dataIndex: 'strTax', value: 'FICA SS Employee'}
        ]) 
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Time Off Types', 'Screen')
        .selectSearchRowValue('VAC (Year)', 'Time Off Type')
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeofftype')
        .verifyToolbarButton({ refresh: false })
        .isControlVisible('Button', 'UpdateEmployees', true)
        .isControlVisible('Button', 'UpdateHours', true)
        .verifyFieldLabel('Text Field', [
            { itemId: 'TimeOffID', label: 'Time Off ID' },
            { itemId: 'Description', label: 'Description' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'AwardOn', label: 'Award On' }
        ])
        .clickButton('New')
        .enterData('Text Field', 'TimeOffID', 'SMOKETIME')
        .selectComboBoxRowValue('AwardOn', 'Anniversary Date', 'strAwardPeriod',1)
        .enterData('Text Field', 'Description', 'New Time Off Smoke Testing')
        .enterGridData('TimeOffTiers', 'Dummy', 'dblYearsOfService', '0')
        .enterGridData('TimeOffTiers', 1, 'strDescription', 'Entry Level')
        .enterGridData('TimeOffTiers', 1, 'dblRate', '40')
        .enterGridData('TimeOffTiers', 1, 'dblPerPeriod', '1')
        .selectGridComboBoxRowValue('TimeOffTiers', 1, 'colPeriod', 'Year', 'strPeriod')
        .enterGridData('TimeOffTiers', 1, 'dblMaxEarned', '40')
        .enterGridData('TimeOffTiers', 1, 'dblMaxCarryover', '40')
        .enterGridData('TimeOffTiers', 'Dummy', 'dblYearsOfService', '1')
        .enterGridData('TimeOffTiers', 2, 'strDescription', '1-2 Years of Experience')
        .enterGridData('TimeOffTiers', 2, 'dblRate', '60')
        .enterGridData('TimeOffTiers', 2, 'dblPerPeriod', '1')
        .selectGridComboBoxRowValue('TimeOffTiers', 2, 'colPeriod', 'Year', 'strPeriod')
        .enterGridData('TimeOffTiers', 2, 'dblMaxEarned', '60')
        .enterGridData('TimeOffTiers', 2, 'dblMaxCarryover', '60')
        .enterGridData('TimeOffTiers', 'Dummy', 'dblYearsOfService', '3')
        .enterGridData('TimeOffTiers', 3, 'strDescription', '3-5 Years of Experience')
        .enterGridData('TimeOffTiers', 3, 'dblRate', '80')
        .enterGridData('TimeOffTiers', 3, 'dblPerPeriod', '1')
        .selectGridComboBoxRowValue('TimeOffTiers', 3, 'colPeriod', 'Year', 'strPeriod')
        .enterGridData('TimeOffTiers', 3, 'dblMaxEarned', '80')
        .enterGridData('TimeOffTiers', 3, 'dblMaxCarryover', '80')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Employee Pay Groups', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeepaygroup')
        .verifyToolbarButton({ new: false, refresh: false, search: false, delete: false })
        .clickButton('Insert')
        .enterGridData('EmployeePayGroup', 'Dummy', 'strPayGroup', 'SMOKEGROUP')
        .enterGridData('EmployeePayGroup', 11, 'strDescription', 'New Pay Group Smoke Testing')
        .selectGridComboBoxRowValue('EmployeePayGroup', 11, 'intBankAccountId', 'Commerce Bank', 'intBankAccountId')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Employee Departments', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('premployeedepartment')
        .verifyToolbarButton({ refresh: false, new: false, search: false, delete: false })
        .clickButton('Insert')
        .enterGridData('Department', 'Dummy', 'strDepartment', 'SMOKEDEPT')
        .enterGridData('Department', 13, 'strDescription', 'New Department Smoke Testing')
        .selectGridComboBoxRowValue('Department', 13, 'intProfitCenter', '0000', 'intProfitCenter')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Workers Compensation Codes', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('prworkerscompensationcodes')
        .verifyToolbarButton({ refresh: false, new: false, search: false, delete: false })
        .clickButton('Insert')
        .enterGridData('WorkersCompensationCodes', 'Dummy', 'strWCCode', '7357')
        .enterGridData('WorkersCompensationCodes', 4, 'strDescription', 'New WCC Smoke Testing')
        .enterGridData('WorkersCompensationCodes', 4, 'dblRate', '0.10')
        .selectGridComboBoxRowValue('WorkersCompensationCodes', 4, 'colState', 'Michigan', 'intTypeStateTaxId')
        .selectGridComboBoxRowValue('WorkersCompensationCodes', 4, 'colAccountId', '24800-0002-000', 'intAccountId')
        .selectGridComboBoxRowValue('WorkersCompensationCodes', 4, 'colRateType', 'Per Dollar', 'strCalculationType')
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Employee Templates', 'Screen')
        .selectSearchRowValue('Hourly - Single - Bi Weekly', 'Template Name')
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('premployeetemplate')
        .verifyToolbarButton({ refresh: false })
        .verifyFieldLabel('Text Field', [
            { itemId: 'TemplateName', label: 'Template Name' },
            { itemId: 'TemplateDescription', label: 'Description' }
        ])
        .clickButton('New')
        .enterData('Text Field', 'TemplateName', 'SMOKETEMPLATE')
        .enterData('Text Field', 'TemplateDescription', 'Template for Smoke Testing')
        .clickButton('AddTaxes')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'SMOKETAX'}, {dataIndex: 'strTax', value: 'FIT'},
            {dataIndex: 'strTax', value: 'FUTA'}, {dataIndex: 'strTax', value: 'SUTA'},
            {dataIndex: 'strTax', value: 'FICA MED Company'}, {dataIndex: 'strTax', value: 'FICA MED Employee'},
            {dataIndex: 'strTax', value: 'FICA SS Company'}, {dataIndex: 'strTax', value: 'FICA SS Employee'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .clickTab('Earnings')
        .clickButton('AddEarning')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strEarning', value: 'SMOKEEARN'},
            {dataIndex: 'strEarning', value: 'VAC'},
            {dataIndex: 'strEarning', value: 'OTV'}
        ]) 
        .waitUntilLoaded()
        .clickButton('Ok')
        .selectGridComboBoxRowValue('Earning', 1, 'colEarningsPayGroup', 'SMOKEGROUP', 'strPayGroup')
        .waitUntilLoaded()
        .enterData('Text Field', 'EarningDefaultHours', '40')
        .selectGridComboBoxRowValue('Earning', 2, 'colEarningsPayGroup', 'SMOKEGROUP', 'strPayGroup')
        .selectGridComboBoxRowValue('Earning', 3, 'colEarningsPayGroup', 'SMOKEGROUP', 'strPayGroup')
        .clickTab('Deductions')
        .clickButton('AddDeduction')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            { dataIndex: 'strDeduction', value: 'SMOKEDED'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .clickTab('Time Off')
        .clickButton('AddTimeOff')
        .waitUntilLoaded()
        .verifyScreenShown('praddpayrolltype')
        .selectGridRowValue('Add', [
            {dataIndex: 'strTimeOff', value: 'SMOKETIME'}
        ])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()
        .verifyStatusMessage('Edited')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Employees', 'Screen')
        .selectSearchRowNumber(1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('ementity')
        .verifyToolbarButton({ refresh: true })
        .isControlVisible('Button', 'EmployeeTemplate', true)
        .verifyFieldLabel('Text Field', [
            { itemId: 'Name',label: 'Name'}, 
            { itemId: 'ContactName', label: 'Contact Name'},
            { itemId: 'Location', label: 'Location Name'}
        ])
        .verifyFieldLabel('Combo Box', [{ itemId: 'Timezone', label: 'Time Zone' }])
        .clickTab('Employee')
        .verifyFieldLabel('Text Field', [{ itemId: 'EmployeeSocialSecurity',label: 'Social Security'}])
        .verifyFieldLabel('Date Field', [{ itemId: 'EmployeeHired',label: 'Last Hire Date'}])
        .verifyFieldLabel('Combo Box', [
            {itemId: 'EmployeePayPeriod',label: 'Pay Period'},
            {itemId: 'EmployeeWorkersCompCode',label: 'Workers Comp'}
        ])
        .verifyCheckboxValue('EmployeeActive', true)
        .clickTab('Taxes')
        .selectGridRowValue('EmployeeTaxesEmpTaxes', [{dataIndex: 'strTaxId', value: 'FIT'}])
        .waitUntilLoaded()
        .isControlReadOnly('Text Field', 'EmployeeTaxesTaxExtraWithholding', false)
        .verifyComboBox('EmployeeTaxesTaxLiabilityAccount', function(next, win, grid, store){
            var liabilityacct = store.findExact('strLiabilityAccount');
            if (liabilityacct !== -1) {
                t.ok(true, 'The liability account field is not empty');
            }
            else{
                t.ok(true, 'The liability account field is empty');
            }
            next();
        })
        .verifyComboBox('EmployeeTaxesTaxExpenseAccount', function(next, win, grid, store){
            var expacct = store.findExact('strExpenseAccount');
            if (expacct !== -1) {
                t.ok(true, 'The expense account field is not empty');
            }
            else{
                t.ok(true, 'The expense account field is empty');
            }
            next();
        })
        .selectGridRowValue('EmployeeTaxesEmpTaxes', [{dataIndex: 'strTaxId', value: 'FICA SS Employee'}])
        .waitUntilLoaded()
        .isControlReadOnly('Text Field', 'EmployeeTaxesTaxExtraWithholding', false)
        .verifyComboBox('EmployeeTaxesTaxLiabilityAccount', function(next, win, grid, store){
            var liabilityacct = store.findExact('strLiabilityAccount');
            if (liabilityacct !== -1) {
                t.ok(true, 'The liability account field is not empty');
            }
            else{
                t.ok(true, 'The liability account field is empty');
            }
            next();
        })
        .verifyComboBox('EmployeeTaxesTaxExpenseAccount', function(next, win, grid, store){
            var expacct = store.findExact('strExpenseAccount');
            if (expacct !== -1) {
                t.ok(true, 'The expense account field is not empty');
            }
            else{
                t.ok(true, 'The expense account field is empty');
            }
            next();
        })
        .selectGridRowValue('EmployeeTaxesEmpTaxes', [{dataIndex: 'strTaxId', value: 'FUTA'}])
        .waitUntilLoaded()
        .isControlReadOnly('Text Field', 'EmployeeTaxesTaxExtraWithholding', true)
        .verifyComboBox('EmployeeTaxesTaxLiabilityAccount', function(next, win, grid, store){
            var liabilityacct = store.findExact('strLiabilityAccount');
            if (liabilityacct !== -1) {
                t.ok(true, 'The liability account field is not empty');
            }
            else{
                t.ok(true, 'The liability account field is empty');
            }
            next();
        })
        .verifyComboBox('EmployeeTaxesTaxExpenseAccount', function(next, win, grid, store){
            var expacct = store.findExact('strExpenseAccount');
            if (expacct !== -1) {
                t.ok(true, 'The expense account field is not empty');
            }
            else{
                t.ok(true, 'The expense account field is empty');
            }
            next();
        })
        .clickTab('Deductions')
        .selectGridRowNumber('EmployeeDeduction', 1)
        .verifyComboBox('EmployeeDeductionLiabilityAccount', function(next, win, grid, store){
            var liabilityacct = store.findExact('strLiabilityAccount');
            if (liabilityacct !== -1) {
                t.ok(true, 'The liability account field is not empty');
            }
            else{
                t.ok(true, 'The liability account field is empty');
            }
            next();
        })
        .clickTab('Employee')
        .clickTab('Time Off')
        .selectGridRowNumber('EmployeeTimeOff', 1)
        .waitUntilLoaded()
        .isControlReadOnly('Date Field', 'EmployeeTimeOffLastAwardDate', true)
        .isControlReadOnly('Text Field', 'EmployeeTimeOffHoursAccrued', true)
        .isControlReadOnly('Text Field', 'EmployeeTimeOffHoursEarned', false)
        .isControlReadOnly('Text Field', 'EmployeeTimeOffHoursUsed', false)
        .isControlReadOnly('Text Field', 'EmployeeTimeOffBalance', true)
        .clickTab('Time Entry')
        .verifyFieldLabel('Text Field', [{ itemId: 'EmployeeTimeEntryPassword', label: 'Password'}])
        .verifyGridRecordCount('EmployeeTimeEntryDepartment', 1)
        .verifyGridRecordCount('EmployeeTimeEntrySupervisor', 1)
        .clickButton('Save')

        .clickButton('New')
        .waitUntilLoaded()
        .verifyScreenShown('emcreatenewentity')
        .enterData('Text Field', 'Name', 'Sam M. Oketest')
        .enterData('Text Field', 'Contact', 'Sam M. Oketest')
        .enterData('Text Field', 'Phone', '514-023-7357')
        .enterData('Text Field', 'Email', 'smoketest@smoke.com')
        .addFunction(function(next){
            t.chain(
                { click : "#frmCreateNewEntity #tabCreateNewEntity panel[title=Details] #txtSearchAddress => .x-form-text"},
                { action : "type", options : { shiftKey : true }, text : "Ottawa Beach Road" },
                { mousedown : "span.pac-matched:contains(Ottawa Beach Road)"});
            next();
        })
        .waitUntilLoaded()
        .verifyStatusMessage('Ready')
        .clickButton('Match')
        .waitUntilLoaded()
        .clickButton('Add')
        .enterData('Text Field', 'Location', 'Head Office')
        .enterData('Text Field', 'EntityNumber', 'SMOKETEST')
        .addFunction(function(next){
            t.chain(
                { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-input-field"},
                { action : "type", options : { shiftKey : true }, text : "User" },
        //        { click : "#frmEntity #tabEntity #pnlDetail #tagEntityType => .x-tagfield-input-field"},
                { click : "#frmEntity #tabEntity #pnlDetail #txtAddress => .x-form-item-label"});
            next();
        })
        .waitUntilLoaded()
        .clickButton('Save')
        .waitUntilLoaded()
        .enterData('Text Field', 'UserUsername', 'smoketest')
        .enterData('Text Field', 'UserCurrentPassword', 'smoke123')
        .selectComboBoxRowValue('UserDefaultRole', 'Store Supervisor', 'strUserRoleName',1)
        .selectComboBoxRowValue('SecurityPolicy', 'Default User Policy', 'intSecurityPolicyId',1)
        .clickCheckBox('UserDisabled', true)
        .clickTab('Employee')
        .enterData('Text Field', 'EmployeeFirstName', 'Sam')
        .enterData('Text Field', 'EmployeeMiddleName', 'M.')
        .enterData('Text Field', 'EmployeeLastName', 'Oketest')
        .enterData('Text Field', 'EmployeeTitle', 'Smoke Tester')
        .selectComboBoxRowValue('EmployeePayPeriod', 'Bi-Weekly', 'strPayPeriod',1)
        .enterData('Date Field', 'EmployeeHired', '9/13/2010')
        .selectComboBoxRowValue('EmployeeWorkersCompCode', '7357', 'strWCCode',1)
        .enterData('Text Field', 'EmployeeSocialSecurity', '540-23-7357')
        .selectComboBoxRowValue('EmployeeGender', 'Female', 'Gender',1)
        .clickButton('EmployeeTemplate')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'All information on Taxes, Earnings, Deductions and Time Off will be overridden. Do you want to continue?', 'yesno', 'question')
        .clickMessageBoxButton('yes')
        .waitUntilLoaded()
        .verifyScreenShown('premployeetemplatelist')
        .selectGridRowValue('Template', [{dataIndex: 'strTemplateName', value: 'SMOKETEMPLATE'}])
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitUntilLoaded()
        .clickTab('Employee')
        .clickTab('Earnings')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'SMOKEEARN'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '40')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'OTV'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '8')
        .selectGridRowValue('EmployeeEarning', [{dataIndex: 'strEarningId', value: 'VAC'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeEarningDefaultHours', '8')
        .clickTab('Employee')
        .clickTab('Time Off')
        .selectGridRowValue('EmployeeTimeOff', [{dataIndex: 'strTimeOffId', value: 'SMOKETIME'}])
        .waitUntilLoaded()
        .enterData('Text Field', 'EmployeeTimeOffHoursEarned', '40')
        .clickButton('Save')
        .waitUntilLoaded()
        .clickTab('Employee')
        .clickTab('Time Entry')
        .enterData('Text Field', 'EmployeeTimeEntryPassword', '1234')
        .clickButton('EmployeeTimeOffDepartmentAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntryDepartment', 'Dummy', 'strEmployeeDepartment', 'IT', 'strDepartment')
        .clickButton('EmployeeTimeOffSupervisorAdd')
        .selectGridComboBoxRowValue('EmployeeTimeEntrySupervisor', 'Dummy', 'strEmployeeSupervisorEntityId', 'ACJOHNSON', 'strEmployeeSupervisorEntityId')
        .clickTab('General')
        .clickButton('EntityRequireApprovalInsert')
        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'strScreenName', 'Time Off Requests', 'strScreenName')
        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'strApprovalList', 'iRely Admin', 'strApprovalList')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Close')

        .clickMenuScreen('Paychecks', 'Screen')
        .clickButton('New')
        .verifyScreenShown('search')
        .selectSearchRowValue('SMOKETEST','Employee No.')
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prpaycheck')
        .verifyToolbarButton({ refresh: false })
        .isControlVisible('Button', 'Print', true)
        .isControlVisible('Button', 'Unpost', false)
        .isControlVisible('Button', 'Post', true)
        .isControlVisible('Button', 'BankInfo', true)
        .isControlVisible('Button', 'Employee', true)
        .isControlVisible('Button', 'Recalc', true)
        .selectComboBoxRowValue('BankNumber', 'Commerce Bank', 'intBankAccountId',1)
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickButton('Post')
        .waitUntilLoaded()
        .verifyStatusMessage('Posted')
        .verifyToolbarButton({ refresh: false, save: false, delete: false, undo: false })
        .isControlVisible('Button', 'Print', true)
        .isControlVisible('Button', 'Unpost', true)
        .isControlVisible('Button', 'BankInfo', true)
        .isControlVisible('Button', 'Employee', true)
        .isControlDisable('Button',['Save', 'Delete', 'Undo', 'Recalc'], true)
        .clickButton('Print')
        .waitUntilLoaded()
        .verifyScreenShown('cmprintchecks')
        .verifyGridRecordCount('PrintChecks', 1)
        .clickButton('Close')
        .clickButton('Close')

        .clickMenuScreen('Process Pay Groups', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('prprocesspaygroup')
        .verifyToolbarButton({ refresh: false, new: false, search: false, delete: false })
        .isControlVisible('Button', 'Process', true)
        .isControlVisible('Button', 'Import', true)
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'strPayGroup', text: 'Pay Group'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'strDescription', text: 'Description'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'intBankAccountId', text: 'Bank Account'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'dtmBeginDate', text: 'Begin Date'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'dtmEndDate', text: 'End Date'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'dtmPayDate', text: 'Paycheck Date'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'dblHolidayHours', text: 'Override Hours'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'ysnStandardHours', text: 'Use Default Hours'}])
        .verifyGridColumnNames('EmployeePayGroup', [{dataIndex: 'ysnExcludeDeductions', text: 'Exclude Deductions'}])
        .selectGridRowNumber('EmployeePayGroup', 1)
        .verifyGridData('EmployeePayGroup', 1, 'strPayGroup', 'SMOKEGROUP')
        .selectGridComboBoxRowValue('EmployeePayGroup', 1, 'colBankAccount', 'Commerce Bank', 'intBankAccountId')
        .enterGridData('EmployeePayGroup', 1, 'dtmBeginDate', '10/18/2016')
        .enterGridData('EmployeePayGroup', 1, 'dtmEndDate', '10/18/2016')
        .enterGridData('EmployeePayGroup', 1, 'dtmPayDate', '10/18/2016')
        .clickGridCheckBox('EmployeePayGroup',1 , 'strPayGroup', 'SMOKEGROUP', 'ysnStandardHours', true)
        .clickButton('Save')
        .waitUntilLoaded()
        .clickButton('Generate')
        .waitUntilLoaded()
        .clickButton('Process')
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyScreenShown('premployeetoprocess')
        .clickButton('Ok')
        .waitTillLoaded('',10000)
        .clickButton('Close')

        .clickMenuScreen('Batch Posting', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('prbatchposting')
        .verifyToolbarButton({ refresh: false, new: false, save: false, search: false, delete: false, undo: false })
        .isControlVisible('Button', 'Post', true)
        .selectGridRowValue('BatchPostingDetail', [
            { dataIndex: 'strEmployeeId', value: 'SMOKETEST'}
        ])
        .clickButton('Post')
        .waitUntilLoaded()
        .waitUntilLoaded()        
        .verifyScreenShown('prbatchpostingresult')
        .verifyGridData('BatchPostingResults', 1, 'strMessage', 'Transaction posted successfully!')
        .clickButton('Close')
        .waitUntilLoaded()
        .clickButton('Close')

        .clickMenuScreen('Paychecks', 'Screen')
        .waitUntilLoaded()
        .selectSearchRowValue('SMOKETEST', 'Employee No.',1,1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prpaycheck')
        .verifyToolbarButton({ refresh: false, save: false, delete: false, undo: false })
        .isControlVisible('Button', 'Print', true)
        .isControlVisible('Button', 'Unpost', true)
        .isControlVisible('Button', 'BankInfo', true)
        .isControlVisible('Button', 'Employee', true)
        .isControlDisable('Button',['Save', 'Delete', 'Undo', 'Recalc'], true)
        .clickButton('Close')

        .clickMenuScreen('Process Paychecks', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('cmprintchecks')
        .verifyToolbarButton({ refresh: false, new: false, save: false, search: false, delete: false, undo: false })
        .isControlVisible('Button', 'Preview', true)
        .waitUntilLoaded()
        .selectComboBoxRowValue('BankAccount', 'Commerce Bank', 'intBankAccountId',2)
        .clickButton('PrintChecksClearAll')
        .selectGridRowValue('PrintChecks', [{ dataIndex: 'strPayee', value: 'Sam M. Oketest' }])
        .clickGridCheckBox('PrintChecks',1 , 'strPayee', 'Sam M. Oketest', 'ysnCheckToBePrinted', true)
        .clickButton('Preview')
        .waitUntilLoaded()
        .verifyScreenShown('srreportscreen')
        .waitUntilLoaded('srreportscreen')
        .waitUntilLoaded()
        .waitUntilLoaded()
        .clickButton('Close')
        .waitUntilLoaded()
        .clickButton('Close')

        .clickMenuScreen('Timecards', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('prtimecard')
        .verifyToolbarButton({ refresh: false, new: false, save: false, search: false, delete: false, undo: false })
        .verifyFieldLabel('Text Field', [
            { itemId: 'Password', label: 'Password' },
            { itemId: 'Name', label: 'Name' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'EmployeeNumber', label: 'Employee No' },
            { itemId: 'Department', label: 'Department' },
            { itemId: 'JobCode', label: 'Job Code' }
        ])
        .verifyFieldLabel('Date Field', [
            { itemId: 'Date', label: 'System Date' },
            { itemId: 'Time', label: 'Time' },
            { itemId: 'DateIn', label: 'Date In' },
            { itemId: 'DateOut', label: 'Date Out' },
            { itemId: 'TimeIn', label: 'Time In' },
            { itemId: 'TimeOut', label: 'Time Out' }
        ])
        .selectComboBoxRowValue('EmployeeNumber','SMOKETEST','Employee No.',1)
        .enterData('Text Field', 'Password', '12345')
        .isControlDisable('Button','Save', true)
        .enterData('Text Field', 'Password', '1234')
        .isControlDisable('Button','Save', false)
        .selectComboBoxRowNumber('Department', 1)
        .selectComboBoxRowNumber('JobCode', 1)
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Login Successful!','ok','information')
        .clickMessageBoxButton('ok')

        .clickMenuScreen('Timecards', 'Screen')
        .waitUntilLoaded()
        .selectComboBoxRowValue('EmployeeNumber','SMOKETEST','Employee No.',1)
        .enterData('Text Field', 'Password', '1234')
        .isControlDisable('Button','Save', false)
        .selectComboBoxRowNumber('Department', 1)
        .selectComboBoxRowNumber('JobCode', 1)
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Logout Successful!','ok','information')
        .clickMessageBoxButton('ok')
        
        .waitUntilMainMenuLoaded()
        .clickMenuScreen('Time Off Requests', 'Screen')
        .waitUntilLoaded()
        .selectSearchRowNumber(1)
        .clickButton('OpenSelected')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyToolbarButton({ refresh: false })
        .verifyFieldLabel('Text Field', [
            { itemId: 'RequestNo', label: 'Request No' },
            { itemId: 'Name', label: 'Name' },
            { itemId: 'RequestHours', label: 'Request Hours' },
            { itemId: 'Earned', label: 'Earned to date' },
            { itemId: 'Used', label: 'Used to date' },
            { itemId: 'Balance', label: 'Balance to date' },
            { itemId: 'Reason', label: 'Reason' },
            { itemId: 'Address', label: 'Address while on Time Off' }
        ])
        .verifyFieldLabel('Combo Box', [
            { itemId: 'EmployeeNo', label: 'Employee No' },
            { itemId: 'Department', label: 'Department' },
            { itemId: 'TimeOff', label: 'Time Off ID' }
        ])
        .verifyFieldLabel('Date Field', [
            { itemId: 'DateFrom', label: 'Date From' },
            { itemId: 'DateTo', label: 'Date To' },
            { itemId: 'RequestDate', label: 'Date' }
        ])
        .isControlReadOnly('Text Field', ['Name', 'Earned', 'Used', 'Balance'], true)
        .isControlReadOnly('Date Field', 'RequestDate', true)
        .clickButton('Close')

        .clickButton('New')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeoffrequest')
        .verifyStatusMessage('Ready')
        .selectComboBoxRowValue('EmployeeNo', 'SMOKETEST', 'Employee No.',1)
        .verifyData('Text Field', 'Name', 'Sam M. Oketest')
        .verifyData('Text Field', 'RequestNo', '')
        .verifyData('Date Field', 'DateFrom', expDATE)
        .verifyData('Date Field', 'DateTo', expDATE)
        .enterData('Date Field', 'DateFrom', newDATE)
        .enterData('Date Field', 'DateTo', newDATE)
        .selectComboBoxRowNumber('Department', 1)
        .verifyData('Date Field', 'RequestDate', TODAY)
        .selectComboBoxRowValue('TimeOff', 'SMOKETIME', 'Time Off ID',1)
        .enterData('Text Field', 'RequestHours', '9')
        .waitUntilLoaded()
        .enterData('Text Field', 'Reason', 'Smoke Time Off Request')
        .enterData('Text Field', 'Address', '1234 Smoke St., MI')
        .clickButton('Save')
        .waitUntilLoaded()
        .waitUntilLoaded()
        .verifyMessageBox('iRely i21', 'Do you want to Submit this transaction for approval?', 'yesno', 'question')
        .clickMessageBoxButton('yes')
        .clickMessageBoxButton('ok')
        .waitUntilLoaded()
        .verifyStatusMessage('Waiting for Approval')
        .clickButton('Close')

        .clickMenuScreen('Time Approval', 'Screen')
        .waitUntilLoaded()
        .verifyScreenShown('prtimeapproval')
        .verifyToolbarButton({ refresh: false, new: false, search: false, delete: false })
        .verifyFieldLabel('Combo Box', [{ itemId: 'Department', label: 'Department' }])
        .verifyFieldLabel('Date Field', [
            { itemId: 'DateFrom', label: 'Date From' },
            { itemId: 'DateTo', label: 'Date To' },
            { itemId: 'PayDate', label: 'Pay Date' }
        ])
        .verifyData('Date Field', 'DateFrom', TODAY)
        .verifyData('Date Field', 'DateTo', TODAY)
        .verifyData('Date Field', 'PayDate', '')        
        .selectComboBoxRowValue('Department', 'IT', 'Department',2)
        .waitUntilLoaded()
        .verifyGridData('TimeApproval', 1, 'dtmDate', TODAY)
        .verifyGridData('TimeApproval', 1, 'strDepartment', 'IT')
        .verifyGridData('TimeApproval', 1, 'strEarningId', 'SMOKEEARN')
        .verifyGridData('TimeApproval', 1, 'dtmDateIn', TODAY)
        .verifyGridData('TimeApproval', 1, 'dtmDateOut', TODAY)
        .enterGridData('TimeApproval', 1, 'dtmTimeInUtc', '8:17 AM')
        .enterGridData('TimeApproval', 1, 'dtmTimeOutUtc', '5:33 PM')
        .clickButton('Save')
        .waitUntilLoaded()
        .verifyScreenShown('prtimecardedit')
        .enterData('Text Field', 'EnterReason', 'SMOKE Time Approval Reason')
        .clickButton('OK')
        .waitUntilLoaded()
        .verifyStatusMessage('Saved')
        .clickGridCheckBox('TimeApproval', 1, 'dtmDate', TODAY, 'ysnApproved', true)
        .verifyGridData('TimeApproval', 1,'dblHours', 9.27)
        .verifyGridData('TimeApproval', 1, 'strApprovedUserId', 'irelyadmin')
        .verifyGridData('TimeApproval', 1, 'dtmApproved', TODAY)
        .verifyGridData('TimeApproval', 1, 'strLastModifiedUserId', 'irelyadmin')
        .verifyGridData('TimeApproval', 1, 'dtmLastModified', TODAY)
        .verifyGridData('TimeApproval', 1, 'strNotes', 'SMOKE Time Approval Reason')
        .enterData('Date Field', 'PayDate', TODAY)
        .clickButton('Process')
        .clickMessageBoxButton('ok')
        .clickButton('Close')

        .done();
});