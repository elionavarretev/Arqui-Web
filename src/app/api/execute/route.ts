import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  try {
    const res = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "openjdk-head",
        code,
        stdin: "",
        options: "",
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ output: "", error: `Error HTTP ${res.status}`, exitCode: 1 });
    }

    const data = await res.json();
    const output = data.program_output ?? "";
    const error = (data.program_error ?? "") + (data.compiler_error ?? "");
    const exitCode = data.status === 0 || data.status === "0" ? 0 : 1;

    return NextResponse.json({ output, error, exitCode });
  } catch (e) {
    return NextResponse.json({ output: "", error: String(e), exitCode: 1 });
  }
}
