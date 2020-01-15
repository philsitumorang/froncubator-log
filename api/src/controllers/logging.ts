import { Log } from '../models/log';

export async function save(req, res) {
  try {
    const type = (req.body.type || '').toLowerCase();
    const project = req.body.project || '';
    const service = req.body.service || '';
    const message = req.body.message || '';
    const header = req.body.header || 0;

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

export async function get(req, res) {
  const limit = 100;
  let page = req.query.page || 1;
  if (page <= 0) {
    page = 1;
  }

  delete req.query.page;

  if (req.query.message !== undefined) {
    req.query.message = new RegExp(req.query.message, 'gi');
  }

  const logs = await Log
    .find(req.query)
    .sort({ ts: -1 })
    .skip((page-1) * limit)
    .limit(limit);

  res.send({
    logs
  });
}