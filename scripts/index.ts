// import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import { build as esbuild } from "esbuild";
import * as fs from "fs";
import * as path from "path";

const packagePath = path.resolve(__dirname, "..");
const packageJSONPath = path.resolve(packagePath, "package.json");

// const inject = [path.resolve(__dirname, "React.js")];

async function build() {
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));

  console.log({ packageJSON });

  const external = [
    ...Object.keys(packageJSON.dependencies ?? {}),
    ...Object.keys(packageJSON.peerDependencies ?? {}),
  ].flatMap((x) => {
    return [x, `${x}/*`];
  });

  await esbuild({
    bundle: true,
    format: "esm",
    target: "node12",
    entryPoints: ["src/components/index.ts"],
    outdir: "esm",
    plugins: [
      //   ignoreCSSPlugin(),
      // pnpPlugin(),
    ],
    // inject,
    external,
  });
}

build().then(() => {
  console.log("빌드 완료");
});
