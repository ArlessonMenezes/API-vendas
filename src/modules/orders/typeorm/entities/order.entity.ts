import { Customer } from "@modules/customers/typeorm/entities/customer.entity";
import { Column, UpdateDateColumn } from "typeorm";
import { JoinColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { ManyToOne } from "typeorm";
import { CreateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { OrdersProducts } from './order-products.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
