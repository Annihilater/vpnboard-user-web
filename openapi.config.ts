import { generateService } from '@umijs/openapi';

generateService({
  requestLibPath: "import request from '@/lib/request';",
  schemaPath: 'https://api-doc.vpnboard.com/doc.json',
  // schemaPath: join(__dirname, 'openapi.json'),
  // projectName: 'api',
  serversPath: './src/services',
});
