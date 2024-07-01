import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ timestamps: true, tableName: 'products' })
export class Product extends Model {
    @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
}