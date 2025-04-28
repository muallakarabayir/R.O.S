import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { SeferLog } from "./SeferLog";
import 'reflect-metadata';
@Entity()
export class Sefer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("double precision")
    baslangic_lat!: number;

    @Column("double precision")
    baslangic_lng!: number;

    @Column("double precision")
    varis_lat!: number;

    @Column("double precision")
    varis_lng!: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @Column("text")
    route!: string;

    @Column("integer", { nullable: true })
    tahmini_sure?: number;

    @Column("text", { nullable: true })
    trafik_durumu?: string;  // Kolon tanımını burada dikkatle kontrol edin.

    @OneToMany(() => SeferLog, (seferLog) => seferLog.sefer)
    logs!: SeferLog[];
}
