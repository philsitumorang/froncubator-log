import { Log, ILog } from '../models/log';

function statInc(stats, log, period) {
  stats[period].all++;
  if (log.type === 'error') {
    stats[period].errors++;
  }
  return stats;
}

export async function getStats(req, res) {

  const logs: ILog[] = await Log
    .find({
      ts: {
        $gte: Date.now() - 1000*60*60*24*30,
        $lte: Date.now()
      }
    })
    .sort({ ts: -1 });

  let stats = {
    today: {
      all: 0,
      errors: 0
    },
    week: {
      all: 0,
      errors: 0
    },
    month: {
      all: 0,
      errors: 0
    }
  };

  let dateNow = (new Date()).setHours(0,0,0,0);
  
  for (let log of logs) {
    if (log.ts > dateNow) {
      stats = statInc(stats, log, 'today');
    }
    if (log.ts > dateNow - 1000*60*60*24*7) {
      stats = statInc(stats, log, 'week');
    }
    stats = statInc(stats, log, 'month');
  }

  res.send({
    stats
  })
}