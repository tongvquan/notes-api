import { Controller, Get } from '@nestjs/common';
import * as os from 'node:os';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async check() {
    const [{ now }] = await this.dataSource.query('SELECT now()');

    return {
      status: 'ok',
      dbTime: now,
      hostname: os.hostname(),
    };
  }
}
