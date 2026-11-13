export type Photo = {
  name: string;
  alt: string;
};

export const galleryPhotos: Photo[] = [
  { name: "xenoshoots-gallery-1", alt: "Zeus Juice Nektar Chocolate Brownie e-liquid bottle wrapped in a swirl of melted chocolate, leaning on a stack of glazed brownies." },
  { name: "xenoshoots-gallery-2", alt: "Zeus Juice Nektar Chocolate Brownie e-liquid bottle splashing into melted chocolate, surrounded by flying chocolate pieces and brownie bites on a gold background." },
  { name: "xenoshoots-gallery-3", alt: "Three Zeus Juice Nektar e-liquid bottles, Chocolate Cherry, White Chocolate Raspberry Muffin and Chocolate Brownie, on a marble pedestal amid chocolate splashes." },
  { name: "xenoshoots-gallery-4", alt: "Two Cloud9 organic cotton tins for vape coil building, floating inside a twisting blue-and-white striped ribbon with small clouds drifting past." },
  { name: "xenoshoots-gallery-5", alt: "An open Cloud9 organic cotton tin showing the white cotton inside, with clouds around the lid and blurred tins floating behind." },
  { name: "xenoshoots-gallery-6", alt: "Two stacked Cloud9 organic cotton tins, the top one tilted upright, with small clouds on a bright blue background and a reflective surface." },
  { name: "xenoshoots-gallery-7", alt: "White Smarter compact vape pod system beside two Strawberry Ice pods, on a reflective surface against swirling pink and purple waves." },
  { name: "xenoshoots-gallery-8", alt: "Open Smarter charging case holding two pink pods, set on a black pedestal above rippling red liquid with pink smoke behind." },
  { name: "xenoshoots-gallery-9", alt: "Smarter pod case with a Strawberry Ice pod leaning against it, balanced on a tilted white disc against a turquoise background." },
  { name: "xenoshoots-gallery-10", alt: "Black Veepon vape device in its open gift tin beside a Type-C cable box, floating against gold geometric lines above black hexagonal tiles." },
  { name: "xenoshoots-gallery-11", alt: "Black Veepon vape device in its open gift tin with an accessories box, floating against green bokeh lights above a scratched black surface." },
  { name: "xenoshoots-gallery-12", alt: "Partly taken-apart Veepon Tita vape device with its door open, pod pulled out and a colorful swirl-patterned side panel, against an orange and teal backdrop." },
  { name: "xenoshoots-gallery-13", alt: "Pink-purple VOOPOO Argus G3 pod system standing on a sparkling purple surface, with its retail box blurred behind against a pink and violet backdrop." },
  { name: "xenoshoots-gallery-14", alt: "Two pink-purple VOOPOO Argus G3 pod systems floating side by side over a reflective floor, against swirling pink and blue light trails." },
  { name: "xenoshoots-gallery-15", alt: "Pink-purple VOOPOO Argus G3 pod system balanced on the peak of a blue-and-white tiled shape, against soft pink, blue and teal haze." },
];

function getGalleryPhoto(name: string): Photo {
  const photo = galleryPhotos.find((item) => item.name === name);

  if (!photo) {
    throw new Error(`No gallery photo named "${name}"`);
  }

  return photo;
}

export const heroPhoto = getGalleryPhoto("xenoshoots-gallery-11");
