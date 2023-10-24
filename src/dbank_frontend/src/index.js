import { dbank_backend } from "../../declarations/dbank_backend";

const checkBalance = async () => {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
};

window.addEventListener("load", checkBalance());

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");

  let inputAmount = parseFloat(document.getElementById("input-amount").value);
  let outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (inputAmount) {
    await dbank_backend.topUp(inputAmount);
    document.getElementById("input-amount").value = "";
  }

  if (outputAmount) {
    await dbank_backend.withdraw(outputAmount);
    document.getElementById("withdrawal-amount").value = "";
  }

  // await dbank_backend.compound();

  checkBalance();

  button.removeAttribute("disabled");
});