import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  uri: 'mongodb+srv://arlesson:1234@cluster0.w6fqyb1.mongodb.net/?retryWrites=true&w=majority',
}));