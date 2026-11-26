
const display = document.getElementById("display");

// Add number or operator to display
function appendValue(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculateResult() {
    try {
        let expression = display.value;

        if (expression === "") {
            return;
        }

        // Check for invalid characters
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            display.value = "Error";
            return;
        }

        // Prevent division by zero
        if (/\/\s*0(?:\.0*)?(?![0-9.])/.test(expression)) {
            display.value = "Cannot divide by zero";
            return;
        }

        // Convert percentage into decimal
        expression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        // Evaluate the mathematical expression
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = Number(result.toFixed(10)).toString();
        }

    } catch (error) {
        display.value = "Error";
    }
}
