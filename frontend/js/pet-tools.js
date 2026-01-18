// ---------- Generic tool modal handlers ----------
function openTool(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTool(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close when clicking outside
['adoptionCostModal', 'monthlyBudgetModal', 'humanYearModal'].forEach(id => {
    const modal = document.getElementById(id);
    modal.addEventListener('click', (e) => {
        if (e.target.id === id) closeTool(id);
    });
});

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTool('adoptionCostModal');
        closeTool('monthlyBudgetModal');
        closeTool('humanYearModal');
    }
});

// ---------- Adoption Cost Estimator logic ----------
const baseCost = { dog: 15000, cat: 10000, bird: 5000 };
const sizeCost = { small: 2000, medium: 4000, large: 6000 };

const petType = document.getElementById("petType");
const petSize = document.getElementById("petSize");
const vaccination = document.getElementById("vaccination");
const accessories = document.getElementById("accessories");
const microchip = document.getElementById("microchip");
const totalCost = document.getElementById("totalCost");

function calculateTotal() {
    let cost = baseCost[petType.value] + sizeCost[petSize.value];
    if (vaccination.checked) cost += 3000;
    if (accessories.checked) cost += 2500;
    if (microchip.checked) cost += 2000;
    totalCost.textContent = "LKR " + cost.toLocaleString();
}

document.querySelectorAll("#costForm select, #costForm input").forEach(el => {
    el.addEventListener("change", calculateTotal);
});

calculateTotal();

// ---------- Monthly Budget Calculator logic ----------
function calculateMonthlyCost() {
    const type = document.getElementById("monthlyPetType").value;
    const size = document.getElementById("monthlySize").value;
    const age = document.getElementById("monthlyAge").value;

    const baseCost = { dog: 8000, cat: 5000, rabbit: 3000, bird: 2000 };
    const sizeMult = { small: 1, medium: 1.2, large: 1.5 };
    const ageAdd = { young: 1000, adult: 2000, senior: 3500 };

    const petNames = { dog: "Dog", cat: "Cat", rabbit: "Rabbit", bird: "Bird" };
    const sizeNames = { small: "Small", medium: "Medium", large: "Large" };
    const ageNames = { young: "Young", adult: "Adult", senior: "Senior" };

    let baseCostValue = baseCost[type];
    let sizeMultValue = sizeMult[size];
    let foodCost = Math.round(baseCostValue * sizeMultValue);
    let medicalCost = ageAdd[age];
    let total = foodCost + medicalCost;

    let breakdownHTML = `
                <div class="breakdown-item">
                    <span class="breakdown-label">🐾 Pet: ${petNames[type]} (${sizeNames[size]})</span>
                    <span class="breakdown-value"></span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">🍖 Food & Basic Care</span>
                    <span class="breakdown-value">LKR ${foodCost.toLocaleString()}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-label">🩺 Medical (${ageNames[age]})</span>
                    <span class="breakdown-value">LKR ${medicalCost.toLocaleString()}</span>
                </div>
            `;

    if (document.getElementById("monthlyGrooming").checked) {
        total += 1500;
        breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">✂️ Grooming</span>
                        <span class="breakdown-value">LKR 1,500</span>
                    </div>
                `;
    }

    if (document.getElementById("monthlyInsurance").checked) {
        total += 2000;
        breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">🛡️ Pet Insurance</span>
                        <span class="breakdown-value">LKR 2,000</span>
                    </div>
                `;
    }

    if (document.getElementById("monthlyToys").checked) {
        total += 1000;
        breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">🧸 Toys & Treats</span>
                        <span class="breakdown-value">LKR 1,000</span>
                    </div>
                `;
    }

    if (document.getElementById("monthlyTraining").checked) {
        total += 2500;
        breakdownHTML += `
                    <div class="breakdown-item">
                        <span class="breakdown-label">🎓 Training</span>
                        <span class="breakdown-value">LKR 2,500</span>
                    </div>
                `;
    }

    document.getElementById("monthlyBreakdownDetails").innerHTML = breakdownHTML;
    document.getElementById("monthlyTotalCost").innerText = `LKR ${total.toLocaleString()}`;

    const resultSection = document.getElementById("monthlyResultSection");
    resultSection.classList.add("show");
}

// ---------- Human Year Converter logic ----------
function convertHumanYears() {
    const type = document.getElementById("humanPetType").value;
    const age = parseFloat(document.getElementById("petAgeYears").value);

    if (isNaN(age) || age < 0) {
        alert("Please enter a valid pet age (0 or higher).");
        return;
    }

    let humanYears = 0;

    if (type === "dog") {
        // Common estimate: first 2 years = 10.5 each, then 4 per year
        if (age <= 2) humanYears = age * 10.5;
        else humanYears = 21 + (age - 2) * 4;
    } else if (type === "cat") {
        // Common estimate: 1st year 15, 2nd year +9, then +4
        if (age <= 1) humanYears = age * 15;
        else if (age <= 2) humanYears = 15 + (age - 1) * 9;
        else humanYears = 24 + (age - 2) * 4;
    }

    humanYears = Math.round(humanYears * 10) / 10;

    document.getElementById("humanYearsOut").textContent = `${humanYears} years`;
    document.getElementById("humanResult").style.display = "block";
}