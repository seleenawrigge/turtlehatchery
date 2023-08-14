document.addEventListener("DOMContentLoaded", function () {
  const fullNameInput = document.getElementById("fullName");
  const mobileNumberInput = document.getElementById("mobileNumber");
  const emailInput = document.getElementById("email");
  const confirmEmailInput = document.getElementById("confirmEmail");
  const genderSelect = document.getElementById("gender");
  const summaryTable = document.getElementById("summary-table");

  function updateSummary() {
    const fullName = fullNameInput.value.trim();
    const mobileNumber = mobileNumberInput.value.trim();
    const email = emailInput.value.trim();
    const confirmEmail = confirmEmailInput.value.trim();
    const gender = genderSelect.value;

    let genderText = "";
    if (gender === "male") {
      genderText = "Male";
    } else if (gender === "female") {
      genderText = "Female";
    }

    summaryTable.innerHTML = `
      <tr>
        <td><strong>Full Name</strong></td>
        <td>${fullName}</td>
      </tr>
      <tr>
        <td><strong>Mobile Number</strong></td>
        <td>${mobileNumber}</td>
      </tr>
      <tr>
        <td><strong>Email</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Confirm Email</strong></td>
        <td>${confirmEmail}</td>
      </tr>
      <tr>
        <td><strong>Gender</strong></td>
        <td>${genderText}</td>
      </tr>
    `;
  }

  fullNameInput.addEventListener("input", updateSummary);
  mobileNumberInput.addEventListener("input", updateSummary);
  emailInput.addEventListener("input", updateSummary);
  confirmEmailInput.addEventListener("input", updateSummary);
  genderSelect.addEventListener("change", updateSummary);
});
