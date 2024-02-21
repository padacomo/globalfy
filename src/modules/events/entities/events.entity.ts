import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column({ nullable: false, type: 'timestamp' })
  startDate: Date;

  @Column({ nullable: false, type: 'timestamp' })
  endDate: Date;
}
