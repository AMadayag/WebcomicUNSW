export const gallery_images = Object.entries(
  import.meta.glob("/src/assets/gallery/*.png", { eager: true })
);
