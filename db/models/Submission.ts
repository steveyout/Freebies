import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

export interface SubmissionAttributes {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  submissionType: 'ui' | 'github_pr';
  submitterName: string;
  submitterEmail?: string | null;
  submitterIp?: string | null;
  githubPrUrl?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string | null;
  reviewedBy?: string | null;
  reviewedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubmissionCreationAttributes extends Optional<
  SubmissionAttributes,
  | 'id'
  | 'submitterEmail'
  | 'submitterIp'
  | 'githubPrUrl'
  | 'status'
  | 'notes'
  | 'reviewedBy'
  | 'reviewedAt'
> {}

export class Submission
  extends Model<SubmissionAttributes, SubmissionCreationAttributes>
  implements SubmissionAttributes
{
  declare id: string;
  declare title: string;
  declare url: string;
  declare description: string;
  declare category: string;
  declare subcategory: string;
  declare tags: string[];
  declare submissionType: 'ui' | 'github_pr';
  declare submitterName: string;
  declare submitterEmail?: string | null;
  declare submitterIp?: string | null;
  declare githubPrUrl?: string | null;
  declare status: 'pending' | 'approved' | 'rejected';
  declare notes?: string | null;
  declare reviewedBy?: string | null;
  declare reviewedAt?: Date | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Submission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    subcategory: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('tags') as unknown as string;
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(val: string[]) {
        this.setDataValue('tags', JSON.stringify(val || []) as any);
      },
    },
    submissionType: {
      type: DataTypes.ENUM('ui', 'github_pr'),
      defaultValue: 'ui',
      allowNull: false,
    },
    submitterName: {
      type: DataTypes.STRING(64),
      defaultValue: 'Community Contributor',
      allowNull: false,
    },
    submitterEmail: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    submitterIp: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    githubPrUrl: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'submissions',
    timestamps: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['submissionType'] },
      { fields: ['category'] },
    ],
  }
);
