// Function to load data from the text file
async function loadData() {
    try {
      const response = await fetch("data.txt"); // Path to your text file
      const text = await response.text();
      return parseTextData(text);
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  }
  
  // Function to parse the text data into an array of objects
  function parseTextData(text) {
    return text
      .split("\n") // Split by new lines
      .map((line) => {
        const [variable, description] = line.split(":").map((part) => part.trim());
        return { variable, description };
      })
      .filter((item) => item.variable && item.description); // Filter out invalid lines
  }
  
  // Function to populate the Tweaker table
  function populateTweakerTable(data) {
    const tableBody = document.getElementById("tweaker-data");
    tableBody.innerHTML = data
      .map(
        (item) => `
      <tr>
        <td>${item.variable}</td>
        <td>${item.description}</td>
      </tr>
    `
      )
      .join("");
  }
  
  // Function to switch tabs
  function switchTab(event) {
    event.preventDefault();
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Remove active class from all tabs
    tabLinks.forEach((link) => link.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));
  
    // Add active class to the clicked tab
    const targetTab = event.target.getAttribute("data-tab");
    document.getElementById(targetTab).classList.add("active");
    event.target.classList.add("active");
  }
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", async () => {
    const data = await loadData();
    populateTweakerTable(data);
  
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach((link) => link.addEventListener("click", switchTab));
  });