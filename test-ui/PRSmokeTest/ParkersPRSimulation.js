   localStorage.setItem('i21UserName', window.btoa('irelyadmin'));
    localStorage.setItem('i21Password', window.btoa('i21by2015'));
    localStorage.setItem('i21Company', '02'); 

StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    var sysDATE = new Date();
    var TODAY = Ext.Date.format(sysDATE, 'n/j/Y');
    var startDATE = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -6), 'n/j/Y');
    var payDATE = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, 2), 'n/j/Y');
    var DAY1 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -6), 'n/j/Y');
    var DAY2 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -5), 'n/j/Y');
    var DAY3 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -2), 'n/j/Y');
    var DAY4 = Ext.Date.format(Ext.Date.add(sysDATE, Ext.Date.DAY, -1), 'n/j/Y');
    var DAY5 = Ext.Date.format(sysDATE, 'n/j/Y');
    new iRely.FunctionalTest().start(t)

//Time Approval - Approve all time entries included in the pay period
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Time Approval', 'Screen')
        .waitUntilLoaded()
        .enterData('Date Field', 'DateFrom', startDATE)
        .enterData('Date Field', 'PayDate', payDATE)
        .addFunction(function(next){
            t.chain(
                {click : "#frmTimeApproval #tabTimeApproval #cboDepartment => .x-form-trigger"},
                {click : "#frmTimeApproval #tabTimeApproval #cboDepartment grid tableview => .x-grid-cell-last :textEquals(Office)"},
                {click : "#frmTimeApproval #tabTimeApproval #cboDepartment grid tableview => .x-grid-cell-last :textEquals(Driver)"} 
            );
            next();
        })
        .waitUntilLoaded()  

// Employee - PATRICK BONFIGLIO 
        .displayText('Creating Time Entry for Employee: PATRICK BONFIGLIO')              
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY1,'10','Driver',
                                            'Reg Hourly', DAY1,DAY1,'6:12 AM','2:44 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY2,'10','Driver',
                                            'Reg Hourly', DAY2,DAY2,'6:23 AM','2:32 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY3,'10','Driver',
                                            'Reg Hourly', DAY3,DAY3,'6:09 AM','2:12 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY4,'10','Driver',
                                            'Reg Hourly', DAY4,DAY4,'6:11 AM','2:47 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY5,'10','Driver',
                                            'Reg Hourly', DAY5,DAY5,'6:18 AM','3:07 PM');
        })
// Employee - THOMAS J MOSHER  
        .displayText('Creating Time Entry for Employee: THOMAS MOSHER')              
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY1,'11','Office',
                                            'Reg Hourly', DAY1,DAY1,'6:43 AM','2:59 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY2,'11','Office',
                                            'Reg Hourly', DAY2,DAY2,'6:02 AM','2:33 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY3,'11','Office',
                                            'Reg Hourly', DAY3,DAY3,'6:00 AM','2:40 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY4,'11','Office',
                                            'Reg Hourly', DAY4,DAY4,'6:00 AM','2:43 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY5,'11','Office',
                                            'Reg Hourly', DAY5,DAY5,'6:19 AM','3:02 PM');
        })
// Employee - TIMOTHY LEE TAYLOR 
        .displayText('Creating Time Entry for Employee: TIMOTHY LEE TAYLOR')                
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY1,'12','Driver',
                                            'Reg Hourly', DAY1,DAY1,'6:19 AM','2:24 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY2,'12','Driver',
                                            'Reg Hourly', DAY2,DAY2,'6:22 AM','3:01 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY3,'12','Driver',
                                            'Reg Hourly', DAY3,DAY3,'6:03 AM','3:02 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY4,'12','Driver',
                                            'Reg Hourly', DAY4,DAY4,'6:11 AM','2:42 PM');
        })
        .addFunction(function(next){
            commonPR.addTETimecardApproval(t,next,DAY5,'12','Driver',
                                            'Reg Hourly', DAY5,DAY5,'6:21 AM','2:54 PM');
        })

        .addFunction(function(next){
            t.chain(
                {click : "#frmTimeApproval #tabTimeApproval #grdTimeApproval #grvTimeApproval => :textEquals(10 \: PATRICK  BONFIGLIO) .grpCheckbox"},
                {click : "#frmTimeApproval #tabTimeApproval #grdTimeApproval #grvTimeApproval => :textEquals(11 \: THOMAS J MOSHER) .grpCheckbox"},
                {click : "#frmTimeApproval #tabTimeApproval #grdTimeApproval #grvTimeApproval => :textEquals(12 \: TIMOTHY LEE TAYLOR) .grpCheckbox"}
            );
            next();
        })
        .enterData('Date Field', 'PayDate', payDATE)
        .clickButton('Save')
        .clickButton('Process')
        .clickMessageBoxButton('ok')
        .clickButton('Close')

// Process Pay Group - Generate earnings from time entries approved from Timecard Approval and posted TOR
// also generates LUNCH earning for all employees and SAL earning for employees with fixed income
        .clickMenuScreen('Process Pay Groups', 'Screen')
        .waitUntilLoaded()
        .selectGridRowValue('EmployeePayGroup', [{dataIndex: 'strPayGroup', value: 'Weekly'}])
        .enterGridData('EmployeePayGroup', 3, 'dtmBeginDate', '')
        .enterGridData('EmployeePayGroup', 2, 'dtmBeginDate', startDATE)
        .enterGridData('EmployeePayGroup', 3, 'dtmBeginDate', startDATE)
        .waitTillLoaded()
        .enterGridData('EmployeePayGroup', 3, 'dtmEndDate', '')
        .enterGridData('EmployeePayGroup', 3, 'dtmEndDate', TODAY)
        .waitTillLoaded()
        .enterGridData('EmployeePayGroup', 3, 'dtmPayDate', '')
        .enterGridData('EmployeePayGroup', 3, 'dtmPayDate', payDATE)
        .waitTillLoaded()
        .clickButton('Save')
        .waitUntilLoaded()
        .clickButton('Generate')
        .waitUntilLoaded()
        .clickButton('Process')       
        .waitUntilLoaded()
        .clickButton('Ok')
        .waitTillLoaded('',300000)
        .clickButton('Close')

//Batch Posting - Post all paychecks for pay period
        .clickMenuScreen('Batch Posting', 'Screen')
        .waitUntilLoaded()
        .clickButton('SelectAll')
        .clickButton('Post')
        .waitTillLoaded('prbatchpostingresult',300000)
        .waitUntilLoaded()   
        .clickButton('Close')
        .waitUntilLoaded()
        .clickButton('Close')

//Process Paychecks - Print normal paychecks and generate ACH for direct deposit paychecks
        .clickMenuScreen('Process Paychecks', 'Screen')
        .waitUntilLoaded()
        .selectComboBoxRowNumber('BankAccount', 1)
        .clickButton('PrintChecksSelectAll')
        .clickButton('Preview')
        .waitUntilLoaded()
        .waitUntilLoaded('srreportscreen')
        .waitUntilLoaded()
        .waitTillLoaded('',5000)
        .clickButton('Close')
        .waitUntilLoaded()        
        .addFunction(function(next){
            t.chain(
                {click : "#PrintChecks #frmPrintChecks #tabPrintChecks #optProcessTypeGroup #eftOptionsACH => .x-form-radio"}
            );
            next();
        })
        .waitUntilLoaded()
        .clickButton('Generate')
        .addFunction(function(next){
            t.chain(
                {click : "#PrintChecks #frmPrintChecks #tabPrintChecks #tabPanel #tabRemittanceInfo => .x-tab-inner"}
            );
            next();
        })
        .waitUntilLoaded()
        .clickButton('RemittanceAdviceSelectAll')
        .clickButton('Repreview')
        .waitUntilLoaded()
        .waitUntilLoaded('srreportscreen')
        .waitUntilLoaded()
        .waitTillLoaded('',200000)

        /*.addFunction(function(next){
            t.chain(
                {delay: 1000},
                {click : "#RemittanceAdvice_Splitter_Toolbar_Menu_DXI1_Img"},
                {type : '[ESCAPE]'},
                {click : ".ui-draggable .confirm"}
            );
            next();
        }) */
        .clickButton('Close')
        .waitUntilLoaded()
        .clickButton('Close')
.done();
});