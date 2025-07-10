import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

async function saveBase64Image(base64String) {
  const matches = base64String.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
  if (!matches) throw new Error('Formato base64 inválido');

  const ext = matches[1].split('/')[1]; 
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');

  const uploadsDir = path.resolve(__dirname, '../uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${uuidv4()}.${ext}`;
  const filepath = path.join(uploadsDir, filename);

  await fs.writeFile(filepath, buffer);

  return `uploads/${filename}`; 
}

export default saveBase64Image;
