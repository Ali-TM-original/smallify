import prisma from "./prisma";

export async function CreateItem(
  original: string,
  generated: string,
  urlCode: string
) {
  try {
    const info = await prisma.generatedUrls.create({
      data: {
        original,
        generated,
        urlCode,
      },
    });
    return { info, error: null }; // Return null for error when no error occurs
  } catch (error) {
    return { info: null, error: error.message }; // Return error message when an error occurs
  }
}

export async function checkUrl(originalUrl: string) {
  try {
    const result = await prisma.generatedUrls.findMany({
      where: { original: originalUrl },
    });
    return { result, error: null }; // Return null for error when no error occurs
  } catch (error) {
    return { res: null, error: error.message }; // Return error message when an error occurs
  }
}

export async function getRedirectUrl(code: string) {
  try {
    const result = await prisma.generatedUrls.findUnique({
      where: {
        urlCode: code,
      },
    });
    return { result, error: null };
  } catch (error) {
    return { res: null, error: error.message };
  }
}
