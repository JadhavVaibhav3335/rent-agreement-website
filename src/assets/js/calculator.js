document.addEventListener("DOMContentLoaded", function () {
  const periodInput = document.getElementById("period-months");
  const rentInput = document.getElementById("user-rent");
  const depositInput = document.getElementById("user-deposit");
  const visitCity1Select = document.getElementById("visit-city1");
  const visitCity2Select = document.getElementById("visit-city2");

  const stampDutyField = document.getElementById("stamp-duty");
  const visitChargeField1 = document.getElementById("visit-charge1");
  const visitChargeField2 = document.getElementById("visit-charge2");
  const totalPriceField = document.getElementById("total-price");

  const regCharge = 1000;
  const dhcCharge = 300;
  const srvCharge = 1000;

  function getVisitFee(x) {
    const costMap = {
      1: 300,
      2: 500,
      3: 500,
      4: 500,
      5: 600,
      6: 700,
      7: 600,
      8: 800,
      9: 1500,
      10: 1200,
      29: 800,
      101: 2000,
      110: 2000,
      302: 2000,
      303: 300,
    };
    return costMap[x] || 0;
  }

  function calculateCharges(autoUpdateVisit = true) {
    const months = Math.min(parseInt(periodInput.value) || 11, 60);
    const rent = parseFloat(rentInput.value) || 15000;
    const deposit = parseFloat(depositInput.value) || 50000;
    const cityVal1 = parseInt(visitCity1Select.value) || 1;
    const cityVal2 = parseInt(visitCity2Select.value) || 0;

    let depositCalc = ((deposit * months) / 12) * 0.1;
    let baseAmount = rent * months + depositCalc;
    let stampDuty = Math.ceil(baseAmount * 0.0025);
    stampDuty = Math.min(Math.max(stampDuty, 100), 5000);
    stampDuty = Math.ceil(stampDuty / 100) * 100;
    stampDutyField.value = "₹ " + stampDuty.toLocaleString("en-IN");

    let visitCharge1 = 0;
    let visitCharge2 = 0;

    if (autoUpdateVisit) {
      visitCharge1 = getVisitFee(cityVal1);
      visitCharge2 = cityVal2 ? getVisitFee(cityVal2) : 0;
      visitChargeField1.value = "₹ " + visitCharge1.toLocaleString("en-IN");
      visitChargeField2.value = cityVal2 ? "₹ " + visitCharge2.toLocaleString("en-IN") : "—";
    }

    const total = stampDuty + regCharge + dhcCharge + srvCharge + visitCharge1 + visitCharge2;
    totalPriceField.innerText = total.toLocaleString("en-IN");
  }

  [periodInput, rentInput, depositInput, visitCity1Select, visitCity2Select].forEach((el) =>
    el.addEventListener("input", () => calculateCharges(true))
  );

  calculateCharges(true);
});
