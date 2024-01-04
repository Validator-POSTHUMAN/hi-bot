import dotenv from 'dotenv';

dotenv.config();

const getParam = (paramName: string): string => {
  const value = process.env[paramName];
  if (!value) {
    throw new Error(`config param ${paramName} is not found in .env file`);
  }

  return value;
};

export default {
  getParam,
};
