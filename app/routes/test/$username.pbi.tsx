import { useState } from "react";

import type { ActionFunction, UploadHandler } from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { uploadImage } from "~/routes/api/utils.server"
import { uploadProfileBanner } from "../api/user.server";

import Icons from "../../components/Icons";
import getCroppedImg from '~/components/utils/getCroppedImg'

import Cropper from 'react-easy-crop'

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
  )  
};

export default function UploadBannerImage() {
  const data = useActionData<ActionData>();
  const [file, setFile] = useState<any>()
  const [zoom, setZoom] = useState<any>(1)
  const [crop, setCrop] = useState<any>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [croppedImage, setCroppedImage] = useState<any>(null)

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined)
      return
    }
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const cancelImage = () => setFile(null)

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    setCroppedImage(await getCroppedImg(file, croppedAreaPixels))
    setFile(null)
  };


  // TODO: reset/cancel crop 
  // TODO: find out why this only works for certain files 
  // const cancelCrop = () => ?? ?? 

  return (
    <>
      <label
        htmlFor="img-field"
        className="inline-block p-[6px 12px] cursor-pointer">
        <i className="bg-zinz-600 rounded-full">{Icons.cameraIcon}</i>
      </label>
      {/* this input gets the image */}
      <input
        multiple={false}
        id="img-field"
        type="file"
        onChange={onSelectFile}
        name="banner_img"
        accept="image/*"
        className="text-transparent p-5 invisible"
      />

      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <input
          multiple={false}
          id="img-field"
          type="hidden"
          value={croppedImage}
          name="banner_img"
          accept="image/*"
          className="text-transparent p-5 invisible"
        />


        {file && (
          <>
            <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10 opacity-50"></div>
            <div className="fixed top-0 left-0 right-0 bottom-20 z-20">
              <Cropper
                image={file}
                aspect={3 / 1}
                zoom={zoom}
                onZoomChange={setZoom}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="fixed bottom-0 w-full h-[100px] z-20 mb-10">
              <div className="place-content-center">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onInput={(e: any) => {
                    setZoom(e.target.value);
                  }}
                  className="w-1/2"
                ></input>
              </div>
              <div className="place-content-center mt-12 mb-10">
                <button
                  type='button'
                  className="bg-rose-400 m-5"
                  onClick={() => cancelImage()}
                >
                  clear image
                </button>
                <button
                  type='button'
                  className="bg-purple-800 m-5"
                  onClick={onCrop}
                >
                  Crop
                </button>
              </div>
            </div>
          </>
        )}

        {croppedAreaPixels && !data?.imgSrc ? (
          <>
            <img
              src={croppedImage}
              alt=''
            />
            <button
              type="submit"
              className="bg-slate-400 m-5"
              name='_action'
              value='pfp'
            >
              upload banner
            </button>
          </>
        ) : null}

      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>success!!</h2>
          <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
        </>
      )}
    </>
  );
}
