import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

export interface AuditLogAttributes {
  id: string;
  adminUsername: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  details?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id' | 'targetId' | 'details'> {}

export class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  declare id: string;
  declare adminUsername: string;
  declare action: string;
  declare targetType: string;
  declare targetId?: string | null;
  declare details?: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    adminUsername: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    targetType: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    targetId: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'audit_logs',
    timestamps: true,
    indexes: [
      { fields: ['adminUsername'] },
      { fields: ['action'] },
      { fields: ['targetType'] },
    ],
  }
);
