import { Request, Response } from 'express';
import { Log, ILog } from '../models/log';

export async function save(req: Request, res: Response) {
  try {
    const payload: ILog = req.body;
    const type = (payload.type || '').toLowerCase();
    const project = payload.project || '';
    const service = payload.service || '';
    const message = payload.message || '';
    const header = payload.header || 0;

    const log = new Log({
      type,
      ts: Date.now(),
      project,
      service,
      message,
      header
    });

    await log.save();

    res.send({
      saved: true
    });

  } catch (err) {
    console.log(err);
  }
}

export async function get(req: Request, res: Response) {
  const reqQuery: ILog = req.query;
  const limit: number = 100;

  let page: number = reqQuery.page || 1;
  if (page <= 0) {
    page = 1;
  }

  delete reqQuery.page;

  if (reqQuery.message !== undefined) {
    reqQuery.message = new RegExp(reqQuery.message, 'gi');
  }

  const logs = await Log
    .find(reqQuery)
    .sort({ ts: -1 })
    .skip((page-1) * limit)
    .limit(limit);

  res.send({
    logs
  });
}