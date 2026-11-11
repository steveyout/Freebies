import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection';

export interface ResourceAttributes {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[]; // parsed in getters/setters
  safetyRating: string;
  badge?: string | null;
  mirrorUrls?: string[] | null;
  lastVerified?: string | null;
  score: number;
  upvotesCount: number;
  downvotesCount: number;
  isStarred: boolean;
  isOpenSource: boolean;
  isNoAds: boolean;
  isNoReg: boolean;
  dateAdded?: string | null;
  addedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResourceCreationAttributes extends Optional<
  ResourceAttributes,
  | 'score'
  | 'upvotesCount'
  | 'downvotesCount'
  | 'isStarred'
  | 'isOpenSource'
  | 'isNoAds'
  | 'isNoReg'
  | 'badge'
  | 'mirrorUrls'
  | 'lastVerified'
  | 'dateAdded'
  | 'addedBy'
> {}

export class Resource extends Model<ResourceAttributes, ResourceCreationAttributes> implements ResourceAttributes {
  declare id: string;
  declare title: string;
  declare url: string;
  declare description: string;
  declare category: string;
  declare subcategory: string;
  declare tags: string[];
  declare safetyRating: string;
  declare badge?: string | null;
  declare mirrorUrls?: string[] | null;
  declare lastVerified?: string | null;
  declare score: number;
  declare upvotesCount: number;
  declare downvotesCount: number;
  declare isStarred: boolean;
  declare isOpenSource: boolean;
  declare isNoAds: boolean;
  declare isNoReg: boolean;
  declare dateAdded?: string | null;
  declare addedBy?: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Resource.init(
  {
    id: {
      type: DataTypes.STRING(128),
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
    safetyRating: {
      type: DataTypes.STRING(64),
      defaultValue: 'Safe',
      allowNull: false,
    },
    badge: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    mirrorUrls: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('mirrorUrls') as unknown as string;
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(val: string[]) {
        this.setDataValue('mirrorUrls', JSON.stringify(val || []) as any);
      },
    },
    lastVerified: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    upvotesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    downvotesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isStarred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isOpenSource: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isNoAds: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isNoReg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dateAdded: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    addedBy: {
      type: DataTypes.STRING(64),
      defaultValue: 'community',
    },
  },
  {
    sequelize,
    tableName: 'resources',
    timestamps: true,
    indexes: [
      { fields: ['category'] },
      { fields: ['subcategory'] },
      { fields: ['score'] },
      { fields: ['isStarred'] },
    ],
  }
);
