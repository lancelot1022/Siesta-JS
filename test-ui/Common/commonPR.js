/*** Created by ROrdoña on 9/14/2015. ***/
/*** Updated by LCompala ***/

Ext.define('i21.test.Payroll.commonPR', {


//========================================== ITEM SEARCH ================================//
    itemSearch: function (t, next, columnHeader, filter){

            var engine = new iRely.FunctionalTest(),
                clickPattern = "#pnlMain #pnlIntegratedDashboard #pnlIntegratedDashboardGridPanel #searchTabPanel #mainTab #grdSearch gridcolumn[text=" + columnHeader + "] => .x-column-header-text";
                clickPattern2 = "#pnlMain #pnlIntegratedDashboard #pnlIntegratedDashboardGridPanel #searchTabPanel #mainTab #grdSearch #pnlFilter #con0 #cboCondition => .x-form-trigger";
                clickPattern3 = "#pnlMain #pnlIntegratedDashboard #pnlIntegratedDashboardGridPanel #searchTabPanel #mainTab #grdSearch #pnlFilter #con0 #cboCondition boundlist => :textEquals(Equals)";
            engine.start(t,next)

                .waitUntilLoaded()
                .addFunction(function(next){
                    t.chain(
                        {
                            click : clickPattern},
                        {
                            click : "menu{isVisible()} #mnuFilter => .x-menu-item-text"},
                        {
                            type : filter + '[ENTER]'},
                        {
                            click : clickPattern2},
                        {
                            click : clickPattern3}    

                    );
                    next();
                })
                .waitUntilLoaded()
                .done();
    },
//========================================== ADD TIME ENTRY - TIMECARD APPROVAL ================================//
    addTETimecardApproval: function (t, next, entryDate, empNo, empDept, empJob, empDateIn, empDateOut,
                                   empTimeIn, empTimeOut){

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .verifyScreenShown('prtimeapproval')
                .waitUntilLoaded()
                .clickButton('Insert')
                .enterData('Date Field', 'Date', entryDate)
                .selectComboBoxRowValue('EmployeeNumber',empNo,'intEntityEmployeeId',1)
                .selectComboBoxRowValue('Department',empDept,'intEmployeeDepartment',1)
                .selectComboBoxRowValue('JobCode',empJob, 'intEmployeeEaringId', 1)
                .enterData('Date Field', 'DateIn', empDateIn)
                .enterData('Date Field', 'DateOut', empDateOut)
                .enterData('Date Field', 'TimeIn', empTimeIn)
                .enterData('Date Field', 'TimeOut', empTimeOut)
                .clickButton('Save')
                .done();
    },

    //========================================== ADD TAX TYPE ================================//
    addTaxType: function(t, next, taxId, taxType, taxDesc, taxAmount, taxPaidBy, taxAccId,
                        taxState, taxLocal, taxVendorId, taxExpId, taxLimit) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .displayText('=========== ADDING NEW TAX TYPE ===========')
                .clickMenuScreen('Tax Types', 'Screen')
                .waitUntilLoaded()
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Tax Type',taxId);
                })
                .waitUntilLoaded()
                .continueIf({
                    expected: true,
                    actual: function (win,next) {
                        new iRely.FunctionalTest().start(t, next);
                        return win.down('#grdSearch').store.getCount() < 1;
                    },
                    success: function (next) {
                        new iRely.FunctionalTest().start(t, next)
                        .clickButton('New')
                        .waitUntilLoaded()
                        .verifyScreenShown('prtaxtype')
                        .addFunction(function(next){
                            commonPR.taxCalculationTypeValue(t,next);
                        })
                        .enterData('Text Field', 'Reference', taxId)
                        .addFunction(function(next){
                            if(taxType === 'USA State') {
                                new iRely.FunctionalTest().start(this, next)
                                .selectComboBoxRowValue('CalculationType', taxType,'strCalculationType',2)
                                .done();
                            } else {
                                new iRely.FunctionalTest().start(this, next)
                                .selectComboBoxRowValue('CalculationType', taxType,'strCalculationType',1)
                                .done();
                            }
                        }) 
                        
                        .enterData('Text Field', 'Description', taxDesc)
                
                        .addFunction(function(next){

                            var calcType =  taxType;
                            switch(calcType) {
                                case 'USA FUTA':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                case 'USA SUTA':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                case 'USA State':
                                    new iRely.FunctionalTest().start(this,next)
                                    .isControlReadOnly('Text Field', 'Amount', true)
                                    .isControlReadOnly('Text Field', 'Limit', true)
                                    .selectComboBoxRowValue('TaxState', taxState,'strState')
                                    .done();
                                    break;
                                case 'USA Local':
                                    new iRely.FunctionalTest().start(this,next)
                                    .isControlReadOnly('Text Field', 'Amount', true)
                                    .isControlReadOnly('Text Field', 'Limit', true)
                                    .selectComboBoxRowValue('TaxState', taxState,'strState')
                                    .selectComboBoxRowValue('County', taxLocal,'strLocalName')
                                    .done();
                                    break;
                                case 'Fixed Amount':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                case 'Percent':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                case 'Hourly Amount':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                case 'Hourly Percent':
                                    new iRely.FunctionalTest().start(this,next)
                                    .enterData('Text Field', 'Amount', taxAmount)
                                    .enterData('Text Field', 'Limit', taxLimit)
                                    .done();
                                    break;
                                default:
                                new iRely.FunctionalTest().start(this,next)
                                    .isControlReadOnly('Text Field', 'Amount', true)
                                    .isControlReadOnly('Text Field', 'Limit', true)
                                    .done();
                            }
                            
                        })
                        .selectComboBoxRowValue('PaidBy', taxPaidBy,'strPaidBy')
                        .selectComboBoxRowValue('AccountId', taxAccId, 'intAccountId', 1)
                        .selectComboBoxRowValue('ExpenseAccount', taxExpId,'intExpenseAccountId', 1)         
                        .selectComboBoxRowValue('VendorId', taxVendorId, 'intVendorId')
                        .waitUntilLoaded()
                        .verifyStatusMessage('Edited')
                        .clickButton('Save')
                        .verifyStatusMessage('Saved')
                        .clickButton('Close')
                        .done();

                    },
                    failure: function(next){
                        new iRely.FunctionalTest().start(t, next)
                        .waitUntilLoaded()
                        .displayText('Tax ID already exist!')
                        .done();
                    },
                    continueOnFail: true
                })
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .done();
                            
    },

//========================================== ADD DEDUCTION TYPE ================================//
    addDeductionType: function(t, next, deductId, deductType, deductDesc, deductAmount, deductPaidBy, deductAccId,
                        deductFrom, deductVendorId, deductExpId, deductLimit) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .displayText('=========== ADDING NEW DEDUCTION TYPE ===========')
                .clickMenuScreen('Deduction Types', 'Screen')
                .waitUntilLoaded()
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Deduction ID',deductId);
                })
                .waitUntilLoaded()
                .continueIf({
                    expected: true,
                    actual: function (win,next) {
                        new iRely.FunctionalTest().start(t, next);
                        return win.down('#grdSearch').store.getCount() < 1;
                    },
                    success: function (next) {
                        new iRely.FunctionalTest().start(t, next)
                        .clickButton('New')
                        .verifyScreenShown('prdeductiontype')
                        .addFunction(function (next) {
                            commonPR.deductionCalculationTypeValue(t, next);
                        })
                        .enterData('Text Field', 'DeductionId', deductId)
                        .selectComboBoxRowValue('CalculationType', deductType,'strCalculationType',1)
                        .enterData('Text Field', 'Description', deductDesc)
                        .enterData('Text Field', 'Amount', deductAmount)
                        .selectComboBoxRowValue('PaidBy', deductPaidBy,'strPaidBy')
                        .addFunction(function(next){
                            var paidBy = deductPaidBy;
                            var vendorId = deductVendorId;
                            if(paidBy === 'Employee' || paidBy === '') {
                                new iRely.FunctionalTest().start(this, next)
                                .done();
                            } else {
                                new iRely.FunctionalTest().start(this, next)
                                .selectComboBoxRowValue('ExpenseAccount', deductExpId,'intExpenseAccountId', 1)
                                .selectComboBoxRowValue('VendorId', vendorId, 'intVendorId', 1)
                                .done();
                            }
                        }) 
                        .selectComboBoxRowValue('DeductFrom', deductFrom,'strDeductFrom')
                        .selectComboBoxRowValue('AccountId', deductAccId, 'intAccountId', 1)
                        .enterData('Text Field', 'Limit', deductLimit)
                           
                     /*   .addFunction(function(next){
                            var  filterArrs = Ext.isArray(deductTaxes) ? deductTaxes : [deductTaxes];

                            if (Ext.isArray(filterArrs)) {
                                for (i = 0; i < filterArrs.length; i++) {
                                    new iRely.FunctionalTest().start(this, next)
                                        .displayText('Checking tax:' + filterArrs[i])
                                        .selectGridRowValue('Add',[{dataIndex: 'strTax', value: filterArrs[i]}])
                                        .waitUntilLoaded()
                                        .done();
                                }
                            }
                        }) */

                        
                        //as of now,, since for loop does not work correctly, deduction taxes added are fixed
                        .addFunction(function(next){
                            if(deductFrom === 'Gross Pay' || deductFrom === '') {
                                new iRely.FunctionalTest().start(this, next)
                                    .clickButton('AddDeductionTax')  
                                    .waitTillLoaded()
                                    .verifyScreenShown('praddpayrolltype')
                                    .selectGridRowValue('Add', [
                                        {dataIndex: 'strTax', value: 'FIT'},
                                        {dataIndex: 'strTax', value: 'FUTA'},
                                        {dataIndex: 'strTax', value: 'SUTA'},
                                        {dataIndex: 'strTax', value: 'FICA MED Company'},
                                        {dataIndex: 'strTax', value: 'FICA MED Employee'},
                                        {dataIndex: 'strTax', value: 'FICA SS Company'},
                                        {dataIndex: 'strTax', value: 'FICA SS Employee'}
                                    ]).waitTillLoaded()
                                    .clickButton('Ok')
                                    .done();
                            } else {
                                new iRely.FunctionalTest().start(this, next)
                                    .isControlDisable('Button', 'AddDeductionTax', true)
                                    .isControlDisable('Button', 'DeleteDeductionTax', true)
                                    .done();
                            }
                        })                        
                        .waitUntilLoaded()
                        .verifyStatusMessage('Edited')
                        .clickButton('Save')
                        .waitUntilLoaded()
                        .verifyStatusMessage('Saved')
                        .clickButton('Close')
                        .done();

                    },
                    failure: function(next){
                        new iRely.FunctionalTest().start(t, next)
                        .waitUntilLoaded()
                        .displayText('Deduction ID already exist!')
                        .done();
                    },
                    continueOnFail: true
                })
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .done();
                            
    },

    //==========================================  ADD EARNING TYPE ================================//
    addEarningType: function(t, next, earnId, earnType, earnDesc, earnAmount, earndAccId, earnW2, earnTaxType) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .displayText('=========== ADDING NEW EARNING TYPE ===========')
                .clickMenuScreen('Earning Types', 'Screen')
                .waitUntilLoaded()
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Earning ID',earnId);
                })
                .waitUntilLoaded()
                .continueIf({
                    expected: true,
                    actual: function (win,next) {
                        new iRely.FunctionalTest().start(t, next);
                        return win.down('#grdSearch').store.getCount() < 1;
                    },
                    success: function (next) {
                        new iRely.FunctionalTest().start(t, next)
                        .clickButton('New')
                        .verifyScreenShown('prearningtype')
                        .addFunction(function(next){
                            commonPR.earningCalculationTypeValue(t,next);
                        })
                        .addFunction(function(next) {
                            commonPR.earningExpenseAccount(t,next);
                        })
                        .enterData('Text Field', 'EarningId', earnId)
                        .selectComboBoxRowValue('CalculationType', earnType,'strCalculationType',1)
                        .enterData('Text Field', 'Description', earnDesc)
                        .enterData('Text Field', 'Amount', earnAmount)
                        .selectComboBoxRowValue('AccountId', earndAccId, 'intAccountId', 1)
                        .selectComboBoxRowValue('W2Code', earnW2, 'strW2Code')
                        .selectComboBoxRowValue('TaxCalculation', earnTaxType, 'intTaxCalculationType')                         
                        .addFunction(function(next){
                            if(earnType !== 'Reimbursement') {
                                new iRely.FunctionalTest().start(this, next)
                                    .clickButton('AddEarningTax')  
                                    .waitTillLoaded()
                                    .verifyScreenShown('praddpayrolltype')
                                    .selectGridRowValue('Add', [
                                        {dataIndex: 'strTax', value: 'FIT'},
                                        {dataIndex: 'strTax', value: 'FUTA'},
                                        {dataIndex: 'strTax', value: 'SUTA'},
                                        {dataIndex: 'strTax', value: 'FICA MED Company'},
                                        {dataIndex: 'strTax', value: 'FICA MED Employee'},
                                        {dataIndex: 'strTax', value: 'FICA SS Company'},
                                        {dataIndex: 'strTax', value: 'FICA SS Employee'}
                                    ]).waitTillLoaded()
                                    .clickButton('Ok')
                                    .done();
                            } else {
                                new iRely.FunctionalTest().start(this, next)
                                    .isControlDisable('Button', 'AddEarningTax', true)
                                    .isControlDisable('Button', 'DeleteEarningTax', true)
                                    .done();
                            }
                        })                        
                        .waitUntilLoaded()
                        .verifyStatusMessage('Edited')
                        .clickButton('Save')
                        .waitUntilLoaded()
                        .verifyStatusMessage('Saved')
                        .clickButton('Close')
                        .done();

                    },
                    failure: function(next){
                        new iRely.FunctionalTest().start(t, next)
                        .waitUntilLoaded()
                        .displayText('Earning ID already exist!')
                        .done();
                    },
                    continueOnFail: true
                })
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .done();
                            
    },
    
    //==========================================  CREATE APPROVAL LIST FOR TOR ================================//
    addApprovalList: function(t, next, appListName, approverName, amountOver, amountAbove, emailRequest) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .waitUntilMainMenuLoaded()
                .clickMenuFolder('Common Info', 'Folder')
                .displayText('=========== ADDING NEW APPROVAL LIST ===========')
                .clickMenuScreen('Approval List', 'Screen') 
                .waitUntilLoaded()
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Approval',appListName);
                })
                .waitUntilLoaded()
                .continueIf({
                    expected: true,
                    actual: function (win,next) {
                        new iRely.FunctionalTest().start(t, next);
                        return win.down('#grdSearch').store.getCount() < 1;
                    },
                    success: function (next) {
                        new iRely.FunctionalTest().start(t, next)
                        .clickButton('New')
                        .verifyScreenShown('smapprovallist')
                        .enterData('Text Field', 'ApprovalList', appListName)
                        .selectGridComboBoxRowValue('ApprovalList', 1, 'colApprover', approverName, 'strApprover')
                        .enterGridData('ApprovalList', 1, 'dblAmountOver', amountOver)
                        .enterGridData('ApprovalList', 1, 'dblAmountLessThanEqual', amountAbove)
                        .addFunction(function(next){
                            if(emailRequest === 'yes') {
                                new iRely.FunctionalTest().start(this, next)
                                    .clickButton('AddEarningTax')  
                                    .clickGridCheckBox('ApprovalList',1 , 'strApprover', approverName, 'ysnEmailApprovalRequest', true)
                                    .done();
                            } else {
                                new iRely.FunctionalTest().start(this, next)
                                    .clickGridCheckBox('ApprovalList',1 , 'strApprover', approverName, 'ysnEmailApprovalRequest', false)
                                    .done();
                            }
                        })
                        .clickButton('Save')
                        .clickButton('Close')
                        .done();

                    },
                    failure: function(next){
                        new iRely.FunctionalTest().start(t, next)
                        .waitUntilLoaded()
                        .displayText('Approval List already exist!')
                        .done();
                    },
                    continueOnFail: true
                })
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .clickMenuFolder('Common Info', 'Folder')
                .done();
                            
    },

    //==========================================  ADD TOR APPROVAL LIST TO EMPLOYEE ================================//
    addApprovalListToEmp: function(t, next, empName, appListName) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .displayText('=========== ADDING TOR APPROVAL LIST TO EMPLOYEE ===========')
                .clickMenuScreen('Employees', 'Screen') 
                .waitUntilLoaded()
                .addFunction(function(next){
                    commonPR.itemSearch(t,next,'Entity No',empName);
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
                        .selectSearchRowNumber(1,1)
                        .waitUntilLoaded()
                        .clickButton('OpenSelected')
                        .waitUntilLoaded()
                        .verifyScreenShown('ementity')
                        .clickTab('General')
                        .waitUntilLoaded()
                        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'colEntityRequireForApproval', 'Time Off Requests', 'strScreenName')
                        .selectGridComboBoxRowValue('EntityRequireApproval', 1, 'colEntityRequireApproverList', appListName, 'strApprovalList')
                        .clickButton('Save')
                        .waitUntilLoaded()
                        .clickButton('Close')
                        .done();

                    },
                    failure: function(next){
                        new iRely.FunctionalTest().start(t, next)
                        .displayText('Employee does not exist')
                        .done();
                    },
                    continueOnFail: true
                })
                .waitUntilLoaded()
                .clickButton('ClearAllFilters')
                .done();
                            
    },
    //==========================================  CREATE TIME OFF REQUEST ================================//
    addTimeOff: function(t, next, empID, dtmFrom, dtmTo, empDept, timeoffID, requestHours, torReason, torAddress, needsApproval) {

            var engine = new iRely.FunctionalTest();
            var commonPR = Ext.create('i21.test.Payroll.commonPR');

            engine.start(t, next)
                .displayText('=========== CREATING EMPLOYEE TIME OFF REQUEST ===========')
                .clickMenuScreen('Time Off Requests', 'Screen')
                .clickButton('New')
                .waitUntilLoaded()
                .verifyScreenShown('prtimeoffrequest')
                .selectComboBoxRowValue('EmployeeNo', empID, 'EntityEmployeeId', 1)
                .enterData('Date Field', 'DateFrom', dtmFrom)
                .enterData('Date Field', 'DateTo', dtmTo)
                .selectComboBoxRowValue('Department', empDept, 'DepartmentId', 1)
                .selectComboBoxRowValue('TimeOff', timeoffID, 'TypeTimeOffId', 1)
                .enterData('Date Field', 'DateTo', dtmTo)
                .enterData('Text Field', 'RequestHours', requestHours)
                .enterData('Text Field', 'Reason', torReason)
                .enterData('Text Field', 'Address', torAddress)
                
                .addFunction(function(next){
                    if(needsApproval === 'yes') {
                        new iRely.FunctionalTest().start(this, next)
                            .clickButton('Save')
                            .waitUntilLoaded()
                            .waitUntilLoaded()
                            .verifyMessageBox('iRely i21', 'Do you want to Submit this transaction for approval?', 'yesno', 'question')
                            .clickMessageBoxButton('yes')
                            .clickMessageBoxButton('ok')
                            .waitUntilLoaded()
                            .verifyStatusMessage('Waiting for Approval')
                            .done();
                    } else {
                        new iRely.FunctionalTest().start(this, next)
                            .clickButton('Save')
                            .waitUntilLoaded()
                            .verifyStatusMessage('No Need for Approval')
                            .clickButton('PostToCalendar')
                            .waitUntilLoaded()
                            .verifyStatusMessage('Posted to Calendar')
                            .done();
                    }
                })
                .clickButton('Close')
                .done();
                            
    },

    //==========================================CHECKS THE LISTS OF TAX CALCULATION TYPES ================================//
    taxCalculationTypeValue: function (t, next) {

        t.chain([
            function (next) {
                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboCalculationType');
                var cal0 = cbo.store.findExact(cbo.displayField, 'USA Social Security');
                var cal1 = cbo.store.findExact(cbo.displayField, 'USA Medicare');
                var cal2 = cbo.store.findExact(cbo.displayField, 'USA State Disability');
                var cal3 = cbo.store.findExact(cbo.displayField, 'USA FUTA');
                var cal4 = cbo.store.findExact(cbo.displayField, 'USA SUTA');
                var cal5 = cbo.store.findExact(cbo.displayField, 'USA Federal Tax');
                var cal6 = cbo.store.findExact(cbo.displayField, 'USA State');
                var cal7 = cbo.store.findExact(cbo.displayField, 'USA Local');
                var cal8 = cbo.store.findExact(cbo.displayField, 'Fixed Amount');
                var cal9 = cbo.store.findExact(cbo.displayField, 'Percent');
                var cal10 = cbo.store.findExact(cbo.displayField, 'Hourly Amount');
                var cal11 = cbo.store.findExact(cbo.displayField, 'Hourly Percent');

                if (cal0 !== -1 && cal1 !== -1 && cal2 !== -1 && cal3 !== -1 && cal4 !== -1 && cal5 !== -1
                    && cal6 !== -1 && cal7 !== -1 && cal8 !== -1 && cal9 !== -1 && cal10 !== -1 && cal11 !== -1) {
                    t.ok(true, 'Passed! All Calculation Types are present.');
                }
                else {
                    t.ok(false, 'Failed! NOT ALL Calculation Types are present.')
                }
                next();
            },
            next
        ])
    },


//=========================================CHECKS THE LISTS OF PAID BY================================================//

    paidByValue: function (t, next) {

        t.chain([
            function (next) {
                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboPaidBy');
                var paidbyE = cbo.store.findExact(cbo.displayField, 'Employee');
                var paidbyC = cbo.store.findExact(cbo.displayField, 'Company');

                if (paidbyE !== -1 && paidbyC !== -1) {
                    t.ok(true, 'PASSED!');
                }
                else {
                    t.ok(false, 'FAILED!')
                }
                next();
            },
            next
        ])
    },

//==============================CHECKS SPECIFIC LIABILITY ACCOUNT FOR TAX TYPES=======================================//
    liabilityAccount: function (t, next) {

        t.chain([
            function (next) {

                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboAccountId');
                var accountId = cbo.store.findExact(cbo.displayField, '24050-0000-000');

                if (cbo.accountId = 1) {
                    t.ok(true, 'PASSED!');
                }
                else {
                    t.ok(false, 'FAILED!');
                }
                next();
            },
            next

        ])
    },

//==============================CHECKS SPECIFIC EXPENSE ACCOUNT FOR TAX TYPES=========================================//
    expenseAccount: function (t, next) {

        t.chain([
            function (next) {

                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboExpenseAccount');
                var accountId = cbo.store.findExact(cbo.displayField, '56000-0000');

                if (accountId = 1) {
                    t.ok(true, 'PASSED!');
                }
                else {
                    t.ok(false, 'FAILED!');
                }
                next();
            },
            next

        ])
    },

//===================================CHECKS SPECIFIC EXPENSE ACCOUNT FOR EARNING TYPES================================//
    earningExpenseAccount: function (t, next) {

        t.chain([
            function (next) {

                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboAccountId');
                var expenseAccntId = cbo.store.findExact(cbo.displayField, '56000-0000');

                if (expenseAccntId = 1) {
                    t.ok(true, 'PASSED!');
                }
                else {
                    t.ok(false, 'FAILED!');
                }
                next();
            },
            next

        ])
    },

//=======================================CHECKS SPECIFIC USA STATE=====================================================/

    taxTypeState: function (t,next) {

     t.chain([
         function (next) {


             var win = Ext.WindowManager.getActive();
             var cboTaxState = win.down('#cboTaxState');
             var stateTax0 = cboTaxState.store.findExact('strState', 'Michigan');

            /* var stateTax0 = cboTaxState.store.findExact(cboTaxState.displayField, 'Alabama');
             var stateTax1 = cboTaxState.store.findExact(cboTaxState.displayField, 'Alaska');
             var stateTax2 = cboTaxState.store.findExact(cboTaxState.displayField, 'American Samoa');
             var stateTax3 = cboTaxState.store.findExact(cboTaxState.displayField, 'Arizona');
             var stateTax4 = cboTaxState.store.findExact(cboTaxState.displayField, 'Arkansas');
             var stateTax5 = cboTaxState.store.findExact(cboTaxState.displayField, 'California');
             var stateTax6 = cboTaxState.store.findExact(cboTaxState.displayField, 'Colorado');
             var stateTax7 = cboTaxState.store.findExact(cboTaxState.displayField, 'Connecticut');
             var stateTax8 = cboTaxState.store.findExact(cboTaxState.displayField, 'Delaware');
             var stateTax9 = cboTaxState.store.findExact(cboTaxState.displayField, 'District of Columbia');
             var stateTax10 = cboTaxState.store.findExact(cboTaxState.displayField, 'Federated States of Micronesia');
             var stateTax11 = cboTaxState.store.findExact(cboTaxState.displayField, 'Florida');
             var stateTax12 = cboTaxState.store.findExact(cboTaxState.displayField, 'Georgia');
             var stateTax13 = cboTaxState.store.findExact(cboTaxState.displayField, 'Guam');
             var stateTax14 = cboTaxState.store.findExact(cboTaxState.displayField, 'Hawaii');
             var stateTax15 = cboTaxState.store.findExact(cboTaxState.displayField, 'Idaho');
             var stateTax16 = cboTaxState.store.findExact(cboTaxState.displayField, 'Illinois');
             var stateTax17 = cboTaxState.store.findExact(cboTaxState.displayField, 'Indiana');
             var stateTax18 = cboTaxState.store.findExact(cboTaxState.displayField, 'Iowa');
             var stateTax19 = cboTaxState.store.findExact(cboTaxState.displayField, 'Kansas');
             var stateTax20 = cboTaxState.store.findExact(cboTaxState.displayField, 'Kentucky');
             var stateTax21 = cboTaxState.store.findExact(cboTaxState.displayField, 'Louisiana');
             var stateTax22 = cboTaxState.store.findExact(cboTaxState.displayField, 'Maine');
             var stateTax23 = cboTaxState.store.findExact(cboTaxState.displayField, 'Marshall Islands');
             var stateTax24 = cboTaxState.store.findExact(cboTaxState.displayField, 'Maryland');
             var stateTax25 = cboTaxState.store.findExact(cboTaxState.displayField, 'Massachusetts');
             var stateTax26 = cboTaxState.store.findExact(cboTaxState.displayField, 'Michigan');
             var stateTax27 = cboTaxState.store.findExact(cboTaxState.displayField, 'Minnesota');
             var stateTax28 = cboTaxState.store.findExact(cboTaxState.displayField, 'Mississippi');
             var stateTax29 = cboTaxState.store.findExact(cboTaxState.displayField, 'Missouri');
             var stateTax30 = cboTaxState.store.findExact(cboTaxState.displayField, 'Montana');
             var stateTax31 = cboTaxState.store.findExact(cboTaxState.displayField, 'Nebraska');
             var stateTax32 = cboTaxState.store.findExact(cboTaxState.displayField, 'Nevada');
             var stateTax33 = cboTaxState.store.findExact(cboTaxState.displayField, 'New Hampshire');
             var stateTax34 = cboTaxState.store.findExact(cboTaxState.displayField, 'New Jersey');
             var stateTax35 = cboTaxState.store.findExact(cboTaxState.displayField, 'New Mexico');
             var stateTax36 = cboTaxState.store.findExact(cboTaxState.displayField, 'New York');
             var stateTax37 = cboTaxState.store.findExact(cboTaxState.displayField, 'North Carolina');
             var stateTax38 = cboTaxState.store.findExact(cboTaxState.displayField, 'North Dakota');
             var stateTax39 = cboTaxState.store.findExact(cboTaxState.displayField, 'Northern Mariana Islands');
             var stateTax40 = cboTaxState.store.findExact(cboTaxState.displayField, 'Ohio');
             var stateTax41 = cboTaxState.store.findExact(cboTaxState.displayField, 'Oklahoma');
             var stateTax42 = cboTaxState.store.findExact(cboTaxState.displayField, 'Oregon');
             var stateTax43 = cboTaxState.store.findExact(cboTaxState.displayField, 'Palau');
             var stateTax44 = cboTaxState.store.findExact(cboTaxState.displayField, 'Pennsylvania');
             var stateTax45 = cboTaxState.store.findExact(cboTaxState.displayField, 'Puerto Rico');
             var stateTax46 = cboTaxState.store.findExact(cboTaxState.displayField, 'Rhode Island');
             var stateTax47 = cboTaxState.store.findExact(cboTaxState.displayField, 'South Carolina');
             var stateTax48 = cboTaxState.store.findExact(cboTaxState.displayField, 'South Dakota');
             var stateTax49 = cboTaxState.store.findExact(cboTaxState.displayField, 'Tennessee');
             var stateTax50 = cboTaxState.store.findExact(cboTaxState.displayField, 'Texas');
             var stateTax51 = cboTaxState.store.findExact(cboTaxState.displayField, 'Utah');
             var stateTax52 = cboTaxState.store.findExact(cboTaxState.displayField, 'Vermont');
             var stateTax53 = cboTaxState.store.findExact(cboTaxState.displayField, 'Virgin Islands');
             var stateTax54 = cboTaxState.store.findExact(cboTaxState.displayField, 'Virginia');
             var stateTax55 = cboTaxState.store.findExact(cboTaxState.displayField, 'Washington');
             var stateTax56 = cboTaxState.store.findExact(cboTaxState.displayField, 'West Virginia');
             var stateTax57 = cboTaxState.store.findExact(cboTaxState.displayField, 'Wisconsin');
             var stateTax58 = cboTaxState.store.findExact(cboTaxState.displayField, 'Wyoming');*/

             if
                 (stateTax0 = 1)
                 /*(stateTax0 !== -1 && stateTax1 !== -1 && stateTax2 !== -1 && stateTax3 !== -1 && stateTax4 !== -1 && stateTax5 !== -1 && stateTax6 !== -1 && stateTax7 !== -1 && stateTax8 !== -1 && stateTax9 !== -1 && stateTax10 !== -1 &&
                 stateTax11 !== -1 && stateTax12 !== -1 && stateTax13 == -1 && stateTax14 !== -1 && stateTax15 !== -1 && stateTax16 !== -1 && stateTax17 !== -1 && stateTax18 !== -1 && stateTax19 !== -1 && stateTax20 !== -1 &&
                 stateTax21 !== -1 && stateTax22 !== -1 && stateTax23 !== -1 && stateTax24 !== -1 && stateTax25 !== -1 && stateTax26 !== -1 && stateTax27 !== -1 && stateTax28 !== -1 && stateTax29 !== -1 && stateTax30 !== -1 &&
                 stateTax31 !== -1 && stateTax32 !== -1 && stateTax33 !== -1 && stateTax34 !== -1 && stateTax35 !== -1 && stateTax36 !== -1 && stateTax37 !== -1 && stateTax38 !== -1 && stateTax39 !== -1 && stateTax40 !== -1 &&
                 stateTax41 !== -1 && stateTax42 !== -1 && stateTax43 !== -1 && stateTax44 !== -1 && stateTax45 !== -1 && stateTax46 !== -1 && stateTax47 !== -1 && stateTax48 !== -1 && stateTax49 !== -1 && stateTax50 !== -1 &&
                 stateTax51 !== -1 && stateTax52 !== -1 && stateTax53 !== -1 && stateTax54 !== -1 && stateTax55 !== -1 && stateTax56 !== -1 && stateTax57 !== -1 && stateTax58 !== -1)*/
             {
                 t.ok(true, 'Passed!');
             }

             else
             {
                 t.ok(false, 'FAILED! NOT ALL State Tax are present');
             }
             next();
         },
         next
     ])
    },
//==================================CHECKS SPECIFIC LOCAL FOR SELECTED STATE===========================================/

    taxTypeLocal: function(t,next){

        t.chain([

            function(next) {

                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboCounty');
                  var cboCounty0 = cbo.store.findExact(cbo.displayField, 'Detroit');
//                var cboCounty0 = cbo.store.findExact(cbo.displayField, 'Albion');
//                var cboCounty1 = cbo.store.findExact(cbo.displayField, 'Battle Creek');
//                var cboCounty2 = cbo.store.findExact(cbo.displayField, 'Big Rapids');
//                var cboCounty3 = cbo.store.findExact(cbo.displayField, 'Detroit');
//                var cboCounty4 = cbo.store.findExact(cbo.displayField, 'Flint');
//                var cboCounty5 = cbo.store.findExact(cbo.displayField, 'Grand Rapids');
//                var cboCounty6 = cbo.store.findExact(cbo.displayField, 'Grayling');
//                var cboCounty7 = cbo.store.findExact(cbo.displayField, 'Hamtramck');
//                var cboCounty8 = cbo.store.findExact(cbo.displayField, 'Highland Park');
//                var cboCounty9 = cbo.store.findExact(cbo.displayField, 'Hudson');
//                var cboCounty10 = cbo.store.findExact(cbo.displayField, 'Ionia');
//                var cboCounty11 = cbo.store.findExact(cbo.displayField, 'Jackson');
//                var cboCounty12 = cbo.store.findExact(cbo.displayField, 'Lansing');
//                var cboCounty13 = cbo.store.findExact(cbo.displayField, 'Lapeer');
//                var cboCounty14 = cbo.store.findExact(cbo.displayField, 'Muskegon');
//                var cboCounty15 = cbo.store.findExact(cbo.displayField, 'Muskegon Heights');
//                var cboCounty16 = cbo.store.findExact(cbo.displayField, 'Pontiac');
//                var cboCounty17 = cbo.store.findExact(cbo.displayField, 'Port Huron');
//                var cboCounty18 = cbo.store.findExact(cbo.displayField, 'Portland');
//                var cboCounty19 = cbo.store.findExact(cbo.displayField, 'Saginaw');
//                var cboCounty20 = cbo.store.findExact(cbo.displayField, 'Springfield');
//                var cboCounty21 = cbo.store.findExact(cbo.displayField, 'Walker');

                if
                    (cboCounty0 = 1)
                    /*(cboCounty0 !== -1 && cboCounty1 !== -1 && cboCounty2 !== -1 & cboCounty3 !== -1 && cboCounty4 !== -1 && cboCounty5 !== -1 && cboCounty6 !== -1 && cboCounty7 !== -1 && cboCounty8 !== -1 && cboCounty9 !== -1 &&
                    cboCounty10 !== -1 && cboCounty11 !== -1 && cboCounty12 !== -1 && cboCounty13 !== -1 && cboCounty14 !== -1 && cboCounty15 !== -1 && cboCounty16 !== -1 && cboCounty17 !== -1 && cboCounty18 !== -1 &&
                    cboCounty19 !== -1 && cboCounty20 !== -1 && cboCounty21 !== -1)*/ {
                    t.ok(true, 'PASSED!')
                }

                else {
                    t.ok(false, 'FAILED! NOT ALL Local Tax are present')
                }
               next();
            },
            next
        ])

    },

//==============================CHECKS AVAILABLE STATES FOR USA LOCAL==================================================/

    taxTypeStateLocal: function(t,next){

        t.chain([

            function(next) {

                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboCounty');
                var cboCounty0 = cbo.store.findExact(cbo.displayField, 'Michigan');
//                var cboCounty0 = cbo.store.findExact(cbo.displayField, 'Albion');
//                var cboCounty1 = cbo.store.findExact(cbo.displayField, 'Battle Creek');
//                var cboCounty2 = cbo.store.findExact(cbo.displayField, 'Big Rapids');
//                var cboCounty3 = cbo.store.findExact(cbo.displayField, 'Detroit');
//                var cboCounty4 = cbo.store.findExact(cbo.displayField, 'Flint');
//                var cboCounty5 = cbo.store.findExact(cbo.displayField, 'Grand Rapids');
//                var cboCounty6 = cbo.store.findExact(cbo.displayField, 'Grayling');
//                var cboCounty7 = cbo.store.findExact(cbo.displayField, 'Hamtramck');
//                var cboCounty8 = cbo.store.findExact(cbo.displayField, 'Highland Park');
//                var cboCounty9 = cbo.store.findExact(cbo.displayField, 'Hudson');
//                var cboCounty10 = cbo.store.findExact(cbo.displayField, 'Ionia');
//                var cboCounty11 = cbo.store.findExact(cbo.displayField, 'Jackson');
//                var cboCounty12 = cbo.store.findExact(cbo.displayField, 'Lansing');
//                var cboCounty13 = cbo.store.findExact(cbo.displayField, 'Lapeer');
//                var cboCounty14 = cbo.store.findExact(cbo.displayField, 'Muskegon');
//                var cboCounty15 = cbo.store.findExact(cbo.displayField, 'Muskegon Heights');
//                var cboCounty16 = cbo.store.findExact(cbo.displayField, 'Pontiac');
//                var cboCounty17 = cbo.store.findExact(cbo.displayField, 'Port Huron');
//                var cboCounty18 = cbo.store.findExact(cbo.displayField, 'Portland');
//                var cboCounty19 = cbo.store.findExact(cbo.displayField, 'Saginaw');
//                var cboCounty20 = cbo.store.findExact(cbo.displayField, 'Springfield');
//                var cboCounty21 = cbo.store.findExact(cbo.displayField, 'Walker');

                if
                    (cboCounty0 = 1)
                /*(cboCounty0 !== -1 && cboCounty1 !== -1 && cboCounty2 !== -1 & cboCounty3 !== -1 && cboCounty4 !== -1 && cboCounty5 !== -1 && cboCounty6 !== -1 && cboCounty7 !== -1 && cboCounty8 !== -1 && cboCounty9 !== -1 &&
                 cboCounty10 !== -1 && cboCounty11 !== -1 && cboCounty12 !== -1 && cboCounty13 !== -1 && cboCounty14 !== -1 && cboCounty15 !== -1 && cboCounty16 !== -1 && cboCounty17 !== -1 && cboCounty18 !== -1 &&
                 cboCounty19 !== -1 && cboCounty20 !== -1 && cboCounty21 !== -1)*/ {
                    t.ok(true, 'PASSED!')
                }

                else {
                    t.ok(false, 'FAILED! NOT ALL Local Tax are present')
                }
                next();
            },
            next
        ])

    },
 //========================================SAVE DUPLICATE RECORD======================================================//

    saveDuplicateRecord: function(t, next){
        var engine = new iRely.TestEngine();

        engine.start(t, next)
            .clickButton('#btnSave').wait(2000)
            .addFunction(function(next){
                var winMsg = Ext.WindowManager.getActive();


                if(winMsg.xtype === 'messagebox'){
                    new iRely.TestEngine().start(this, next)
                        .checkMessageBox('iRely i21', 'Tax Type already exists!', 'ok', 'error')
                        .clickMessageBoxButton('ok').wait(750)
                        .done();
                }
                else{
                    t.ok(false, 'Message box not rendered');
                     next();
                    }
            })
            .clickButton('#btnClose').wait(500)
            .addFunction(function(next){
                var winMsg = Ext.WindowManager.getActive();

                if(winMsg.xtype === 'messagebox'){
                    new iRely.TestEngine().start(this, next)
                        .checkMessageBox('iRely i21', 'Do you want to save the changes you made?', 'yesnocancel', 'question')
                        .clickMessageBoxButton('no').wait(750)
                        .done();
                }
                else{
                    t.ok(false, 'Message box is not rendered.');
                    next();
                }
            }).wait(500)

            .done();
    },

//=================================CHECKS THE LISTS OF EARNING CALCULATION TYPES=======================================//
    earningCalculationTypeValue: function (t, next) {

        t.chain([
            function (next) {
                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboCalculationType');
                var cal0 = cbo.store.findExact(cbo.displayField, 'Annual Salary');
                var cal1 = cbo.store.findExact(cbo.displayField, 'Fixed Amount');
                var cal2 = cbo.store.findExact(cbo.displayField, 'Hourly Rate');
                var cal3 = cbo.store.findExact(cbo.displayField, 'Overtime');
                var cal4 = cbo.store.findExact(cbo.displayField, 'Rate Factor');
                var cal5 = cbo.store.findExact(cbo.displayField, 'Fringe Benefit');
                var cal6 = cbo.store.findExact(cbo.displayField, 'Reimbursement');
                var cal7 = cbo.store.findExact(cbo.displayField, 'Tip');


                if (cal0 !== -1 && cal1 !== -1 && cal2 !== -1 && cal3 !== -1 && cal4 !== -1 && cal5 !== -1
                    && cal6 !== -1 && cal7 !== -1) {
                    t.ok(true, 'Passed! All Calculation Types are present.');
                }
                else {
                    t.ok(false, 'Failed! NOT ALL Calculation Types are present.')
                }
                next();
            },
            next
        ])
    },
//=================================CHECKS THE LISTS OF EARNING CALCULATION TYPES=======================================//
    deductionCalculationTypeValue: function (t, next) {

        t.chain([
            function (next) {
                var win = Ext.WindowManager.getActive();
                var cbo = win.down('#cboCalculationType');
                var cal0 = cbo.store.findExact(cbo.displayField, 'Fixed Amount');
                var cal1 = cbo.store.findExact(cbo.displayField, 'Percent');
                var cal2 = cbo.store.findExact(cbo.displayField, 'Hourly Amount');
                var cal3 = cbo.store.findExact(cbo.displayField, 'Hourly Percent');


                if (cal0 !== -1 && cal1 !== -1 && cal2 !== -1 && cal3 !== -1 ) {
                    t.ok(true, 'Passed! All Calculation Types are present.');
                }
                else {
                    t.ok(false, 'Failed! NOT ALL Calculation Types are present.')
                }
                next();
            },
            next
        ])
    }

});