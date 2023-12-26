import { config } from 'dotenv-flow';
import type { Config } from 'jest';

const config_dir_path = `${process.env.PWD}/config`;

config({ path: config_dir_path });

const jest_config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  passWithNoTests: true,
  errorOnDeprecated: true,
  rootDir: process.env.PWD,
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default jest_config;
