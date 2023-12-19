const fs = require("fs");
const { exec } = require("child_process");
const chokidar = require("chokidar");

// Configuration
const TEX_FILE = "thesis.tex"; // Replace with your TeX file name
const PDFLATEX = "pdflatex"; // pdflatex command or its path

console.log(`Watching changes in ${TEX_FILE}...`);

// Function to compile TeX file
const compileTex = () => {
  exec(
    `${PDFLATEX} -interaction=nonstopmode -halt-on-error ${TEX_FILE}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log("Tex file compiled successfully!");
    }
  );
};

// Initial compile
compileTex();

// Watch for changes using chokidar
const watcher = chokidar.watch(TEX_FILE);
watcher.on("change", () => {
  console.log("Changes detected, recompiling...");
  compileTex();
});
