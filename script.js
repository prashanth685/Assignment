document.addEventListener('DOMContentLoaded', () => {
    const companySelect = document.getElementById('companySelect');
    const accountSelect = document.getElementById('accountSelect');
    const balanceAmount = document.getElementById('balanceAmount');
    const transactionTableBody = document.getElementById('transactionTableBody');
  
    let companies = [];
    let accounts = [];
    let transactions = [];
  
    // Mock API data
    const fetchCompanies = async () => {
      return [
        { id: '1', name: 'Company A' },
        { id: '2', name: 'Company B' },
      ];
    };
  
    const fetchAccounts = async (companyId) => {
      const accountsData = {
        '1': [
          { id: '1-1', name: 'Account 1A', balance: '88,888.00' },
          { id: '1-2', name: 'Account 2A', balance: '77,777.00' },
        ],
        '2': [
          { id: '2-1', name: 'Account 1B', balance: '66,666.00' },
          { id: '2-2', name: 'Account 2B', balance: '55,555.00' },
        ],
      };
      return accountsData[companyId];
    };
  
    const fetchTransactions = async (accountId) => {
      const transactionsData = {
        '1-1': [
          { date: '07/05/2024 01:04 PM', credit: '₹21,337', accountBalance: '₹21,337', utrRrn: '1000000', accountNumber: 'AC0CF7RRUY407QHU' },
          { date: '04/05/2024 12:38 PM', credit: '₹21,337', accountBalance: '₹21,337', utrRrn: 'CMS4136431811', accountNumber: '0104SLNEFTPL' },
        ],
        '1-2': [
          { date: '28/03/2024 05:09 PM', credit: '₹5,015.69', accountBalance: '₹5,015.69', utrRrn: 'CMS3956666735', accountNumber: 'AC0CF7RRUY407QHU' },
          { date: '19/03/2024 11:33 PM', credit: '₹16,000', accountBalance: '₹16,000', utrRrn: 'CMS3938564916', accountNumber: 'AC0CF7RRUY407QHU' },
        ],
        
      };
      return transactionsData[accountId] || [];
    };
  
    const populateCompanies = async () => {
      companies = await fetchCompanies();
      companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.id;
        option.textContent = company.name;
        companySelect.appendChild(option);
      });
    };
  
    const populateAccounts = async (companyId) => {
      accountSelect.innerHTML = '<option value="">Select Account</option>';
      accounts = await fetchAccounts(companyId);
      accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        accountSelect.appendChild(option);
      });
    };
  
    const populateTransactions = (transactions) => {
      transactionTableBody.innerHTML = '';
      transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${transaction.date}</td>
          <td>${transaction.credit}</td>
          <td>${transaction.accountBalance}</td>
          <td>${transaction.utrRrn}</td>
          <td>${transaction.accountNumber}</td>
        `;
        transactionTableBody.appendChild(row);
      });
    };
  
    companySelect.addEventListener('change', async (e) => {
      const companyId = e.target.value;
      await populateAccounts(companyId);
      balanceAmount.textContent = 'Select an account to view balance';
      transactionTableBody.innerHTML = '<tr><td colspan="5">Select an account to view transactions</td></tr>';
    });
  
    accountSelect.addEventListener('change', async (e) => {
      const accountId = e.target.value;
      const account = accounts.find(acc => acc.id === accountId);
      balanceAmount.textContent = `₹${account.balance}`;
      transactions = await fetchTransactions(accountId);
      populateTransactions(transactions);
    });
  
    populateCompanies();
  });
  