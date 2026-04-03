export interface PistonResult {
  output: string;
  error: string;
  exitCode: number;
}

export async function runJava(code: string): Promise<PistonResult> {
  try {
    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "java",
        version: "15.0.2",
        files: [{ name: "Main.java", content: code }],
      }),
    });

    if (!res.ok) {
      return { output: "", error: `Error HTTP ${res.status}`, exitCode: 1 };
    }

    const data = await res.json();
    const run = data.run ?? {};
    return {
      output: run.stdout ?? "",
      error: run.stderr ?? "",
      exitCode: run.code ?? 0,
    };
  } catch (e) {
    return { output: "", error: String(e), exitCode: 1 };
  }
}
