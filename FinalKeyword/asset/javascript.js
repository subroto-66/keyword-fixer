// function addon_keyword() {
//   let primaryKeyword = document.getElementById("primary_keyword").value;
//   let addOnKeyword = document.getElementById("add_on_keyword").value;

//   const lines = primaryKeyword.split("\n");

//   if (addOnKeyword) {
//     const addOnKeywordLines = addOnKeyword.split("\n");

//     // Get the selected character
//     let selectedChar = document.querySelector(
//       'input[name="place"]:checked'
//     ).value;

//     const combineData = lines
//       .map((item, index) => {
//         if (index <= addOnKeywordLines.length) {
//           if (selectedChar == "front") {
//             return `${addOnKeywordLines[index]} ${item}`;
//           } else {
//             return ` ${item} ${addOnKeywordLines[index]}`;
//           }
//         } else {
//           return item;
//         }
//       })
//       .map((item) => item.replace(/undefined/g, "").trim());

//     let selectedMatchType = document.querySelector(
//       'input[name="match_type"]:checked'
//     ).value;

//     // Prepend the selected character to each line
//     let modifiedLines = "";

//     let setLine;
//     if (selectedMatchType == "one") {
//       setLine = combineData.map((line) => "[" + line + "]");
//     } else if (selectedMatchType == "two") {
//       setLine = combineData.map((line) => '"' + line + '"');
//     } else if (selectedMatchType == "three") {
//       setLine = combineData.map((line) => "&" + line + "&");
//     } else {
//       setLine = false;
//     }

//     modifiedLines = setLine.join("\n");
//     document.getElementById("showValue").innerHTML = modifiedLines;
//   } else {
//     let selectedMatchType = document.querySelector(
//       'input[name="match_type"]:checked'
//     ).value;

//     // Prepend the selected character to each line
//     let modifiedLines = "";

//     let setLine;
//     if (selectedMatchType == "one") {
//       setLine = lines.map((line) => '"' + line + '"');
//     } else if (selectedMatchType == "two") {
//       setLine = lines.map((line) => "[" + line + "]");
//     } else {
//       setLine = "$" + lines + "$";
//     }

//     modifiedLines = setLine.join("\n");
//     document.getElementById("showValue").innerHTML = modifiedLines;
//   }
// }

function addon_keyword() {
  const primaryKeyword = document.getElementById("primary_keyword").value;
  const addOnKeyword = document.getElementById("add_on_keyword").value;

  const lines = primaryKeyword.split("\n");
  const addOnKeywordLines = addOnKeyword ? addOnKeyword.split("\n") : [];
  const selectedChar = document.querySelector(
    'input[name="place"]:checked'
  )?.value;
  const selectedMatchType = document.querySelector(
    'input[name="match_type"]:checked'
  )?.value;

  const combineData = lines
    .map((item, index) => {
      if (addOnKeyword && index < addOnKeywordLines.length) {
        return selectedChar === "front"
          ? `${addOnKeywordLines[index]} ${item}`
          : `${item} ${addOnKeywordLines[index]}`;
      }
      return item;
    })
    .map((item) => item.trim());

  const formatLine = (line) => {
    switch (selectedMatchType) {
      case "one":
        return `[${line}]`;
      case "two":
        return `"${line}"`;
      case "three":
        return `${line}`;
      default:
        return line;
    }
  };

  const formattedLines = addOnKeyword
    ? combineData.map(formatLine)
    : lines.map((line) => {
        switch (selectedMatchType) {
          case "one":
            return `[${line}]`;
          case "two":
            return `"${line}"`;
          default:
            return `${line}`;
        }
      });

  document.getElementById("showValue").innerHTML = formattedLines.join("\n");
}

// copy to clipboard
function myFunction() {
  let textToCopy = document.getElementById("showValue").innerText;
  let textarea = document.getElementById("text_to_copy");
  textarea.value = textToCopy;

  // Select the text in the textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999);

  // Copy the text inside the textarea
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      console.log("Copied the text: " + textarea.value);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

// Function to remove duplicate lines
function removeDuplicates() {
  const showValueElement = document.getElementById("showValue");
  const lines = showValueElement.textContent.split("\n");
  // Create a Set from the lines to remove duplicates and filter out empty lines
  const uniqueLines = Array.from(
    new Set(lines.map((line) => line.trim()))
  ).filter((line) => line);
  // Join the unique lines and update the content
  showValueElement.textContent = uniqueLines.join("\n");
}

// Attach event listener to the button
document
  .getElementById("removeDuplicatesButton")
  .addEventListener("click", removeDuplicates);
