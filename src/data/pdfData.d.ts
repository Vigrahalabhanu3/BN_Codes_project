// TypeScript declaration file for pdfData.js

export interface PDF {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  size: string;
  pages: number;
  uploadDate: string;
}

export type UpdateListener = () => void;

export function addUpdateListener(category: string, callback: UpdateListener): void;
export function removeUpdateListener(category: string, callback: UpdateListener): void;
export function addPDFToCategory(category: string, pdfData: Partial<PDF>): PDF;
export function getPDFsByCategory(category: string): PDF[];
export function deletePDFFromCategory(category: string, pdfId: number): boolean;

export const pythonPDFs: PDF[];
export const aptitudePDFs: PDF[];
export const reasoningPDFs: PDF[]; 