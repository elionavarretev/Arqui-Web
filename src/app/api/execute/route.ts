import { NextRequest, NextResponse } from "next/server";

// Wandbox uses "prog.java" as the default filename,
// so the public class must be named "prog".
// We rename any "public class Main" → "public class prog" before sending.
function prepareCode(code: string): string {
  return code.replace(/\bpublic\s+class\s+Main\b/g, "public class prog");
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const preparedCode = prepareCode(code);

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "openjdk-jdk-21+35",
        code: preparedCode,
        stdin: "",
        options: "",
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ output: "", error: `Error del servidor de compilación (${res.status})`, exitCode: 1 });
    }

    const data = await res.json();
    const output = data.program_output ?? "";
    const compilerError = data.compiler_error ?? "";
    const programError = data.program_error ?? "";
    // Filter out the "ls: cannot access" noise from Wandbox
    const error = [compilerError, programError]
      .join("")
      .split("\n")
      .filter((l) => !l.startsWith("ls:") && !l.includes("main class was not found") && l.trim())
      .join("\n");

    const exitCode = (data.status === 0 || data.status === "0") && !compilerError ? 0 : 1;

    return NextResponse.json({ output, error, exitCode });
  } catch (e) {
    return NextResponse.json({ output: "", error: String(e), exitCode: 1 });
  }
}
