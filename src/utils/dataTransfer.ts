import { DragTransferData } from '../typings/DragTransferData';

export const setTransferData = (e: React.DragEvent, data: DragTransferData) =>
  e.dataTransfer.setData('text/plain', JSON.stringify(data));

export const getTransferData = (e: React.DragEvent): DragTransferData =>
  JSON.parse(e.dataTransfer.getData('text/plain'));
