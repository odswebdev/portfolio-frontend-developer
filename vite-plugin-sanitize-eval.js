import { readFileSync, writeFileSync } from "fs";
import path from "path";

export default function sanitizeEval() {
  return {
    name: "sanitize-eval",
    apply: "build",
    transform(code, id) {
      if (id.endsWith("node_modules/three-stdlib/libs/lottie.js")) {
        const sanitizedCode = code.replace(/eval/g, "/* eval removed */");
        return {
          code: sanitizedCode,
          map: null,
        };
      }
      return null;
    },
  };
}
