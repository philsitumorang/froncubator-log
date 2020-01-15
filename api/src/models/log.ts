import { Document, Schema, Model, model } from 'mongoose';

const LogSchema: Schema = new Schema({
  type: { type: String },
  project: { type: String },
  service: { type: String },
  message: { type: String },
  header: { type: Number },
  ts: { type: Date, default: Date.now }
});

export interface ILog extends Document {
  type: string;
  project: string;
  service: string;
  message: string;
  header: number;
  ts: number;
  save(): any;
};

export const Log: Model<ILog> = model<ILog>('Log', LogSchema);