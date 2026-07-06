// Global State array to hold our URLs
let myLeads = [];

// DOM Elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

// Fetch saved leads from LocalStorage on load
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) || [];

// If leads exist in storage, initialize state and render them
if (leadsFromLocalStorage.length > 0) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// Helper Function: Ensure the URL has a protocol
function formatURL(url) {
    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
        return "https://" + trimmedUrl;
    }
    return trimmedUrl;
}

// Render Function: Builds the DOM dynamically to safely attach event listeners
function render(leads) {
    // Clear the current list
    ulEl.innerHTML = "";

    leads.forEach((lead, index) => {
        // 1. Create the Card Container
        const li = document.createElement("li");
        li.className = "lead-card";

        // 2. Create the URL Link
        const a = document.createElement("a");
        a.href = lead;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "lead-link";
        a.textContent = lead;

        // 3. Create the Actions Container
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "card-actions";

        // 4. Create Copy Button
        const copyBtn = document.createElement("button");
        copyBtn.className = "btn-green";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(lead).then(() => {
                alert("URL copied to clipboard!");
            });
        });

        // 5. Create Delete (Individual) Button
        const delBtn = document.createElement("button");
        delBtn.className = "btn-red";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            // Remove exactly this lead from the array
            myLeads.splice(index, 1);
            // Update Local Storage
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            // Re-render the list immediately
            render(myLeads);
        });

        // Assemble the card
        actionsDiv.appendChild(copyBtn);
        actionsDiv.appendChild(delBtn);
        
        li.appendChild(a);
        li.appendChild(actionsDiv);
        
        ulEl.appendChild(li);
    });
}

// Event Listener: Save manual input
inputBtn.addEventListener("click", () => {
    const rawValue = inputEl.value;
    if (rawValue.trim() !== "") {
        const formattedUrl = formatURL(rawValue);
        myLeads.push(formattedUrl);
        
        // Clear input and save
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
});

// Event Listener: Save current active tab URL
tabBtn.addEventListener("click", () => {
    // Interrogates the Chrome Tabs API
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
        myLeads.push(currentUrl);
        
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

// Event Listener: Delete all leads
deleteBtn.addEventListener("click", () => {
    // Clear the array and local storage
    myLeads = [];
    localStorage.clear(); // Alternatively: localStorage.removeItem("myLeads")
    render(myLeads);
});
