import PdfPrinter from "pdfmake";

export const getPDFReadableStreamSingle = (media) => {
  const fonts = { Helvetica: { normal: "Helvetica" } };

  const printer = new PdfPrinter(fonts);
  const content = [
    { text: media.title },
    { text: media.type },
    { text: media.year },
  ];
  const dd = { content: [...content], defaultStyle: { font: "Helvetica" } };

  const pdfReadableStream = printer.createPdfKitDocument(dd);
  pdfReadableStream.end();

  return pdfReadableStream;
};

export const getPDFReadableStream = (mediaArray) => {
  const fonts = { Helvetica: { normal: "Helvetica" } };

  const printer = new PdfPrinter(fonts);

  const content = mediaArray.map((media) => {
    return [{ text: media.title }, { text: media.type }, { text: media.year }];
  });

  const dd = { content: [...content], defaultStyle: { font: "Helvetica" } };

  const pdfReadableStream = printer.createPdfKitDocument(dd);
  pdfReadableStream.end();

  return pdfReadableStream;
};
