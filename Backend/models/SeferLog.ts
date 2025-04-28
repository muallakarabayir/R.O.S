import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Sefer } from "./Sefer";
import 'reflect-metadata';

@Entity()
export class SeferLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Sefer, (sefer) => sefer.logs)
    sefer!: Sefer;

    @Column("int")
    tahmini_sure!: number;

    @Column("varchar")
    trafik_durumu!: string;

    @Column("timestamp")
    tarih!: Date;
}
