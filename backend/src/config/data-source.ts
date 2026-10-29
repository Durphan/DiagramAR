'use strict';

import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { buildTypeOrmConfig } from './typeorm-config.ts';

const AppDataSource = new DataSource(buildTypeOrmConfig());

export default AppDataSource;
