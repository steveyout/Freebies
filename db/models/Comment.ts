import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

export interface CommentAttributes {
  id: string;
  resourceId: string;
  userId?: string | null;
  authorName: string;
  authorIp?: string | null;
  content: string;
  isPrivate: boolean; // True = Private feedback/note to admin; False = Public discussion
  status: 'approved' | 'pending' | 'hidden';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentCreationAttributes extends Optional<
  CommentAttributes,
  'id' | 'userId' | 'authorIp' | 'isPrivate' | 'status'
> {}

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  declare id: string;
  declare resourceId: string;
  declare userId?: string | null;
  declare authorName: string;
  declare authorIp?: string | null;
  declare content: string;
  declare isPrivate: boolean;
  declare status: 'approved' | 'pending' | 'hidden';

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Comment.init(
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
    authorName: {
      type: DataTypes.STRING(64),
      defaultValue: 'Anonymous Contributor',
      allowNull: false,
    },
    authorIp: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending', 'hidden'),
      defaultValue: 'approved',
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    indexes: [
      { fields: ['resourceId'] },
      { fields: ['isPrivate'] },
      { fields: ['status'] },
    ],
  }
);
