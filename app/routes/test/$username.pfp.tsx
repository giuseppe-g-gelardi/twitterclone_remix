import { useEffect, useState } from "react";

import type { ActionFunction, UploadHandler } from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/routes/api/utils.server"
import { uploadProfileImage } from "../api/user.server";
import Icons from "../../components/Icons";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "profile_img") {
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
  const imgSrc = formData.get("profile_img");
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
  const [file, setFile] = useState<any>()
  const [preview, setPreview] = useState<any>()


  useEffect(() => {
    if (!file) {
        setPreview(undefined)
        return
    }

    // const objectUrl = URL.createObjectURL(file)
    // console.log(file)
    // setPreview(objectUrl)
    setPreview(file)

    return () => URL.revokeObjectURL(file)
}, [file])

const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
        setFile(undefined)
        return
    }
    
    // setFile(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
}

const resetImage = () => setFile(null)


  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col"
      >    
        <label 
          htmlFor="img-field" 
          className="inline-block p-[6px 12px] cursor-pointer h-8 w-8 m-auto rounded-full bg-zinc-500">
          <i className="">{Icons.cameraIcon}</i>
        </label>
        <input 
          multiple={false}
          id="img-field" 
          type="file" 
          onChange={onSelectFile}
          name="profile_img" 
          accept="image/*"
          className="text-transparent p-5 invisible"
        />

        { file && (
          <>
          <img 
            src={preview}
            alt=''
          />

          <div className="flex">

        <button
          type="submit"
          className="bg-slate-400 m-5"
          name='_action'
          value='pfp'
          >
          upload pfp
        </button>
        <button
          className="bg-rose-400 m-5"
          onClick={() => resetImage()}
          >
          clear image
        </button>
          </div>

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

        // {/* 
        // <input 
        //   id="img-field" 
        //   type="file" 
        //   name="profile_img" 
        //   accept="image/*"
        //   className="text-transparent"
          
        //   // style={{ display: 'none' }}
        // /> */}
        // {/* <input id="file-upload" type="file" className="hidden" /> */}
