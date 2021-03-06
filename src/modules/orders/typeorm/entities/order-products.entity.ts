import { Column, JoinColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { CreateDateColumn } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";

import { Order } from './order.entity';
import Product from '../../../products/typeorm/entities/product.entity';

@Entity('orders_products')
export class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.orders_products)
  product: Product;
}