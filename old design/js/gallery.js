async function getGalleryImages() {
  const galleryDir = "photos/gallery";
  try {
    const response = await fetch(`${galleryDir}/`);
    if (!response.ok) throw new Error("Directory listing unavailable");
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const links = [...doc.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href"))
      .filter((href) => /\.(jpg|jpeg|png|webp|gif)$/i.test(href || ""))
      .map((href) => `${galleryDir}/${decodeURIComponent(href).replace(/^\.?\//, "")}`);
    const unique = [...new Set(links)];
    if (unique.length) return unique;
  } catch (error) {}

  try {
    const repoResponse = await fetch(
      "https://api.github.com/repos/kejubayer/kejubayer.github.io/contents/photos/gallery",
    );
    if (!repoResponse.ok) throw new Error("GitHub contents unavailable");
    const files = await repoResponse.json();
    const images = files
      .filter((file) => file.type === "file" && /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name))
      .map((file) => `${galleryDir}/${file.name}`);
    if (images.length)
      return images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch (error) {}

  const fallbacks = [];
  for (let i = 1; i <= 120; i++) fallbacks.push(`${galleryDir}/${i}.jpg`);

  const checks = await Promise.all(
    fallbacks.map(async (src) => {
      try {
        const resp = await fetch(src, { method: "HEAD" });
        return resp.ok ? src : null;
      } catch {
        return null;
      }
    }),
  );
  return checks.filter(Boolean);
}
