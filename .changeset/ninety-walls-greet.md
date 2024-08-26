---
'@toktokhan-dev/next-app-init': patch
---

update-s3-flow

## s3-file-uploader 모듈 변경사항

똑똑한 개발자의 서버 s3 구현사항이 달라짐에 따라, s3-file-upload 모듈이 수정되었습니다.

### Server & Client Flow 상 변경점

1. backend server 로 부터 받는 presigned-url api 응답 schema 가 달라졌습니다. query param 으로 전달되던 값이 response body 의 fields 로 변경되었습니다.

#### 기존

```json
{
  "url": "https://s3.ap-northeast-2.amazonaws.com/toktokhan-dev/Key=...&SomeField=..."
}
```

#### 변경

```json
{
  "url": "https://s3.ap-northeast-2.amazonaws.com/toktokhan-dev/Key=...",
  "fields": {
    "key": "...",
    "SomeField": "..."
  }
}
```

2. s3 로 upload 시 요청 method 와 reqeuest type 이 변경되었습니다.

#### 기존

- method: `PUT`
- request-type: `File Object`

```ts
const { url , fields } = await presignedUrlApi.createPresignedUrl({...});

fetch(url, {
  method: 'PUT',
  body: file
});

```

#### 변경

- method: `POST`
- request-type: `FormData`

변경된 요청 방법은 presigned-url 의 응답으로 받아온 fields 와 File, Content-Type 을 포함하는 `FormData` 로 만들어서 전달합니다.

```ts

const { url , fields } = await presignedUrlApi.createPresignedUrl({...});

const formData = new FormData();

Object.entries(fields).forEach(([key, value]) => {
  formData.append(key, value);
});

formData.append('file', file);
formData.append('Content-Type', file.type);

fetch(url, {
  method: 'POST',
  body: formData
});

```

### Client S3FileUploader 모듈 변경점

#### 기존

기존에는 presigned url 을 프로젝트 서버로 요청해 생성후에, s3 에 파일을 업로드 하는 플로우를 한번에 처리하기위해 아래와 같은 모듈이 있었습니다.

```ts
class S3FileUploader {
    private _createPresignedUrl () {...}
    private _uploadFileToS3 () {...}

    async uploadFile (file: File) {
        const { url, fields } = await this._createPresignedUrl();
        await this._uploadFileToS3(url, fields, file);
    }

    async uploadFiles (file: File[]) {
        const { url, fields } = await this._createPresignedUrl();
        const result =  Promise.allSattled(file.map(uplaodFileToS3));
        return {
            fulfilled: result.filter(r => r.status === 'fulfilled'),
            rejected: result.filter(r => r.status === 'rejected')
        }
    }
}
```

#### 변경

위의 방식은 gen:api 를 통해 생성된 모듈을 사용하지 못한다는 단점이 있고, File 객체의 형식이 다른 react-native 를 포함해 프로젝트마다 달라 질 수 있는 구현 사항에 따라,
S3FileUploaderApi 모듈을 직접 수정하게 될 여지가 있다는 단점이 있었습니다.

따라서 아래처럼, 사용되는 함수를 주입받아 flow 만 처리하는 모듈이 새롭게 만들어 졌고, S3FileUplader 모듈은 오직 s3 에 파일을 업로드 하는 역할만을 수행하도록 변경되었습니다.

```ts
// S3FileUpladerApi.ts
class S3FileUploaderApi {
    async uploadFileToS3 ({ url, formData }) {...}
}
// S3FileUploaderApi.query.ts
export const { uploadFile, uploadFiles } = createS3UploadFlow({
  // 아래 부분은 프로젝트 상황에 맞게 직접 작성합니다.
  prepareUpload: async (file: File) => {
    const { name, type } = file
    // gen:api 로 생성된  presigned url 을 생성하는 api 를 직접 import 해서 사용합니다.
    const { fields, url } = await presignedUrlApi.presignedUrlCreate({ name, type })
    const formData = new FormData()

    Object.entries(fields).forEach(([k, v]) => formData.append(k, v))
    formData.append('Content-Type', file.type)
    formData.append('file', file)

    return {
      url,
      formData,
      fields,
      file,
    }
  },
  // 아래 부분은 프로젝트 상황에 맞게 직접 작성합니다.
  uploadFileToS3: async ({ url, formData, file, fields }) => {
    await s3FileUploaderApi.uploadFileToS3({ url, formData })
    ...
  },
})

const useS3FileUploadMutate = (...) => useMutation({ mutationFn: uploadFile })
```
