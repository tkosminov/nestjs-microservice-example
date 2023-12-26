import { config } from 'dotenv-flow';

const config_dir_path = `${process.env.PWD}/config`;

config({ path: config_dir_path });
