import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> {
  const mocha = new (Mocha as any)({ ui: 'tdd', color: true });
  const testsRoot = path.resolve(__dirname, '.');

  return new Promise(async (c, e) => {
    try {
      const files = await glob('**/**.test.js', { cwd: testsRoot });
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
      mocha.run((failures: number) => {
        if (failures > 0) e(new Error(`${failures} tests failed.`));
        else c();
      });
    } catch (err) {
      e(err);
    }
  });
}

