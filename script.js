// Function to load data from the text file
async function loadData() {
    try {
      const response = await fetch("data.txt"); // Path to your text file
      const text = await response.text();
      return parseTextData(text);
    } catch (error) {
      console.error("Error loading data:", error);
      return parseTextData("Debug Variable: debug website");
    }
  }
  
  // Function to parse the text data into an array of objectsgx
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const treeNodes = document.querySelectorAll(".tree .tree-node");
    const infoText = document.getElementById("info-text");
  
    // Define information for each node
    const nodeInfo = {
      "adpcm-info": "ADPCM (Adaptive Differential Pulse Code Modulation) is a lossy audio compression format used by Nintendo for efficient storage and playback of audio files.",
      "dsp-info": "DSP (Digital Signal Processor) encoding is a proprietary audio format used by Nintendo for processing and playing back audio in their systems.",
      "room-loaded":"The rooms contains an unique identifier and bounds that may handle object culling",
      // Add more node info as needed
    };
  
    // Add click event listeners to tree nodes
    treeNodes.forEach((node) => {
      node.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event bubbling
        const infoKey = node.getAttribute("data-info");
  
        if (infoKey && nodeInfo[infoKey]) {
          infoText.textContent = nodeInfo[infoKey]; // Display the info
        } else {
          infoText.textContent = "No additional information available for this node.";
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const treeNodes = document.querySelectorAll(".tree-2 .tree-node-2");
    const infoText = document.getElementById("info-text-2");
  
    // Define information for each node
    const nodeInfo = {
      "room-loaded":"The rooms contains an unique identifier and bounds that may handle object culling",
      // Add more node info as needed
    };
  
    // Add click event listeners to tree nodes
    treeNodes.forEach((node) => {
      node.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent event bubbling
        const infoKey = node.getAttribute("data-info");
  
        if (infoKey && nodeInfo[infoKey]) {
          infoText.textContent = nodeInfo[infoKey]; // Display the info
        } else {
          infoText.textContent = "No additional information available for this node.";
        }
      });
    });
  });

  // Event listeners
  document.addEventListener("DOMContentLoaded", async () => {
    const data = await loadData();
    populateTweakerTable(data);
  
    const tabLinks = document.querySelectorAll(".tab-link");
    tabLinks.forEach((link) => link.addEventListener("click", switchTab));
  });

  //cogs related stuff are below
  document.getElementById("search").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const allCogs = document.querySelectorAll("#cogs ul li");
  
    allCogs.forEach((cog) => {
      const cogText = cog.textContent.toLowerCase();
      cog.style.display = cogText.includes(query) ? "block" : "none";
    });
  });

  document.addEventListener("DOMContentLoaded", async () => {
    // Function to load data from the text file
    async function loadCogs() {
      try {
        const response = await fetch("cogs.txt"); // Path to your text file
        const text = await response.text();
        return parseCogs(text);
      } catch (error) {
        console.error("Error loading cogs:", error);
        return parseCogs("Known cogs:\n Feldright's Cog\n\nMissing Cogs:\nVTXG's cogs");
      }
    }
  
    // Function to parse the text data into known and missing cogs
    function parseCogs(text) {
      const sections = text.split("\n\n"); // Split into known and missing sections
      const knownCogs = sections[0]
        .split("\n")
        .slice(1) // Remove the "Known Cogs:" header
        .filter((cog) => cog.trim() !== ""); // Remove empty lines
  
      const missingCogs = sections[1]
        .split("\n")
        .slice(1) // Remove the "Missing Cogs:" header
        .filter((cog) => cog.trim() !== ""); // Remove empty lines
  
      return { known: knownCogs, missing: missingCogs };
    }
  
    // Function to populate the lists
    function populateCogs(knownCogs, missingCogs) {
      const knownList = document.getElementById("known-cogs");
      const missingList = document.getElementById("missing-cogs");
  
      knownList.innerHTML = knownCogs
        .map((cog) => `<li>${cog}</li>`)
        .join("");
  
      missingList.innerHTML = missingCogs
        .map((cog) => `<li>${cog}</li>`)
        .join("");
    }
  
    // Load and display the cogs
    const { known, missing } = await loadCogs();
    populateCogs(known, missing);
  });

  