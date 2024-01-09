import { printSchema } from 'graphql';
import path from 'path';
import fs from 'fs/promises';

import schema from '../src/schemas';

(async () => {
  const filePath = path.resolve(
    __dirname,
    '..',
    'schema',
    'schema.graphql'
  );

  await fs.writeFile(filePath, printSchema(schema));
})() 
