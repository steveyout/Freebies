import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

export interface VoteAttributes {
  id: string;
  resourceId: string;
  userId?: string | null;
  ipAddress: string;
  voteType: 'up' | 'down';
  isPrivate: boolean; // True = Personal private vote/rating; False = Public IP-enforced community vote
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VoteCreationAttributes extends Optional<VoteAttributes, 'id' | 'userId' | 'isPrivate'> {}

export class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
  declare id: string;
  declare resourceId: string;
  declare userId?: string | null;
  declare ipAddress: string;
  declare voteType: 'up' | 'down';
  declare isPrivate: boolean;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Vote.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resourceId: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    voteType: {
      type: DataTypes.ENUM('up', 'down'),
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'votes',
    timestamps: true,
    indexes: [
      { fields: ['resourceId'] },
      { fields: ['ipAddress', 'resourceId', 'isPrivate'] },
      { fields: ['userId', 'resourceId', 'isPrivate'] },
    ],
  }
);
