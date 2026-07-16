// Converts an array of repo objects into a downloadable CSV file.
export function exportReposToCSV(repos, username) {
  if (!repos?.length) return;

  const headers = ["name", "language", "stars", "forks", "open_issues", "updated_at", "url"];
  const rows = repos.map((r) => [
    r.name,
    r.language || "N/A",
    r.stargazers_count,
    r.forks_count,
    r.open_issues_count,
    r.updated_at,
    r.html_url,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${username}-repositories.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function formatNumber(num) {
  if (num === undefined || num === null) return "0";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
