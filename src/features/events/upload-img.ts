import { extension } from 'mime-types';


export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    let fileExtName = extension(file.mimetype);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}.${fileExtName}`);
  };

