import React, { useState } from 'react';
import './SalaryForm.css';

const SalaryForm = () => {
  const [formData, setFormData] = useState({
    salary: '',
    perquisites: '',
    profitsInLieu: '',
    retirementNotified: '',
    retirementOther: '',
    incomeReliefClaimed: '',
    allowancesExempt: '',
    incomeRelief: '',
    taxableSalary: '',
    deductionStandard: '',
    deductionEntertainment: '',
    deductionProfessionalTax1: '',
    deductionProfessionalTax2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (field) => {
    // Placeholder for button click logic
    alert(`Button clicked for ${field}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Implement your submission logic here
  };

  const handleDelete = () => {
    // Implement your delete logic here
    alert('Delete action triggered');
  };

  const handleBack = () => {
    // Implement your back navigation logic here
    alert('Back action triggered');
  };

  return (
    <div className="salary-form-container">
      <h2>Salary Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Section: Salary Components */}
        <div className="salary-form-group">
          <label>Salary [Section 17(1)]:</label>
          <button type="button" onClick={() => handleButtonClick('salary')}>...</button>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            
            required
          />
          
        </div>

        <div className="salary-form-group">
          <label>Perquisites [Section 17(2)]:</label>
           <button type="button" onClick={() => handleButtonClick('perquisites')}>...</button>
          <input
            type="number"
            name="perquisites"
            value={formData.perquisites}
            onChange={handleChange}
            
            required
          />
         
        </div>

        <div className="salary-form-group">
          <label>Profits in lieu of Salary [Section 17(3)]:</label>
           <button type="button" onClick={() => handleButtonClick('profitsInLieu')}>...</button>
          <input
            type="number"
            name="profitsInLieu"
            value={formData.profitsInLieu}
            onChange={handleChange}
            
          
          />
         
        </div>

        {/* Section: Retirement Benefits */}
        <div className="salary-form-group">
          <label>Income from Retirement Benefit Account (Notified Country) u/s 89A:</label>
          <button type="button" onClick={() => handleButtonClick('retirementNotified')}>...</button>
          <input
            type="number"
            name="retirementNotified"
            value={formData.retirementNotified}
            onChange={handleChange}
           
            required
          />
          
        </div>

        <div className="salary-form-group">
          <label>Income from Retirement Benefit Account (Other Country) u/s 89A:</label>
          <input
            type="number"
            name="retirementOther"
            // value={formData.retirementOther}
            onChange={handleChange}
            
            required
          />
        </div>

        <div className="salary-form-group">
          <label>Income Taxable During Previous Year (Relief u/s 89A Claimed Earlier):</label>
          <input
            type="number"
            name="incomeReliefClaimed"
            value={formData.incomeReliefClaimed}
            onChange={handleChange}
           
            required
          />
        </div>

        {/* Section: Deductions */}
        <div className="salary-form-group">
          <label>Less: Allowances Exempt u/s 10 (Ensure inclusion in salary income u/s 17(1)/(2)/(3)):</label>
          <button type="button" onClick={() => handleButtonClick('allowancesExempt')}>...</button>
          <input
            type="number"
            name="allowancesExempt"
            value={formData.allowancesExempt}
            onChange={handleChange}
           
            required
          />
          
        </div>

        <div className="salary-form-group">
          <label>Less: Income Claimed for Relief from Taxation u/s 89A:</label>
          <input
            type="number"
            name="incomeRelief"
            value={formData.incomeRelief}
            onChange={handleChange}
           
            required
          />
        </div>

        {/* Section: Taxable Salary */}
        <div className="salary-form-group">
          <label className="section-heading">Taxable Salary before Deduction u/s 16:</label>
          <input
            type="number"
            name="taxableSalary"
            value={formData.taxableSalary}
            onChange={handleChange}
            
            required
          />
        </div>

        {/* Section: Deductions u/s 16 */}
        <div className="salary-form-group">
          <label className="section-subheading">Less: Deductions u/s 16</label>
        </div>

        <div className="salary-form-group">
          <label>Under Section 16(i) [Standard Deduction]:</label>
          <input
            type="number"
            name="deductionStandard"
            value={formData.deductionStandard}
            onChange={handleChange}
            
            required
          />
        </div>

        <div className="salary-form-group">
          <label>Under Section 16(ii) [Entertainment Allowance]:</label>
          <input
            type="number"
            name="deductionEntertainment"
            value={formData.deductionEntertainment}
            onChange={handleChange}
            
            required
          />
        </div>

        <div className="salary-form-group">
          <label>Under Section 16(iii) [Professional Tax]:</label>
          <input
            type="number"
            name="deductionProfessionalTax1"
            value={formData.deductionProfessionalTax1}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="deductionProfessionalTax2"
            // value={formData.deductionProfessionalTax2}
            onChange={handleChange}
            required
            
          />
        </div>

        {/* Section: Final Income */}
        <div className="salary-form-group">
          <label className="section-heading blue-text">Income Chargeable under the Head 'Salaries':</label>
          <input
            type="number"
            name="incomeChargeable"
            value={
              Number(formData.taxableSalary || 0) -
              Number(formData.deductionStandard || 0) -
              Number(formData.deductionEntertainment || 0) -
              Number(formData.deductionProfessionalTax1 || 0) -
              Number(formData.deductionProfessionalTax2 || 0)
            }
            readOnly
          />
           </div>
           <div className="buttonss-groups">
          <button type="submit" className="submit-button">Save</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
          <button type="button" className="backs-button" onClick={handleBack}>Back</button>
        </div>
       

       
       
      </form>
    </div>
  );
};

export default SalaryForm;
