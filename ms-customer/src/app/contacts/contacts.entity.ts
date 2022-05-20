
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CustomersEntity } from '../customers/customers.entity';

@Entity({name: 'contacts'})
export class ContactsEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String;

    @Column()
    office: String;

    @Column()
    mail: String;

    @Column({length: 12})
    phoneNumber: String;

    @ManyToOne(() => CustomersEntity, customers => customers.Contacts, {orphanedRowAction: 'delete'})
    Customer: CustomersEntity;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
     updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime' })
    deletedAt: Date;
}