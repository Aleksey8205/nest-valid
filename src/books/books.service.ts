import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './entityes/dto/create-book.dto';
import { UpdateBookDto } from './entityes/dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec(); 
  }

  async findOne(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec(); 
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto); 
    return createdBook.save(); 
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec(); 
  }

  async remove(id: string): Promise<void> {
    await this.bookModel.deleteOne({ _id: id }).exec(); 
  }
}