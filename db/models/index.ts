import { sequelize } from '../connection';
import { User } from './User';
import { Resource } from './Resource';
import { Comment } from './Comment';
import { Vote } from './Vote';
import { AuditLog } from './AuditLog';
import { Submission } from './Submission';

// Model Associations
Resource.hasMany(Comment, { foreignKey: 'resourceId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Resource, { foreignKey: 'resourceId', as: 'resource' });

Resource.hasMany(Vote, { foreignKey: 'resourceId', as: 'votes', onDelete: 'CASCADE' });
Vote.belongsTo(Resource, { foreignKey: 'resourceId', as: 'resource' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments', onDelete: 'SET NULL' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Vote, { foreignKey: 'userId', as: 'votes', onDelete: 'SET NULL' });
Vote.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  sequelize,
  User,
  Resource,
  Comment,
  Vote,
  AuditLog,
  Submission,
};

let syncPromise: Promise<void> | null = null;

export async function initDb(): Promise<void> {
  if (!syncPromise) {
    syncPromise = (async () => {
      try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: false });
      } catch (err: any) {
        console.warn('Database initialization notice:', err.message);
      }
    })();
  }
  return syncPromise;
}
