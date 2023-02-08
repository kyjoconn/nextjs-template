const fs = require("fs").promises;

if (process.argv.includes("--help")) {
  console.info(
    "Provide the directory where your component should be generated, ex: yarn generate ./components/MyComponent"
  );
  console.info("The path is relative to the location of the package.json file");
  process.exit(0);
}

const componentDir = process.argv[2];

if (!componentDir) {
  console.error(
    "You must provide a directory for your component, e.g. ./components/MyComponent"
  );
  process.exit(1);
}

/**
 * @throws {Error} if template file cannot be read or writing 
 * new file fails for reason other than the file already existing
 */
const createFile = async ({ writePath, templatePath }, replacements) => {
  let content = templatePath
    ? (await fs.readFile(templatePath)).toString()
    : "";

  for (const placeHolder in replacements) {
    const value = replacements[placeHolder];
    content = content.replaceAll(placeHolder, value);
  }

  try {
    await fs.writeFile(writePath, content, { flag: "wx" }); // wx flag to prevent overwrite
    console.log(`CREATED ${writePath}`);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(`SKIPPED ${writePath} - ALREADY EXISTS`);
    } else {
      throw err;
    }
  }
};

const run = async () => {
  const componentName = componentDir.split("/").pop();

  // dir where this script is
  const templateDir = __dirname;

  // map of placeholders (in templates) to values they should be replaced with
  const replacements = {
    $$COMPONENT_NAME: componentName,
  };

  const filesToCreate = [
    {
      writePath: `${componentDir}/index.ts`,
      templatePath: `${templateDir}/index.ts.template`,
    },
    {
      writePath: `${componentDir}/${componentName}.tsx`,
      templatePath: `${templateDir}/component.tsx.template`,
    },
    {
      writePath: `${componentDir}/${componentName}.module.scss`,
      templatePath: `${templateDir}/style.scss.template`,
    },
    {
      writePath: `${componentDir}/${componentName}.test.tsx`,
      templatePath: `${templateDir}/test.tsx.template`,
    },
  ];

  console.log(`GENERATING ${componentName}`);

  try {
    await fs.mkdir(componentDir, { recursive: true });
    await Promise.all(
      filesToCreate.map((fileToCreate) =>
        createFile(fileToCreate, replacements)
      )
    );
  } catch (err) {
    console.error(`Something went wrong while generating ${componentName}`);
    if (err.message) console.error(err.message);
    process.exit(1);
  }
};

run();
