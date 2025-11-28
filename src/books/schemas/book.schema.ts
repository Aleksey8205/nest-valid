import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({required: true, type: String})
     title: string;

    @Prop({required: true, type: String})
     author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book)