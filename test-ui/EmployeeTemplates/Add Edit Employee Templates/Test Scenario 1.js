
StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

  
        .displayText('====== Scenario 1 - Create New ======')
        .waitUntilMainMenuLoaded()
        .clickMenuFolder('Payroll', 'Folder')
        .clickMenuScreen('Employee Templates', 'Screen')                                                               
        .clickButton('New')
        .waitTillLoaded('', 1000)
        .enterData('Text Field','TemplateName','TEMP 1')
        .enterData('Text Field','TemplateDescription','Test Employee Template 1')

       
        .clickTab('Taxes')
        .clickButton('AddTaxes', 1)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'FIT'},
            {dataIndex: 'strTax', value: 'FUTA'},
            {dataIndex: 'strTax', value: 'SUTA'},
            {dataIndex: 'strTax', value: 'FICA MED Company'},
            {dataIndex: 'strTax', value: 'FICA MED Employee'},
            {dataIndex: 'strTax', value: 'FICA SS Company'},
            {dataIndex: 'strTax', value: 'FICA SS Employee'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

       
        .clickTab('Earnings')
        .clickButton('AddEarning', 2)
        .selectGridRowValue('Add', [
            {dataIndex: 'strEarning', value: 'REG'},
            {dataIndex: 'strEarning', value: 'OTV'},
            {dataIndex: 'strEarning', value: 'SICK'},
            {dataIndex: 'strEarning', value: 'VAC'},
            {dataIndex: 'strEarning', value: 'PERSONAL'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'REG'})
        .waitTillLoaded('', 1000)
        .selectGridComboBoxRowValue('Earning',1,'colEarningsPayGroup','Weekly','PayGroup',1)
        .enterData('Text Field','EarningAmount','7.25')
        .enterData('Text Field','EarningDefaultHours','40')
        .selectComboBoxRowValue('EarningAccrueTimeOffId', 'VAC (Hour)','strTimeOff',4)
        .verifyGridRecordCount('EmpEarningTaxes', 7)

        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'OTV'})
        .waitTillLoaded('', 1000)
        .selectGridComboBoxRowValue('Earning',2,'colEarningsPayGroup','Weekly','PayGroup',1)
        .selectComboBoxRowValue('EmpEarningLinkId', 'REG','strEarning',1)
        .enterData('Text Field','EarningAmount','1.5')
        .enterData('Text Field','EarningDefaultHours','0')
        .verifyGridRecordCount('EmpEarningTaxes', 7)

        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'VAC'})
        .waitTillLoaded('', 1000)
        .selectGridComboBoxRowValue('Earning',3,'colEarningsPayGroup','Weekly','PayGroup',1)
        .selectComboBoxRowValue('EmpEarningLinkId', 'REG','strEarning',1)
        .enterData('Text Field','EarningAmount','1')
        .enterData('Text Field','EarningDefaultHours','0')
        .selectComboBoxRowValue('EarningDeductTimeOffId', 'VAC (Hour)','strTimeOff',4)
        .verifyGridRecordCount('EmpEarningTaxes', 7)

        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'SICK'})
        .waitTillLoaded('', 1000)
        .selectGridComboBoxRowValue('Earning',4,'colEarningsPayGroup','Weekly','PayGroup',1)
        .selectComboBoxRowValue('EmpEarningLinkId', 'REG','strEarning',1)
        .enterData('Text Field','EarningAmount','1')
        .enterData('Text Field','EarningDefaultHours','0')
        .selectComboBoxRowValue('EarningDeductTimeOffId', 'SICK','strTimeOff',1)
        .verifyGridRecordCount('EmpEarningTaxes', 7)

        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'PERSONAL'})
        .waitTillLoaded('', 1000)
        .selectGridComboBoxRowValue('Earning',5,'colEarningsPayGroup','Weekly','PayGroup',1)
        .selectComboBoxRowValue('EmpEarningLinkId', 'REG','strEarning',1)
        .enterData('Text Field','EarningAmount','1')
        .enterData('Text Field','EarningDefaultHours','0')
        .selectComboBoxRowValue('EarningDeductTimeOffId', 'Personal','strTimeOff',2)
        .verifyGridRecordCount('EmpEarningTaxes', 7)

      
        .clickTab('Deductions')
        .clickButton('AddDeduction', 3)
        .selectGridRowValue('Add', [
            {dataIndex: 'strDeduction', value: 'IRA'},
            {dataIndex: 'strDeduction', value: '401K'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

        .selectGridRowValue('Deduction', {dataIndex: 'strDeductionId', value: 'IRA'})
        .waitTillLoaded('', 1000)
        .enterData('Text Field','DeductionAmount','0.25')
        .enterData('Text Field','DeductionLimit','5500')
        .verifyGridRecordCount('EmpDeductionTaxes', 7)
        .isControlDisable('Button', 'AddDeductionEmpTaxes', false)
        .isControlDisable('Button', 'DeleteDeductionEmpTaxes', false)

        .selectGridRowValue('Deduction', {dataIndex: 'strDeductionId', value: '401K'})
        .waitTillLoaded('', 1000)
        .enterData('Text Field','DeductionAmount','3')
        .enterData('Text Field','DeductionLimit','10500')
        .verifyGridRecordCount('EmpDeductionTaxes', 7)
        .isControlDisable('Button', 'AddDeductionEmpTaxes', false)
        .isControlDisable('Button', 'DeleteDeductionEmpTaxes', false)

        
        .clickTab('Time Off')
        .clickButton('AddTimeOff', 4)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTimeOff', value: 'SICK'},
            {dataIndex: 'strTimeOff', value: 'Personal'},
            {dataIndex: 'strTimeOff', value: 'VAC (Hour)'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

        .clickButton('Save')
        .clickButton('Close')

  
       
    .done();
});