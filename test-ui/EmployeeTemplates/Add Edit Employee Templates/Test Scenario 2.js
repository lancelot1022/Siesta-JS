
StartTest (function (t) {
    var commonPR = Ext.create('i21.test.Payroll.commonPR');
    new iRely.FunctionalTest().start(t)

  
        .displayText('====== Scenario 2- Edit Existing Template ======')
        .clickMenuScreen('Employee Templates', 'Screen')
        .selectSearchRowNumber(5,1)
        .clickButton('OpenSelected')
        .waitTillLoaded('', 1000)
        .enterData('Text Field','TemplateName','TEMP 1B')
        .enterData('Text Field','TemplateDescription','Test Employee Template 1 Edit')

        
        .clickTab('Taxes')
        .waitTillLoaded('',1000)
        .selectGridRowValue('EmpTaxes', {dataIndex: 'strTaxId', value: 'FIT'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteTaxes', 1)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddTaxes', 1)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'FIT'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

       
        .clickTab('Earnings')
        .waitTillLoaded('',1000)
        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'PERSONAL'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteEarning', 2)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddEarning', 2)
        .selectGridRowValue('Add', [
            { dataIndex: 'strEarning', value: 'PERSONAL'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')
        .selectGridRowValue('Earning', {dataIndex: 'strEarningId', value: 'PERSONAL'})
        .waitTillLoaded('',1000)

       
        .selectGridRowValue('EmpEarningTaxes', {dataIndex: 'strTaxId', value: 'FIT'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteEarningEmpTaxes', 2)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddEarningEmpTaxes', 2)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'FIT'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

        
        .clickTab('Deductions')
        .waitTillLoaded('',1000)
        .selectGridRowValue('Deduction', {dataIndex: 'strDeductionId', value: 'IRA'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteDeduction', 3)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddDeduction', 3)
        .selectGridRowValue('Add', [
            {dataIndex: 'strDeduction', value: 'IRA'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')
        .selectGridRowValue('Deduction', {dataIndex: 'strDeductionId', value: 'IRA'})
        .waitTillLoaded('',1000)

       
        .selectGridRowValue('EmpDeductionTaxes', {dataIndex: 'strTaxId', value: 'FIT'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteDeductionEmpTaxes', 3)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddDeductionEmpTaxes', 3)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTax', value: 'FIT'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

       
        .clickTab('Time Off')
        .waitTillLoaded('',1000)
        .selectGridRowValue('TimeOff', {dataIndex: 'strTimeOff', value: 'Personal'})
        .waitTillLoaded('',1000)
        .clickButton('DeleteTimeOff', 4)
        .clickMessageBoxButton('yes')
        .waitTillLoaded('',1000)
        .clickButton('AddTimeOff', 4)
        .selectGridRowValue('Add', [
            {dataIndex: 'strTimeOff', value: 'Personal'}
        ])
        .waitTillLoaded('Ok')
        .clickButton('Ok')

        .clickButton('Save')
        .clickButton('Close')

    .done();
});