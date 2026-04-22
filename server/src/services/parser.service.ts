// to extract text from PDF files
import { PDFParse } from 'pdf-parse'  // to extract text from PDF files
import mammoth from "mammoth"; // to extract text from .docx files

// buffer is binary data of the file, mimeType is the type of the file (e.g., 'application/pdf' or 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')

export const extractText = async (buffer:Buffer, mimeType: string): Promise<string> => {
    if(mimeType === 'application/pdf'){
        // const data = await pdfParse(buffer);
        // return data.text;
        const parser = new PDFParse(Uint8Array.from(buffer));
        const result = await parser.getText();
        console.log('Extracted text from PDF:', result);
        return result.text;
    }
    if(mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        const data = await mammoth.extractRawText({buffer});
        return data.value;
    }
    throw new Error('Unsupported file type');
}