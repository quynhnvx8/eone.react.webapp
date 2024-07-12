import { fs, storage } from '@/firebase/firebaseConfig';
import { arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { replaceName } from './replaceName';
import { handleResize } from './resizeImage';

export class HandleFile {
  static UploadToStore = async (file: any, id: string, collectionName: string) => {
    const filename = replaceName(file.name);
    const path = `/images/${filename}`;
    //được sử dụng với thư viện Firebase Storage để tạo một tham chiếu lưu trữ
    const storageRef = ref(storage, path);

    const res = await uploadBytes(storageRef, file);

    if (res) {
      if (res.metadata.size === file.size) {
        const url = await getDownloadURL(storageRef);
        await this.SaveToFirestore({ downloadUrl: url, path, id, collectionName });
      } else {
        return 'uploading';
      }
    } else {
      return 'Error upload File';
    }
  };

  static SaveToFirestore = async ({ path, downloadUrl, id, collectionName }: 
    { path: string, downloadUrl: string, id: string; collectionName: string; }) => {
    try {
      await updateDoc(doc(fs, `${collectionName}/${id}`), {
        files: arrayUnion({
          path,
          downloadUrl
        }),
        imageUrl: downloadUrl,
        updatedAt: Date.now()
      });

    } catch (error) {
      console.log(error);
    }
  };

  static removeFile = async (id: string) => {
    try {
      const snap = await getDoc(doc(fs, `files/${id}`));
      if (snap.exists()) {
        const { path, downloadUrl } = snap.data();

        if (path) {
          await deleteObject(ref(storage, `${path}`));

          await deleteDoc(doc(fs, `files/${id}`));

        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Upload files và id vào collectionName
  static HandleFiles = async (files: any, id: string, collectionName: string) => {
    const items: any[] = [];

    for (const i in files) {
      //nếu file thứ i có size>0 và size>0 thì add vào items
      if (files[i].size && files[i].size > 0) {
        items.push(files[i]);
      }
    }

    const ids: string[] = [];
    // duyệt các item, reSize lại file gán vào newFile và gọi hàm UploadToStore
    items.forEach(async item => {
      const newFile = await handleResize(item);
      await this.UploadToStore(newFile, id, collectionName);
    });
  };

  
}