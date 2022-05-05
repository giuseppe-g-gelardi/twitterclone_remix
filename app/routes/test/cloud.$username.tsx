import type { ActionFunction, UploadHandler } from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/routes/api/utils.server"
import { uploadProfileImage } from "../api/user.server";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "img") {
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
  const imgSrc = formData.get("img");
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
    await uploadProfileImage(params.username, imgSrc.toString())
  );
};

export default function ImageUpload() {
  const data = useActionData<ActionData>();
  return (
    <>
      <Form 
        method="post" 
        encType="multipart/form-data" 
        className="flex flex-col"
      >

        <input 
          id="img-field" 
          type="file" 
          name="img" 
          accept="image/*"
          className="text-transparent"
          // style={{ display: 'none' }}
        />

        <button 
          type="submit" 
          className="bg-slate-400"
          name='_action'
          value='pfp'
        >
          upload to cloudinary
        </button>

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

