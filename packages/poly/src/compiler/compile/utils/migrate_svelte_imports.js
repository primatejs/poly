const poly = "poly";
const svelte = "svelte";

// transform Svelte into Poly imports
export default component => {
  component.imports.forEach(({ source }) => {
    if (source.value === svelte) {
      source.value = poly;
      source.raw = `"${poly}"`;
    }
  });
};
