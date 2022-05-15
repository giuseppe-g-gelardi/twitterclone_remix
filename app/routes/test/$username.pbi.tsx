import { useEffect, useState } from "react";

import type { ActionFunction, UploadHandler } from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/routes/api/utils.server"
import { uploadProfileBanner } from "../api/user.server";
import Icons from "../components/Icons";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "banner_img") {
      stream.resume();
      return;
    }
    const uploadedImage: any = await uploadImage(stream);

    return uploadedImage.secure_url;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const imgSrc = formData.get("banner_img");
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return json({
      error: "something wrong",
    });
  }
  return json({
    imgSrc,
    imgDesc,
  },
    await uploadProfileBanner(params.username, imgSrc.toString())
  );
};

export default function ImageUpload() {
  const data = useActionData<ActionData>();
  const [file, setFile] = useState<any>()
  const [preview, setPreview] = useState<any>()

  useEffect(() => {
    if (!file) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
}, [file])

const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
        setFile(undefined)
        return
    }

    setFile(e.target.files[0])
}


  return (
    <>
      <Form 
        method="post" 
        encType="multipart/form-data" 
        className="flex flex-col"
      >

<label htmlFor="img-field" className="custom-file-upload inline-block p-[6px 12px] cursor-pointer">
          <i className="bg-zinz-600 rounded-full">{Icons.cameraIcon}</i>
</label>
        <input 
                // onChange={(e) => setFile(e.target.value)}
                multiple={false}
          id="img-field" 
          type="file" 
          onChange={onSelectFile}
          name="banner_img" 
          accept="image/*"
          className="text-transparent p-5 invisible"
        />

        { file && (
          <>
      <img 
      src={preview}
      alt=''
      />
          
          <button 
          type="submit" 
          className="bg-slate-400 mt-5"
          name='_action'
          value='pfp'
          // value='pbi'
          >
          upload to cloudinary
        </button>
            </>
          )}

      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
        </>
      )}
    </>
  );
}

