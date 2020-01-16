import { Log, ILog } from '../models/log';
import { IStats } from '../interfaces';

function statInc(stats: IStats, log: ILog, period: string): IStats {
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

  let stats: IStats = {
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

  // get date and set hours - 00:00:00
  let dateNow: number = (new Date()).setHours(0,0,0,0);

  for (let log of logs) {
    // get data for 1 day
    if (log.ts > dateNow) {
      stats = statInc(stats, log, 'today');
    }
    // get data for 7 days
    if (log.ts > dateNow - 1000*60*60*24*7) {
      stats = statInc(stats, log, 'week');
    }
    // get data for 30 days
    stats = statInc(stats, log, 'month');
  }

  res.send({
    stats
  });
}